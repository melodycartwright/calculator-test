import { useEffect, useState } from "react";

const API_BASE_URL = "https://tokenservice-jwt-2025.fly.dev";

export default function MovieList({ token }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      // Only fetch if we have a token
      if (!token) return;

      setLoading(true);
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

    fetchMovies();
  }, [token]); // Re-fetch when token changes

  // Don't render anything if there's no token
  if (!token) {
    return null;
  }

  return (
    <div>
      <h2>Movie List</h2>
      {loading ? (
        <p>Loading movies...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : movies.length === 0 ? (
        <p>No movies found. Register your first movie!</p>
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
