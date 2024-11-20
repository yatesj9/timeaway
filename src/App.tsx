import { useState } from "react";

import Navigation from "./Components/Navigation";
import Requests from "./Components/Requests";

export const url = {
  api: "http://localhost:8085/api/",
};

// export const url = {
//   api: "http://SERVERNAME:8085/api/",
// };

function App() {
  const [reloadRequests, setReloadRequests] = useState(false);

  const handleReloadRequests = () => {
    setReloadRequests((prev) => !prev);
  };

  return (
    <div className="container min-h-screen h-full max-w-full bg-white dark:bg-gray-900">
      <Navigation handleReloadRequests={handleReloadRequests} />
      <Requests reloadRequests={reloadRequests}/>
   </div>
  );
}

export default App;
