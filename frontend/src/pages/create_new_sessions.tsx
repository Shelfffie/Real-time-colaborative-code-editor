import React, { useState } from "react";
import { APIRequests } from "../services/apiRequests";
import type { SessionType } from "../types/interfaces";
import styles from "../styles/forms.module.css";
import { useNavigate } from "react-router-dom";
import { useErrorMessageHandler } from "../hooks/errorMessageHandler";

export function CreateSession() {
  const { createNewSession } = APIRequests();
  const [value, setValue] = useState<SessionType>({ title: "", content: "" });
  const [password, setPassword] = useState<string>("");
  const { warning, setWarning } = useErrorMessageHandler();
  const navigate = useNavigate();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    element: keyof SessionType
  ) => {
    setValue({ ...value, [element]: event.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.title.trim() === "") {
      setWarning("The title must be filled in!");
      return;
    }

    await createNewSession(value, password);
  };

  return (
    <div className={styles["page-form"]}>
      <h1>Create new session</h1>
      <form onSubmit={(e) => handleSubmit(e)} className={styles["form"]}>
        <section>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={value.title}
            className={styles["inputEl"]}
            onChange={(event) => handleChange(event, "title")}
          />
          <p className="error-message">{warning}</p>
        </section>
        <section>
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            className={styles["inputEl"]}
            onChange={(e) => handlePasswordChange(e)}
          />
          <p>
            *if you want a session without a password, leave the field blank
          </p>
        </section>
        <section>
          <label htmlFor="content">Initial content</label>
          <textarea
            name="content"
            id=""
            placeholder="Content"
            value={value.content || ""}
            className={`${styles["inputEl"]} ${styles["textarea"]}`}
            onChange={(event) => handleChange(event, "content")}
          ></textarea>
        </section>

        <button type="submit">Create the session</button>
      </form>
      <p className="src" onClick={() => navigate("/")}>
        Join existing session
      </p>
    </div>
  );
}
