import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function Test() {
    const { isLogin } = useAuth(); // Utilisez la valeur isLogin du contexte

    const [name, setName] = useState("hassini");

    useEffect(() => {
        if (isLogin) {
            setName("Yassine Hassini"); // Définissez le nom si l'utilisateur est connecté
        }
    }, [isLogin]);

    if (isLogin) {
        // Redirigez l'utilisateur vers la page de connexion s'il n'est pas connecté
        // Notez que vous devrez probablement utiliser une bibliothèque de routage
        // comme react-router pour cela.
        return <Navigate to='/login' />;
    }

    return (
        <div>
            <p>{name}</p>
        </div>
    );
}

export default Test;
