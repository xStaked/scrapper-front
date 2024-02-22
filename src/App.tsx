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
import axios from "axios";

interface data {
  email: string;
}

function App() {
  const [searchValues, setSearchValues] = useState({
    search: "",
    limit: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<data[]>([]);

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

  const getEmails = async (
    links: string[],
    emailCount: number,
    linksPerRequest = 10
  ) => {
    let startIndex = 0;
    let collectedEmails: data[] = [];

    while (collectedEmails.length < emailCount && startIndex < links.length) {
      const endIndex = Math.min(startIndex + linksPerRequest, links.length);
      const currentLinks = links.slice(startIndex, endIndex);

      const data = await fetch(
        "https://l2ojdnzfnb.execute-api.us-east-1.amazonaws.com/default/scraping-agencias",
        {
          method: "POST",
          body: JSON.stringify({ links: currentLinks }),
        }
      ).then((res) => res.json());

      if (data && data.emails && Array.isArray(data.emails)) {
        collectedEmails = [...collectedEmails, ...data.emails];
        setData(collectedEmails);
      }

      startIndex += linksPerRequest;

      if (!data || !data.emails || !Array.isArray(data.emails)) {
        console.log("Error fetching emails");
        break;
      }
    }
  };

  const getEmailElements = async () => {
    try {
      setIsLoading(true);
      const { data: dataLinks } = await axios.get(
        "https://o6v44dvk2k.execute-api.us-east-1.amazonaws.com/default/scraping-links-agencias",
        {
          params: {
            query: searchValues.search,
          },
        }
      );
      await getEmails(dataLinks, searchValues.limit);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <main className="dark bg-slate-950 text-white w-screen h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-center">
          Buscar contactos agencias
        </h1>
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

          <Button variant="secondary" onClick={getEmailElements}>
            Search
          </Button>
        </div>
        <div className="flex justify-center items-center gap-4">
          {isLoading && <p>Loading...</p>}
        </div>
        <div
          className="
          flex
          flex-col
          gap-4
          w-full
          justify-center
          items-center
          dark
          overflow-y-auto
          h-1/2
          overflow-x-hidden
          scrollbar-hide
          "
        >
          {data &&
            data.map((item, index) => (
              <div key={index} className="flex flex-col gap-4">
                <p>{item.email}</p>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}

export default App;
