import Navigation from "./Components/Navigation";

export const url = {
  api: "http://localhost:8085/api/",
};

// export const url = {
//   api: "http://SERVERNAME:8085/api/",
// };

function App() {
  return (
    <div className="container min-h-screen h-full max-w-full bg-white dark:bg-gray-900">
      <Navigation />

      <div className="grid grid-cols-1 p-4">
        <h1 className="dark:text-white">Time Away Application</h1>
      </div>
    </div>
  );
}

export default App;
