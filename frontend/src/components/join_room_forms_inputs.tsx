import styles from "../styles/forms.module.css";
import { useState } from "react";
import { useErrorMessageHandler } from "../utils/errorMessageHandler";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function JoinTheRoomForm({ room }: { room?: string | undefined }) {
  const [password, setPassword] = useState<string>("");
  const { warning, setWarning } = useErrorMessageHandler();
  const [nameAndRoom, setNameAndRoom] = useState<Record<string, string>>({
    name: "",
    id: String(room) ?? "",
  });
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
    console.log(nameAndRoom.id);

    if (
      nameAndRoom.id.trim() === "" ||
      isNaN(parseInt(nameAndRoom.id)) ||
      nameAndRoom.name.trim() === ""
    ) {
      setWarning("The fields can't be empty.");
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
        setWarning(error.response ? error.response.data.data : error.message);
      } else {
        console.log("Unknown error:", error);
        setWarning("Unknown error");
      }
    }
  };

  return (
    <>
      <section>
        <label htmlFor="id">Id:</label>
        <input
          name="id"
          type="number"
          autoComplete="off"
          className={styles["inputEl"]}
          value={nameAndRoom.id}
          onChange={(e) => handleNameChange(e, "id")}
        />
      </section>
      <section>
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          className={styles["inputEl"]}
          value={password}
          onChange={(e) => handlePasswordChange(e)}
        />
        <p className={styles["note"]}>
          *If the room does not have a password, leave the field blank.
        </p>
      </section>
      <section>
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          type="text"
          className={styles["inputEl"]}
          value={nameAndRoom.name}
          onChange={(e) => handleNameChange(e, "name")}
        />
      </section>
      <p className="error-message">{warning}</p>
      <button onClick={() => hadnleSend()}>Join</button>
    </>
  );
}
