import React from 'react';
import axios from 'axios';

const CreateSuperUserButton = () => {
    const createSuperUser = async () => {
        const superUserData = {
            name: 'Super User',
            login: 'superadminuser@gmail.com',
            pass: 'fmdnjeit875475ghhsakgvu35158gbdhw',
        };
        try {
            const response = await axios.post('http://localhost:8080/create-super-user', superUserData);
            if (response.status === 200) {
                window.location.href = 'http://localhost:3000/super-admin-dashboard';
            }
        } catch (error) {
            console.error('Error creating super user:', error);
        }
    };

    return (
        <button onClick={createSuperUser}>
            Create Super User
        </button>
    );
};

export default CreateSuperUserButton;