import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function App() {
  const [searchValues, setSearchValues] = useState({
    search: "",
    limit: 10,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValues({
      ...searchValues,
      search: e.target.value,
    });
  };

  const handleLimit = (value: string) => {
    console.log(value);
    setSearchValues({
      ...searchValues,
      limit: parseInt(value),
    });
  };

  return (
    <>
      <main className="dark bg-slate-950 text-white w-screen h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-center">Scrapper front</h1>
        <div
          className="
          flex
          gap-4
          w-full
          justify-center
          items-center
          dark
        "
        >
          <Input
            type="text"
            className="w-1/2"
            placeholder="Search for something"
            onChange={handleSearch}
          />
          <Select
            value={searchValues.limit.toString()}
            onValueChange={handleLimit}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className="w-1/4">
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="secondary">Search</Button>
        </div>
      </main>
    </>
  );
}

export default App;
