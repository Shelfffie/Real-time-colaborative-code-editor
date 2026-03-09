import { Server, Socket } from "socket.io";

export const socketConn = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(socket.id);
  });
};
