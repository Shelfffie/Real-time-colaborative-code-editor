import React, { useState, useEffect, useRef } from "react";
import type { SessionType } from "../types/interfaces";
import { SocketAPI } from "../services/socketAPI";
import { useErrorMessageHandler } from "../utils/errorMessageHandler";

export function SaveChangesSession({
  originalContent,
  content,
  setOriginalContent,
  id,
}: {
  originalContent: string | null;
  content: string | null;
  setOriginalContent: React.Dispatch<
    React.SetStateAction<SessionType | undefined>
  >;
  id: string;
}) {
  const [description, setDescription] = useState<string>("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { saveChanges } = SocketAPI();
  const { warning, setWarning } = useErrorMessageHandler();

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
    saveChanges(id, content, description, setOriginalContent);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="save-changes-section">
      <h2>Save changes:</h2>
      <section className="save-changes-input-button">
        <input
          type="text"
          value={description}
          placeholder="Description"
          onChange={(e) => handleDesc(e)}
        />
        <button type="submit" className="cursor-btn">
          <img
            src="/icons/save_img.png"
            alt="Save changes button"
            className="save-btn-img"
          />
        </button>
      </section>
      <p className="error-message">{warning}</p>
    </form>
  );
}
