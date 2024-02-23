import { Input } from "./components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "./components/ui/label";
import { useSearch } from "./hooks/useSearch";

function App() {
  const {
    dataEmails,
    handleSearch,
    handleLimit,
    searchValues,
    getEmailElements,
    isLoading,
    handleShowAllLinks,
    handleShowAllLinksWithNoEmails,
    links,
    options,
    linksWithNoEmails,
    copyToClipboard,
  } = useSearch();

  return (
    <>
      <main
        className={`dark bg-slate-950 text-white ${
          dataEmails.length > 12 || (options.showAllLinks && links.length > 0)
            ? "h-[100%]"
            : "h-screen"
        }  flex flex-col items-center gap-4 pb-2`}
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

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Opciones</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Options</h4>
                  <p className="text-sm text-muted-foreground">
                    Mostrar opciones adicionales
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="showAllLinks">
                      Mostrar todos los links
                    </Label>
                    <Input
                      id="showAllLinks"
                      type="checkbox"
                      defaultChecked
                      onChange={handleShowAllLinks}
                      checked={options.showAllLinks}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="showAlllinksWithNoEmails">
                      Mostrar links sin emails
                    </Label>
                    <Input
                      id="showAlllinksWithNoEmails"
                      type="checkbox"
                      onChange={handleShowAllLinksWithNoEmails}
                      checked={options.showAllLinksWithNoEmails}
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

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
          <section className="flex flex-col justify-center items-center gap-4">
            <Table className=" w-[70%] my-3">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 py-2">Item</TableHead>
                  <TableHead className="px-4 py-2">Email</TableHead>
                  <TableHead className="px-4 py-2">Origen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataEmails.map((item, index: number) => (
                  <TableRow key={item.email}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      {item.email}
                      <Button
                        onClick={() => copyToClipboard(item.email)}
                        className="text-white bg-slate-900 hover:bg-slate-800"
                      >
                        <i className="fa-solid fa-copy"></i>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 underline"
                      >
                        {item.link}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        )}
        {linksWithNoEmails.length > 0 && options.showAllLinksWithNoEmails && (
          <>
            <div className="flex flex-col justify-center items-center gap-4">
              <h2 className="text-2xl font-bold text-center mt-4">
                Links sin emails
              </h2>
              <Table className="w-[70%] my-3">
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-4 py-2">Item</TableHead>
                    <TableHead className="px-4 py-2">Origen</TableHead>
                  </TableRow>
                </TableHeader>
                <tbody>
                  {linksWithNoEmails.map((link, index) => (
                    <TableRow key={link}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <a
                          href={link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 underline"
                        >
                          {link}
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        )}
        {links.length > 0 && options.showAllLinks && (
          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="text-2xl font-bold text-center mt-4">
              Todos los links
            </h2>
            <table className="w-[70%] my-3">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 py-2">Item</TableHead>
                  <TableHead className="px-4 py-2">Origen</TableHead>
                </TableRow>
              </TableHeader>
              <tbody>
                {links.map((link, index) => (
                  <TableRow key={link}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 underline"
                      >
                        {link}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
