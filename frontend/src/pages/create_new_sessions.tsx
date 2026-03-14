import React, { useState } from "react";
import { APIRequests } from "../services/apiRequests";
import type { SessionType } from "../types/interfaces";

export function CreateSession() {
  const { createNewSession } = APIRequests();
  const [value, setValue] = useState<SessionType>({ title: "", content: "" });
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    element: keyof SessionType
  ) => {
    setValue({ ...value, [element]: event.target.value });
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.title.trim() === "") {
      setErrorMessage("The title must be filled in!");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }

    await createNewSession(value);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Title"
        value={value.title}
        onChange={(event) => handleChange(event, "title")}
      />
      <textarea
        name=""
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
