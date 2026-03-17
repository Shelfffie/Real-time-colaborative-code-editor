import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Connection from "../components/editor-pg";
import { RoomJoinForm } from "../components/session_join";
import type { RoomStatus } from "../types/interfaces";
import { socket } from "../socket/connection";

export function SessionPage() {
  const { id } = useParams<{ id: string }>();
  const [roomStatus, setRoomStatus] = useState<RoomStatus>({
    inRoom: null,
    isPassword: false,
  });

  useEffect(() => {
    if (!id || !socket) return;
    const checkRoomv = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/sessions/${id}/status`
        );
        if (response.status === 200) {
          console.log(response.data.data);

          setRoomStatus((prev) => ({
            ...prev,
            isPassword: response.data.data,
          }));
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(
            "Server error:",
            error.response ? error.response.data : error.message
          );
        } else {
          console.log("Unknown error:", error);
        }
      }
    };
    socket.emit("check-room", id, (data: any) => {
      console.log(data);
      if (data.inRoom) {
        setRoomStatus((prev) => ({ ...prev, inRoom: true }));
      } else {
        setRoomStatus((prev) => ({ ...prev, inRoom: false }));
        checkRoomv();
      }
    });
  }, [id, socket]);

  if (roomStatus.inRoom === null) return <p>Loading...</p>;

  if (!id) return null;
  return roomStatus.inRoom ? (
    <Connection id={id} />
  ) : (
    <RoomJoinForm
      id={id}
      isPassword={roomStatus.isPassword}
      setRoomStatus={setRoomStatus}
    />
  );
}
