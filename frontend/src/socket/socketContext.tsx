import { useContext, createContext, type ReactNode } from "react";

import { socket } from "./connection";

const SocketContext = createContext(socket);

export function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
