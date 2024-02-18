import { Input } from "./components/ui/input";

function App() {
  return (
    <>
      <div className="dark bg-slate-950 text-white w-screen h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-center">Scrapper front</h1>
        <Input
          type="text"
          className="w-1/2"
          placeholder="Search for something"
        />
      </div>
    </>
  );
}

export default App;
