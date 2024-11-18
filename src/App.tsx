import Navigation from "./Components/Navigation";

export const url = {
  api: "http://localhost:8085/api/",
};

// export const url = {
//   api: "http://SERVERNAME:8085/api/",
// };

function App() {
  return (
    <div className="container min-h-screen h-full max-w-full bg-gradient-to-r from-gray-400 to-gray-400">
      <Navigation />
      <div className="grid grid-cols-1 p-4">
          {/* <h1>Time Away</h1> */}
      </div>
    </div>
  );
}

export default App;
