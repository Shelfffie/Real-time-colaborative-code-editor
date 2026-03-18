import { Server } from "socket.io";
import type { Point } from "../types/models";
import { getRandomColour } from "../utils/random_colour";
import { saveChanges } from "../controllers/socket_controllers";

const roomMemory = new Map<string, string>();

export const socketConn = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("Сокет підключений!", socket.id);

    socket.on(
      "join-room",
      (
        data: { id: string; name: string },
        callback: (result: string, success: boolean) => void
      ) => {
        try {
          console.log("You join the room:", data.id);
          socket.join(data.id);
          const colour = getRandomColour();
          socket.data.room = data.id;
          socket.data.name = data.name;
          socket.data.colour = colour;

          console.log("Joined room:", data.id);
          console.log("Rooms:", socket.rooms);

          const roomClients = io.sockets.adapter.rooms.get(data.id);
          const users: any[] = [];

          if (roomClients) {
            for (const clientId of roomClients) {
              const s = io.sockets.sockets.get(clientId);
              if (!s || s.id === socket.id) continue;

              users.push({
                userId: s.id,
                name: s.data.name,
                colour: s.data.colour,
              });
            }
          }

          socket.emit("new-user", users);

          socket.to(data.id).emit("user-colour", {
            userId: socket.id,
            name: data.name,
            colour,
          });
        } catch (error) {
          callback(`Failed join: ${error}`, false);
        }
      }
    );

    socket.on("mouse-move", (pos: Point) => {
      const room: string = socket.data.room;
      socket.to(room).emit("mouse-cords", { userId: socket.id, pos });
    });

    socket.on(
      "check-room",
      (room: string, callback: (exist: boolean, data: string) => void) => {
        const exist =
          io.sockets.adapter.rooms.has(room) && roomMemory.has(room);
        const data = roomMemory.get(room) ?? "";
        callback(exist, data);
      }
    );

    socket.on("editor-change", (value: string) => {
      const room: string = socket.data.room;
      console.log(value);

      roomMemory.set(room, value);
      console.log(roomMemory.get(room));

      io.to(room).emit("new-code", { userId: socket.id, value });
    });

    socket.on(
      "handleChanges",
      async (
        data: {
          id: string;
          content: string;
          description: string;
        },
        callback: (result: string, success: boolean) => void
      ) => {
        const sessionId = parseInt(data.id);
        if (isNaN(sessionId) || sessionId <= 0)
          return callback("Invalid id.", false);
        const userName = socket.data.name;
        if (!userName.trim())
          return callback("The name cannot be empty.", false);
        saveChanges(
          sessionId,
          data.content,
          data.description,
          userName,
          callback
        );
      }
    );

    socket.on("disconnecting", () => {
      const room: string = socket.data.room;
      const roomClients = io.sockets.adapter.rooms.get(room)?.size ?? 0;
      if (roomClients === 1) {
        console.log("Останній користувач покидає кімнату.");
        roomMemory.delete(room);
      }
      io.to(room).emit("leave-room", { userId: socket.id });
      socket.leave(room);
      console.log("Користувач відключився:", socket.id);
    });
  });
};
