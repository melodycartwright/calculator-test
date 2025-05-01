import { useState, useEffect } from "react";
import RegisterMovie from "./components/RegisterMovie";
import MovieList from "./components/MovieList";

function App() {
  const [token, setToken] = useState("");


  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Movie Registration System</h1>
      <RegisterMovie token={token} setToken={setToken} />
      <MovieList token={token} />
    </div>
  );
}

export default App;

