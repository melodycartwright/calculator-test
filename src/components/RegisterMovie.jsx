import { useState, useEffect } from "react";

const API_BASE_URL = "https://tokenservice-jwt-2025.fly.dev";

export default function RegisterMovie({ token, setToken, onMovieAdded }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [productionYear, setProductionYear] = useState("");
  const [description, setDescription] = useState("");
  const [director, setDirector] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, [token, setToken]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const loginUrl = `${API_BASE_URL}/token-service/v1/request-token`;

      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const receivedToken = await response.text();

      if (receivedToken) {
        setToken(receivedToken);
        localStorage.setItem("jwtToken", receivedToken);
        setMessage("Login successful! You can now register a movie.");
      } else {
        setMessage("Login failed. No token received.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred during login.");
    }
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("jwtToken");
    setMessage("Logged out successfully.");
  };

  const handleSubmitMovie = async (e) => {
    e.preventDefault();
    setMessage("");

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedDirector = director.trim();
    const trimmedYear = productionYear.trim();
    const year = Number(trimmedYear);
    const currentYear = new Date().getFullYear();

    if (
      !trimmedTitle ||
      !trimmedDescription ||
      !trimmedDirector ||
      !trimmedYear
    ) {
      setMessage("All fields are required.");
      return;
    }

    if (isNaN(year) || year < 1900 || year > currentYear) {
      setMessage(
        `Production year must be a number between 1900 and ${currentYear}.`
      );
      return;
    }

    try {
      if (!token) {
        setMessage("You must be logged in to register a movie.");
        return;
      }

      const movieData = {
        title: trimmedTitle,
        productionYear: year,
        description: trimmedDescription,
        director: trimmedDirector,
      };

      console.log("Sending movie data:", movieData);

      const response = await fetch(`${API_BASE_URL}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movieData),
      });

      if (response.status === 201) {
        setMessage("Movie registered successfully!");
        setTitle("");
        setProductionYear("");
        setDescription("");
        setDirector("");

        if (onMovieAdded) {
          onMovieAdded();
        }
      } else if (response.status === 400) {
        setMessage("API rejected the request. Please check your input values.");
      } else {
        setMessage("Failed to register movie.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while registering the movie.");
    }
  };

  return (
    <div>
      {!token ? (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <br />
            <button type="submit">Login</button>
          </form>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Welcome, {username}</h2>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <h2>Register a New Movie</h2>
          <form onSubmit={handleSubmitMovie}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="productionYear">Production Year:</label>
              <input
                id="productionYear"
                type="number"
                value={productionYear}
                onChange={(e) => setProductionYear(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="director">Director:</label>
              <input
                id="director"
                type="text"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                required
              />
            </div>

            <br />
            <button type="submit">Submit Movie</button>
          </form>
        </>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}
