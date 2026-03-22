import axios from "axios";
import type { SessionType, VersionType } from "../types/interfaces";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { HandleCatchError } from "../utils/handleCatchedError";

export function APIRequests() {
  const navigate = useNavigate();
  const createNewSession = async (
    data: SessionType,
    password: string,
    setError: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
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
      HandleCatchError(error, setError);
    }
  };

  const getVersion = async (
    id: string,
    version: string,
    setData: React.Dispatch<React.SetStateAction<VersionType | null>>,
    setIsReturned: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
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
      HandleCatchError(error, setError);
    }
  };

  const getVerionHistory = async (
    id: string,
    setData: React.Dispatch<React.SetStateAction<VersionType[] | null>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
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
      HandleCatchError(error, setError);
    }
  };

  return { createNewSession, getVersion, getVerionHistory };
}
