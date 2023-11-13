"use client"
import { useRouter } from 'next/router';
import { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin') {
            router.push('/modelos/crear');
        } else {
            alert('Credenciales incorrectas. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="bg-white p-8 rounded shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">LOGIN</h2>
                <form>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="username"
                            className="w-full p-2 border rounded"
                            placeholder="Nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">

                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 border rounded"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        onClick={handleLogin}
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;