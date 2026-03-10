import { useState, useRef, useEffect } from "react";

export function useThrottle<T>({
  value,
  interval,
}: {
  value: T;
  interval: number;
}) {
  const [thrtottleValue, setThrottleValue] = useState(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastValueRef = useRef(value);

  useEffect(() => {
    lastValueRef.current = value;

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setThrottleValue(lastValueRef.current);
      timeoutRef.current = null;
    }, interval);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, interval]);

  return thrtottleValue;
}
