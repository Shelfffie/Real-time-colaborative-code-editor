import { useState, useEffect, useRef } from "react";

export function useErrorMessageHandler() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setWarning("");
    }, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [warning]);

  return { warning, setWarning };
}
