import styles from "../styles/forms.module.css";
import { useNavigate, useLocation } from "react-router-dom";

export function SuccesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationData = location.state;
  return (
    <div className={styles["page-form"]}>
      <main className={styles["form"]}>
        <h1>Room has been created!</h1>
        {location.state && (
          <>
            <p>Id: {locationData?.id}</p>
            <p>Title: {locationData?.title}</p>
          </>
        )}
        <p className={styles["src"]} onClick={() => navigate("/")}>
          Go to the join page
        </p>

        {location.state && (
          <>
            <h2>Or join your room:</h2>
          </>
        )}
      </main>
    </div>
  );
}
