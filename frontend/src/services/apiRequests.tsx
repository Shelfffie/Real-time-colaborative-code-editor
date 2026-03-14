import axios from "axios";
import type { SessionType, VersionType } from "../types/interfaces";

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

  const saveChanges = async (
    id: string,
    content: string,
    description: string
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/sessions/${id}`,
        { content, description }
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
        console.log("Versions are got!");
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
