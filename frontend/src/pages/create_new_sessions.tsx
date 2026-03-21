import React, { useState } from "react";
import { APIRequests } from "../services/apiRequests";
import type { SessionType } from "../types/interfaces";

export function CreateSession() {
  const { createNewSession } = APIRequests();
  const [value, setValue] = useState<SessionType>({ title: "", content: "" });
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>();

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
      setErrorMessage("The title must be filled in!");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }

    await createNewSession(value, password);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="title">Title</label>
      <input
        name="title"
        type="text"
        placeholder="Title"
        value={value.title}
        onChange={(event) => handleChange(event, "title")}
      />
      <label htmlFor="password">Password:</label>
      <input
        name="password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => handlePasswordChange(e)}
      />
      <p>*if you want a session without a password, leave the field blank</p>
      <label htmlFor="content">Initial content</label>
      <textarea
        name="content"
        id=""
        placeholder="Content"
        value={value.content || ""}
        onChange={(event) => handleChange(event, "content")}
      ></textarea>
      <p>{errorMessage}</p>
      <button type="submit">Create the session</button>
    </form>
  );
}
