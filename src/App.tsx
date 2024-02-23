import { Input } from "./components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearch } from "./hooks/useSearch";

function App() {
  const {
    dataEmails,
    handleSearch,
    handleLimit,
    searchValues,
    getEmailElements,
    isLoading,
  } = useSearch();

  return (
    <>
      <main
        className={`dark bg-slate-950 text-white ${
          dataEmails.length > 12 ? "h-[100%]" : "h-screen"
        }  flex flex-col items-center gap-4`}
      >
        <h1 className="text-4xl font-bold text-center mt-4">
          Buscar contactos agencias
        </h1>
        <div className="flex gap-4 w-full  justify-center dark mt-4 ">
          <Input
            type="text"
            className="w-1/2"
            placeholder="Buscar agencias"
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

          <Button
            variant="secondary"
            onClick={getEmailElements}
            disabled={isLoading}
          >
            Buscar
          </Button>
        </div>
        <div className="flex justify-start items-start gap-4">
          {isLoading && <p>Buscando...</p>}
        </div>
        {dataEmails.length > 1 && (
          <table className="table-auto w-[1000px] my-3">
            <thead>
              <tr>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Origen</th>
              </tr>
            </thead>
            <tbody>
              {dataEmails.map((item, index: number) => (
                <tr key={item.email}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.email}</td>
                  <td className="border px-4 py-2">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 underline"
                    >
                      {item.link}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
}

export default App;
