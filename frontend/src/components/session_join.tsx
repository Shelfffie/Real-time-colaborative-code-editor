import axios from "axios";
import React, { useState, type SetStateAction } from "react";
import type { RoomStatus } from "../types/interfaces";

export function RoomJoinForm({
  id,
  isPassword,
  setRoomStatus,
}: {
  id: string;
  isPassword: boolean;
  setRoomStatus: React.Dispatch<React.SetStateAction<RoomStatus>>;
}) {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPassword) return;
    setPassword(e.target.value);
  };

  const hadnleSend = async () => {
    if (name.trim() === "" || (isPassword && password.trim() === "")) {
      setError("The fields can't be empty.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/sessions/${id}/checking`,
        { password }
      );
      if (response.status === 200 && response.data.data === true) {
        setRoomStatus((prev) => ({ ...prev, inRoom: true }));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(
          "Server error:",
          error.response ? error.response.data : error.message
        );
        setError(error.response ? error.response.data.data : error.message);
      } else {
        console.log("Unknown error:", error);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <input type="text" value={name} onChange={(e) => handleNameChange(e)} />
      {isPassword && (
        <input
          type="password"
          value={password}
          onChange={(e) => handlePasswordChange(e)}
        />
      )}
      <p>{error}</p>
      <button onClick={() => hadnleSend()}>Submit</button>
    </div>
  );
}
