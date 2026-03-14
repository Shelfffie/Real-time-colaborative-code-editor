import { APIRequests } from "../services/apiRequests";
import React, { useState, useEffect, useRef } from "react";

export function SaveChangesSession({
  originalContent,
  content,
  id,
}: {
  originalContent: string | null;
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
    }, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [warning]);

  const handleDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !content || !originalContent) return;
    if (description.trim() === "") {
      setWarning("Enter a description before saving.");
      return;
    }

    if (originalContent.trim() === content.trim()) {
      setWarning("Session content has not changed: there is nothing to save.");
      return;
    }

    setDescription("");
    setWarning("");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    saveChanges(id, originalContent, description);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <p>Description:</p>
      <input
        type="text"
        value={description}
        placeholder="Description"
        onChange={(e) => handleDesc(e)}
      />
      <button type="submit">Зберегти зміни</button>
      <p>{warning}</p>
    </form>
  );
}
