import { useNavigate } from "react-router-dom";
import styles from "../styles/forms.module.css";

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className={styles["page-form"]}>
      <main className={styles["form"]}>
        <h1>This page does not exist!</h1>
        <h2 className="src" onClick={() => navigate(-1)}>
          Return
        </h2>
      </main>
    </div>
  );
}
