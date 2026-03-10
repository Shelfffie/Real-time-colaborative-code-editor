import { Server, Socket } from "socket.io";
import type { Point } from "../types/models";

export const socketConn = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("Сокет підключений!", socket.id);

    socket.on("mouse-move", (pos: Point) => {
      socket.broadcast.emit("mouse-cords", { userId: socket.id, pos });
    });
  });
};
