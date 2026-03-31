// resources/js/components/ui/use-toast.ts
import { useState } from "react";

export function useToast() {
  const [messages, setMessages] = useState<string[]>([]);

  const addToast = (msg: string) => {
    setMessages((prev) => [...prev, msg]);
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m !== msg));
    }, 3000);
  };

  return { messages, addToast };
}
