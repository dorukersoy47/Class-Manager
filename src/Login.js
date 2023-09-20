import { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Login = ({ setAuthenticated }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { t } = useTranslation();

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
                alert(t('login.invalid'));
            }
        })
        .catch(error => console.error(error));
    };

    return (
        <div className="studentForm">
            <input className="formInput" style={{marginBottom: "10px"}} type="text" name="username" onChange={handleChange} placeholder="Username" />
            <input className="formInput" style={{marginBottom: "10px"}} type="password" name="password" onChange={handleChange} placeholder="Password" />
            <button className="submitButton" onClick={handleLogin}>{t('login.login')}</button>
        </div>
    );
};

export default Login;
