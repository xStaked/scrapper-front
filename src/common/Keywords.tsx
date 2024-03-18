import { Textarea } from "@/components/ui/textarea";
import { useKeywords } from "@/hooks/useKeywords";
import { useEffect } from "react";

export const Keywords = () => {
  const { keywords, handleChange, setKeywords } = useKeywords();

  useEffect(() => {
    const blackList = localStorage.getItem("keywords");
    if (blackList) {
      setKeywords(JSON.parse(blackList));
    }
  }, []);

  return (
    <Textarea
      placeholder="Palabras clave"
      value={keywords.join("\n")}
      onChange={handleChange}
    />
  );
};
