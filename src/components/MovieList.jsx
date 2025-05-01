import { useEffect, useState } from "react";

const API_BASE_URL = "https://tokenservice-jwt-2025.fly.dev";

export default function MovieList({ token }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/movies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchMovies();
    } else {
      setMovies([]); // if no token, clear movies
      setLoading(false);
    }
  }, [token]); // <--- very important!

  return (
    <div>
      <h2>Movie List</h2>
      {!token ? (
        <p>Please log in to view movies.</p>
      ) : loading ? (
        <p>Loading movies...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie._id}>
              <h3>
                {movie.title} ({movie.productionYear})
              </h3>
              <p>
                <strong>Director:</strong> {movie.director}
              </p>
              <p>{movie.description}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
