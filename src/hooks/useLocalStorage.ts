import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
      try {
        const saved = localStorage.getItem(key);
        if (saved !== null) {
          return JSON.parse(saved) as T;
        }

        return initialValue;
      } catch (error) {
        console.error("Ошибка чтения localStorage:", error);
        return initialValue;
      }
    });

  useEffect(() => {localStorage.setItem(key, JSON.stringify(value));}, [key, value]);

  return [value, setValue] as const;
}