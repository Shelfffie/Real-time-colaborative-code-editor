import { RoomJoinForm } from "../components/session_join";
import axios from "axios";
import { useState, useEffect } from "react";
import type { RoomStatus } from "../types/interfaces";
import { socket } from "../socket/connection";

export function StartPage() {
  const [nameAndRoom, setNameAndRoom] = useState<Record<string, string>>({
    name: "",
    id: "",
  });

  return (
    <RoomJoinForm nameAndRoom={nameAndRoom} setNameAndRoom={setNameAndRoom} />
  );
}
