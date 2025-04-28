import { useEffect, useState } from "react";

const API_BASE_URL = "https://tokenservice-jwt-2025.fly.dev";


export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("jwtToken"); //MAy need to be fixed in a bit

    useEffect(()=> {
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
        }
    }, [token]);

    return (
        <div>
            <h2>Movie List</h2>
            {loading && <p>Loading movies...</p>}
            {error && <p style={{color: "red"}}>{error}</p>}
            <ul>
            {/* movie list*/}
            </ul>
        </div>
    );
}