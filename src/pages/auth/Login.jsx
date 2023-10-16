import React from 'react'
import { useAuthContext } from '../../hooks/AuthContext';
import { redirect } from 'react-router-dom';

export default function Login() {
    const auth = useAuthContext();

    return <>
        <button onClick={() => { auth.setIsAuthenticated(true) }}>login</button>
        <div>Login page</div>
    </>

}
