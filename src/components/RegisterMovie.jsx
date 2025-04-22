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
        <form>
            {}
        </form>
        {message && <p>{message}</p>}
        </div>
    );
}