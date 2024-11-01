import React, { useState, useEffect } from 'react';

const UserDashboard = () => {
    const [name, setName] = useState('');
    const [firstLogin, setFirstLogin] = useState(false);

    useEffect(() => {
        // Simulate fetching the user's name and login status
        const getName = () => {
            setName('Joseph'); // Replace with actual logic to get user's name
            setFirstLogin(true); // Replace with actual logic to get login status
        };

        getName();
    }, []);

    return (
        <div>
            {firstLogin ? (
                <p>Welcome, {name}</p>
            ) : (
                <p>Nice to see you again, {name}</p>
            )}
        </div>
    );
};

export default UserDashboard;
