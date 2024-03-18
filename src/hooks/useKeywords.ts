import * as React from "react";
export const useKeywords = () => {
  const [keywords, setKeywords] = React.useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.split("\n");
    value.forEach((item, index) => {
      value[index] = item.split(",").join("").trim();
    });
    console.log(value);
    setKeywords(value);
    saveBlackList();
  };

  const saveBlackList = () => {
    localStorage.setItem("keywords", JSON.stringify(keywords));
  };

  return { keywords, handleChange, setKeywords };
};
