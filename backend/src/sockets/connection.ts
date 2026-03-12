import { Server } from "socket.io";
import type { Point } from "../types/models";

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

    socket.on("editor-change", (value: string) => {
      const room: string = socket.data.room;
      console.log(value);
      io.to(room).emit("new-code", { userId: socket.id, value });
    });

    socket.on("disconnect", () => {
      const room: string = socket.data.room;
      socket.leave(room);
      console.log("Користувач відключився:", socket.id);
    });
  });
};
