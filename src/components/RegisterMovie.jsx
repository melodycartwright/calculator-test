import { useState } from "react";
import { loginUser} from '../lib/api';
import axios from "axios";


const API_BASE_URL = "https://tokenservice-jwt-2025.fly.dev";


export default function RegisterMovie() {
    const [username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [productionYear, setProductionYear] = useState('');
    const [description, setDescription] = useState('');
    const [director, setDirector] = useState('');
    const [message, setMessage] = useState('');

    return (
        <div>
        <h2>Register A New Movie</h2>
        <form onSubmit={(e) => e.preventDefault()}>
            <h3>Login</h3>
            <label>
                Username:
                <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required />
            </label>
        <br />
        <label>
            Password:
            <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
             />
        </label>

        <h3>Movie Info</h3>
        <label>
            Title:
            <input type="text"
             value= {title}
             onChange= {(e) => setTitle(e.target.value)}
             required />
        </label>
        <br />
        <label>
            Production Year:
            <input type="number"
            value= {productionYear}
            onChange= {(e) => setProductionYear(e.target.value)}
            required />
        </label>
        <br />
        <label>
            Description:
            <textarea
             value={description}
             onChange= {(e) => setDescription(e.target.value)}
             required />
        </label>
        <br />
        <label>
            Director:
            <input type="text"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required />
        </label>
        </form>
        {message && <p>{message}</p>}
        </div>
    );
}