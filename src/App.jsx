import { useState, useEffect } from "react";
import RegisterMovie from "./components/RegisterMovie";
import MovieList from "./components/MovieList";

function App() {
  const [token, setToken] = useState("");
  const [refreshMovies, setRefreshMovies] = useState(false);


  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  const handleMovieAdded = () => {
    setRefreshMovies((prev) => !prev); // Toggle to trigger useEffect in MovieList
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}
    >
      <h1>Movie Registration System</h1>
      <RegisterMovie
        token={token}
        setToken={setToken}
        onMovieAdded={handleMovieAdded}
      />
      <MovieList token={token} refresh={refreshMovies} />
    </div>
  );
}

export default App;