// Login.jsx
import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import './Login.scss';
import getDeviceName from '../index';

const Login = ({ onLogin }) => {
    const deviceName = getDeviceName();
    const [username, setUsername] = useState(deviceName);
    const [password, setPassword] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        const loggedInUser = Cookies.get('loggedInUser');
        if (loggedInUser) {
            onLogin(loggedInUser);
        }
    }, [onLogin]);
    let mins = 0;
    let hours = 1;
    const minsToDays = mins/1440;
    const hoursToDays = hours/24;
    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real-world app, you would validate against a backend here.
        // For this example, we'll just check if the username and password match our expectations.
        if (password === process.env.REACT_APP_CORRECT_PHRASE) {
            Cookies.set('loggedInUser', username, { expires: hoursToDays }); // Cookie expires in 7 days
            onLogin(username);
        } else {
            alert('Cut from here! 🫵🏾😐');
        }
    };
    const handleFocus = () => {
        inputRef.current.placeholder = ''; // Clear placeholder text on focus
    };
    const handleBlur = () => {
        if (!password) {
            inputRef.current.placeholder = 'Enter the Correct Phrase 😘'; // Restore placeholder if empty
        }
    };

    return (
        <form onSubmit={handleSubmit} className="interactive-form">
            <div className="form-group">
                <input
                    type="password"
                    value={password}
                    ref={inputRef}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Enter the Correct Phrase 😘"
                    required
                    className="form-input"
                />
            </div>
            <button type="submit" className="form-submit">Submit</button>
        </form>
    );
};

export default Login;