import React from "react";
import styles from "../styles/forms.module.css";
import { JoinTheRoomForm } from "../components/join_room_forms_inputs";
import { useNavigate } from "react-router-dom";

export function RoomJoinForm({}: {
  nameAndRoom: Record<string, string>;
  setNameAndRoom: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  const navigate = useNavigate();
  return (
    <div className={styles["page-form"]}>
      <main className={styles["form"]}>
        <h1>Join the session</h1>
        <JoinTheRoomForm />
      </main>
      <p className={styles["src"]} onClick={() => navigate("/create")}>
        Create new session
      </p>
    </div>
  );
}
