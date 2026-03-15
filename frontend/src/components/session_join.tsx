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
    }
    try {
      const response = axios.post("", password);
    } catch (error) {
      setError("denied");
    }
  };

  return (
    <div>
      <input type="text" value={name} />
      {isPassword && <input type="text" value={password} />}
      <p>{error}0</p>
      <button>Submit</button>
    </div>
  );
}
