import * as React from "react";
export const useBlackList = () => {
  const [blacklist, setBlacklist] = React.useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.split("\n");
    value.forEach((item, index) => {
      value[index] = item.split(",").join("").trim();
    });
    console.log(value)
    setBlacklist(value);
    saveBlackList();
  };

  const saveBlackList = () => {
    localStorage.setItem("blacklist", JSON.stringify(blacklist));
  };

  return { blacklist, handleChange, setBlacklist };
};
