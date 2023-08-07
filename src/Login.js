import { useState } from 'react';
import axios from 'axios';

const Login = ({ setAuthenticated }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = () => {
        axios.post('http://localhost:3001/authenticate', credentials)
            .then((response) => {
                if (response.data.authenticated) {
                    setAuthenticated(true);
                } else {
                    alert('Invalid credentials');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <input type="text" name="username" onChange={handleChange} placeholder="Username" />
            <input type="password" name="password" onChange={handleChange} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
