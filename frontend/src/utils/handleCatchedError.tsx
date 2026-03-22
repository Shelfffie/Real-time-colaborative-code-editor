import axios from "axios";
import type React from "react";

export function HandleCatchError(
  error: unknown,
  setError: React.Dispatch<React.SetStateAction<string>>
) {
  if (axios.isAxiosError(error)) {
    console.log(
      "Server error:",
      error.response ? error.response.data : error.message
    );
    setError(`${error.response ? error.response.data : error.message}`);
  } else {
    console.log("Unknown error:", error);
    setError(`${error}`);
  }
}
