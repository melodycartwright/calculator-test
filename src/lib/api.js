import axios from "axios";

const API_BASE_URL = "https://tokenservice-jwt-2025.fly.dev";

export async function loginUser(username, password) {
  const loginUrl = `${API_BASE_URL}/token-service/v1/request-token`;

  const requestBody = {
    username,
    password,
  };
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(loginUrl, requestBody, { headers });
    return response.data; // Fixed typo: Response → response
  } catch (error) {
    console.error("Login failed", error);
    throw new Error("Login failed. Please check credentials.");
  }
}

export async function fetchMovies(token) {
  try {
    const response = await axios.get(`${API_BASE_URL}/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch movies", error);
    throw new Error("Failed to fetch movies");
  }
}

export async function registerMovie(token, movieData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/movies`, movieData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to register movie", error);
    throw new Error("Failed to register movie");
  }
}
