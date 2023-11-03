import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './login.css';

function Login(){
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [profilePicture, setProfilePicture] = useState('')
    const navigate = useNavigate();

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handlePicture = (e) => {
        setProfilePicture(e.target.value);
    }

    const login = () => {
        console.log('name: '+name+'  password: '+password)
        console.log('profile pic: '+profilePicture)
        const requestBody = {
            name: name,
            password: password,
            profilePicture: profilePicture
        };

            // Make an HTTP POST request to the server
        axios.post('http://localhost:4000/sign-in', requestBody, {
                headers: {
                'Content-Type': 'application/json', // Set the Content-Type to JSON
                },
        })
        .then((response) => {
            console.log(response.data)
            navigate('/home', { state:{userData: requestBody.name }});
        })
        .catch((error) => console.error('Axios error:', error));
        
    }

    return (
        <div className="form">
            <input type="text" value={name} onChange={handleName}
            placeholder="Name:" />
            <input type="password" value={password} onChange={handlePassword}
            placeholder="Password:" />
            <input type="text" value={profilePicture} onChange={handlePicture}
            placeholder="Profile pic link:" />
            <button type="button" onClick={login}>Login</button>
        </div>
    )
}

export default Login;