import axios from "axios";
import type { SessionType, VersionType } from "../types/interfaces";
import type React from "react";
import { useNavigate } from "react-router-dom";

export function APIRequests() {
  const navigate = useNavigate();
  const createNewSession = async (data: SessionType, password: string) => {
    if (!data.title) return;
    try {
      const response = await axios.post(`http://localhost:3000/sessions`, {
        title: data.title,
        content: data.content,
        password,
      });
      if (response.status === 200) {
        console.log("New session created!");
        console.log(response.data.data);
        navigate("/success", { state: { data: response.data.data } });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(
          "Server error:",
          error.response ? error.response.data : error.message
        );
      } else {
        console.log("Unknown error:", error);
      }
    }
  };

  const saveChanges = async (
    id: string,
    content: string,
    description: string,
    setOriginalContent: React.Dispatch<
      React.SetStateAction<SessionType | undefined>
    >
  ) => {
    console.log(
      "Saved changes:",
      content,
      "\n description:",
      description,
      "\n id to change:",
      id
    );

    try {
      const response = await axios.post(
        `http://localhost:3000/sessions/${id}`,
        { content, description }
      );
      if (response.status === 200) {
        console.log("Changes are saved!");
        setOriginalContent((prev) => ({ ...prev!, content: content }));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(
          "Server error:",
          error.response ? error.response.data : error.message
        );
      } else {
        console.log("Unknown error:", error);
      }
    }
  };

  const getVersion = async (
    id: string,
    version: string,
    setData: React.Dispatch<React.SetStateAction<VersionType | null>>,
    setIsReturned: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/sessions/${id}/version/${version}`
      );
      if (response.status === 200) {
        console.log("Version is got!:", response.data.data);
        setData(response.data.data);
        setIsReturned(true);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(
          "Server error:",
          error.response ? error.response.data : error.message
        );
      } else {
        console.log("Unknown error:", error);
      }
    }
  };

  const getVerionHistory = async (
    id: string,
    setData: React.Dispatch<React.SetStateAction<VersionType[] | null>>
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/sessions/${id}/version`
      );
      if (response.status === 200) {
        console.log("Versions are got!:", response.data.data);
        setData(response.data.data);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(
          "Server error:",
          error.response ? error.response.data : error.message
        );
      } else {
        console.log("Unknown error:", error);
      }
    }
  };

  return { createNewSession, saveChanges, getVersion, getVerionHistory };
}
