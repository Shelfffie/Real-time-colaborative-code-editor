import axios from "axios";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function RoomJoinForm({
  nameAndRoom,
  setNameAndRoom,
}: {
  nameAndRoom: Record<string, string>;
  setNameAndRoom: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setNameAndRoom((prev) => ({ ...prev, [value]: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const hadnleSend = async () => {
    if (
      nameAndRoom.id.trim() === "" ||
      isNaN(parseInt(nameAndRoom.id)) ||
      nameAndRoom.name.trim() === ""
    ) {
      setError("The fields can't be empty.");
      return;
    }
    const passwordToSend = password.trim();
    try {
      const response = await axios.post(
        `http://localhost:3000/sessions/${nameAndRoom.id}/checking`,
        { password: passwordToSend, name: nameAndRoom.name }
      );
      if (response.status === 200) {
        navigate(`/session/${nameAndRoom.id}`, {
          state: { name: nameAndRoom.name },
        });
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
      <label htmlFor="id">Id:</label>
      <input
        name="id"
        type="text"
        value={nameAndRoom.id}
        onChange={(e) => handleNameChange(e, "id")}
      />
      <label htmlFor="password">Password:</label>
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => handlePasswordChange(e)}
      />
      <p>*If the room does not have a password, leave the field blank.</p>
      <label htmlFor="name">Name:</label>
      <input
        name="name"
        type="text"
        value={nameAndRoom.name}
        onChange={(e) => handleNameChange(e, "name")}
      />
      <p>{error}</p>
      <button onClick={() => hadnleSend()}>Submit</button>
    </div>
  );
}
