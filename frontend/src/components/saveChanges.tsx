import { APIRequests } from "../services/apiRequests";
import React, { useState, useEffect, useRef } from "react";

export function SaveChangesSession({
  content,
  id,
}: {
  content: string | null;
  id: string;
}) {
  const [description, setDescription] = useState<string>("");
  const [warning, setWarning] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { saveChanges } = APIRequests();

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setWarning("");
    }, 2000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [warning]);

  const handleDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    if (!id || !content) return;
    e.preventDefault();

    if (description.trim() === "") {
      setWarning("Enter a description before saving.");
    }

    saveChanges(id, content, description);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <p>Enter a description before saving:</p>
      <input type="text" value={description} onChange={(e) => handleDesc(e)} />
      <button type="submit">Зберегти зміни</button>
      <p>{warning}</p>
    </form>
  );
}
