import React from 'react';

const Login = () => {
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="bg-white p-8 rounded shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Iniciar Sesión</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600">Nombre de usuario</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full p-2 border rounded"
                            placeholder="Nombre de usuario"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 border rounded"
                            placeholder="Contraseña"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
