import axios from 'axios';

const API_BASE_URL = "https://tokenservice-jwt-2025.fly.dev";

export async function loginUser(username, password) {
    const loginUrl = `${API_BASE_URL}/token-service/v1/request-token`

    const requestBody = {
        username,
        password
    };
    const headers = {
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.post(loginUrl, requestBody, { headers });
        return Response.data;
    } catch (error) {
        console.error('Login failed', error);
        throw new Error('Login failed. Please check credentials.');

    }
}