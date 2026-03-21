import { RoomJoinForm } from "../components/session_join";
import { useState } from "react";

export function StartPage() {
  const [nameAndRoom, setNameAndRoom] = useState<Record<string, string>>({
    name: "",
    id: "",
  });

  return (
    <RoomJoinForm nameAndRoom={nameAndRoom} setNameAndRoom={setNameAndRoom} />
  );
}
