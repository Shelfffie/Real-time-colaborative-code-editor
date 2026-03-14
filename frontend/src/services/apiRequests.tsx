import axios from "axios";
import type { SessionType } from "../types/interfaces";
import type { Dispatch, SetStateAction } from "react";

export function APIRequests() {
  const createNewSession = async (data: SessionType) => {
    try {
      const response = await axios.post(`http://localhost:3000/sessions`, data);
      if (response.status === 200) {
        console.log("New session created!");
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

  const saveChanges = async (id: string, data: SessionType) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/sessions/${id}`,
        data
      );
      if (response.status === 200) {
        console.log("Changes are saved!");
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
    setNewData: Dispatch<SetStateAction<string>>
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/sessions/${id}/version/${version}`
      );
      if (response.status === 200) {
        console.log("Version is getting!");
        setNewData(response.data.data);
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

  return { createNewSession, saveChanges, getVersion };
}
