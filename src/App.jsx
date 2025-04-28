import { useState } from "react";
import RegisterMovie from "./components/RegisterMovie"
import MovieList from "./components/MovieList"

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || "");
 

  return (
    <>
      <div>
<RegisterMovie />
<MovieList />
      </div>
  
    </>
  );
}

export default App
