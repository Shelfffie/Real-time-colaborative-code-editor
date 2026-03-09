import { createContext, useContext, type ReactNode } from "react";
import { socket } from "./connection";
import type { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(socket);

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: ReactNode }) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
