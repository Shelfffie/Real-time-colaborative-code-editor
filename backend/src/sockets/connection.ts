import { Server } from "socket.io";
import type { Point } from "../types/models";

const roomMemory = new Map<string, string>();

export const socketConn = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("Сокет підключений!", socket.id);

    socket.on("join-room", (room: string) => {
      console.log("You join the room:", room);
      socket.join(room);
      socket.data.room = room;

      console.log("Joined room:", room);
      console.log("Rooms:", socket.rooms);
    });

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

    socket.on("disconnecting", () => {
      const room: string = socket.data.room;
      const roomClients = io.sockets.adapter.rooms.get(room)?.size ?? 0;
      if (roomClients === 1) {
        console.log("Останній користувач покидає кімнату.");
        roomMemory.delete(room);
      }
      socket.leave(room);
      console.log("Користувач відключився:", socket.id);
    });
  });
};
