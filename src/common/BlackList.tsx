import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { useBlackList } from "@/hooks/useBlackList";

export const BlackList = () => {
  const { blacklist, handleChange, setBlacklist } = useBlackList();

  React.useEffect(() => {
    const blackList = localStorage.getItem("blacklist");
    if (blackList) {
      setBlacklist(JSON.parse(blackList));
    }
  }, []);

  return (
    <Textarea
      placeholder="Agregar palabras a la lista negra"
      value={blacklist.join("\n")}
      onChange={handleChange}
    />
  );
};
