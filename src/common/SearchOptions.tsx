import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearch } from "@/hooks/useSearch";
import { BlackList } from "./BlackList";
import { Keywords } from "./Keywords";
import { Button } from "@/components/ui/button";

export const SearchOptions = () => {
  const {
    handleShowAllLinks,
    options,
    handleShowAllLinksWithNoEmails,
    handleKeepSearching,
    firstLoadOptions,
    handleNumberOfPages,
  } = useSearch();

  useEffect(() => {
    const options = JSON.parse(localStorage.getItem("options") || "{}");

    if (Object.keys(options).length === 0) {
      localStorage.setItem("options", JSON.stringify(options));
    } else {
      firstLoadOptions(
        options.showAllLinks,
        options.showAllLinksWithNoEmails,
        options.keepSearching,
        options.numberOfPages
      );
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="btn-primary">Opciones</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Opciones
            <span className="text-xs text-gray-400 ml-2">
              (Los cambios se guardan automáticamente)
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 items-center gap-2">
          <Label htmlFor="showAllLinks">Mostrar todos los links</Label>
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

        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="showAlllinksWithNoEmails">
            Seguir buscando hasta que se acaben los links
          </Label>
          <Input
            id="showAlllinksWithNoEmails"
            type="checkbox"
            onChange={handleKeepSearching}
            checked={options.keepSearching}
            className="col-span-1 h-8"
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="blacklist">Blacklist</Label>
          <BlackList />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="blacklist">Palabras clave</Label>
          <Keywords />
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="blacklist">
            Número de paginas a buscar
            {"\n"}
            <span className="text-xs text-gray-400 col-span-2">
              (Solo modificar si se agregan palabras clave o si no se encuentran
              resultados. Limite de 12 paginas)
            </span>
          </Label>

          <Input
            type="number"
            id="limit"
            onChange={handleNumberOfPages}
            value={options.numberOfPages}
            defaultValue="10"
            min="12"
            className="col-span-1 h-8"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
