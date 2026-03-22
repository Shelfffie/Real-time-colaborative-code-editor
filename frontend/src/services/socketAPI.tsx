import { socket } from "../socket/connection";
import type React from "react";
import type { SessionType } from "../types/interfaces";

export function SocketAPI() {
  const saveChanges = async (
    id: string,
    content: string,
    description: string,
    setOriginalContent: React.Dispatch<
      React.SetStateAction<SessionType | undefined>
    >,
    setError: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    console.log(
      "Saved changes:",
      content,
      "\n description:",
      description,
      "\n id to change:",
      id
    );

    socket.emit(
      "handleChanges",
      { id: id, content: content, description: description },
      (result: string, success: boolean) => {
        if (success) {
          console.log("Changes in socketAPI is success!:", result);
          setOriginalContent((prev) => ({ ...prev!, content: content }));
        } else {
          console.log("Error occured in socketAPI:", result);
          setError(`${result}`);
        }
      }
    );
  };

  return { saveChanges };
}
