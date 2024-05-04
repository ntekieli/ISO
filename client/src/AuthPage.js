import React, { useState } from 'react';

function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);
    const [additionalInfo, setAdditionalInfo] = useState({
        username: '',
        address: ''
    });

    const handleEmailPasswordSubmit = async (e) => {
        e.preventDefault();
        if (!isNewUser) {
            try {
                const response = await fetch('http://localhost:3000/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                if (response.status === 404) {
                    // User not found, so prompt to complete registration
                    setIsNewUser(true);
                } else if (response.ok) {
                    // Handle successful login (store token, redirect, etc.)
                    console.log('Login successful', data);
                    // Example: localStorage.setItem('token', data.token);
                } else {
                    throw new Error(data.error || 'An unknown error occurred');
                }
            } catch (error) {
                console.error('Login failed:', error);
            }
        } else {
            handleSignup();
        }
    };

    const handleSignup = async () => {
        const userData = { email, password, username: additionalInfo.username, address: additionalInfo.address };
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Registration successful', data);
                // Handle post-registration (e.g., auto-login or confirmation message)
                // Example: localStorage.setItem('token', data.token);
            } else {
                throw new Error(data.error || 'An unknown error occurred during registration');
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div>
            <h1>{isNewUser ? 'Complete Your Sign Up' : 'Login'}</h1>
            <form onSubmit={handleEmailPasswordSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {isNewUser && (
                    <>
                        <input
                            type="text"
                            placeholder="Username"
                            value={additionalInfo.username}
                            onChange={(e) => setAdditionalInfo({ ...additionalInfo, username: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            value={additionalInfo.address}
                            onChange={(e) => setAdditionalInfo({ ...additionalInfo, address: e.target.value })}
                            required
                        />
                        <button type="submit">Sign Up</button>
                    </>
                )}
                {!isNewUser && (
                    <button type="submit">Login</button>
                )}
            </form>
        </div>
    );
}

export default AuthPage;
