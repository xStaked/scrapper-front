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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearch } from "./hooks/useSearch";
import { SearchOptions } from "@/common/SearchOptions";
// import { Options } from "./common/Options";

function App() {
  const {
    dataEmails,
    handleSearch,
    handleLimit,
    searchValues,
    getEmailElements,
    isLoading,
    links,
    options,
    // linksWithNoEmails,
    copyToClipboard,
    copyToClipboardAllEmails,
  } = useSearch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLinks = links.slice(indexOfFirstItem, indexOfLastItem);
  const numberOfPages = Math.ceil(links.length / itemsPerPage);

  const paginateLinks = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > numberOfPages) return;
    setCurrentPage(pageNumber);
  };

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
        <div className="flex flex-row gap-4 w-full  justify-center dark mt-4 ">
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

          <SearchOptions />

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
                  <TableHead className="px-4 py-2 flex gap-4 items-center">
                    Email
                    <Button
                      onClick={copyToClipboardAllEmails}
                      className="text-white bg-slate-900 hover:bg-slate-800"
                    >
                      <i className="fa-solid fa-copy"></i>
                    </Button>
                  </TableHead>
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
        {/* {linksWithNoEmails.length > 0 && options.showAllLinksWithNoEmails && (
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
                <TableBody>
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
                </TableBody>
              </Table>
            </div>
          </>
        )} */}
        {links.length > 0 && options.showAllLinks && (
          <div className="flex flex-col justify-center items-center gap-4">
            <h2 className="text-2xl font-bold text-center mt-4">
              Todos los links
            </h2>
            <Table className="w-[70%] my-3">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 py-2">Item</TableHead>
                  <TableHead className="px-4 py-2">Origen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentLinks.map((link, index) => (
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
              </TableBody>
            </Table>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => paginateLinks(currentPage - 1)}
                  />
                </PaginationItem>
                {numberOfPages > 1 &&
                  Array.from({ length: numberOfPages }).map((_, index) => (
                    <PaginationItem
                      key={index}
                      onClick={() => paginateLinks(index + 1)}
                    >
                      <PaginationLink isActive={currentPage === index + 1}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => paginateLinks(currentPage + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
