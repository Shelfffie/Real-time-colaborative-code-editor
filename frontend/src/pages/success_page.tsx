import { useState, useEffect } from "react";
import styles from "../styles/forms.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import type { returnedSession } from "../types/interfaces";
import { JoinTheRoomForm } from "../components/join_room_forms_inputs";

export function SuccesPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location.state.data);
  }, [location.state]);
  const [data, setData] = useState<returnedSession>(location.state.data);
  return (
    <div className={styles["page-form"]}>
      <main className={styles["form"]}>
        <h1>Room has been created!</h1>
        {location.state && (
          <>
            <p>Id: {data?.id}</p>
            <p>Title: {data?.title}</p>
          </>
        )}
        <h2 className={styles["src"]} onClick={() => navigate("/")}>
          Go to the join page
        </h2>

        {location.state && (
          <>
            <p>or</p>
            <h2>Join your room:</h2>
            <JoinTheRoomForm room={data.id} />
          </>
        )}
      </main>
    </div>
  );
}
