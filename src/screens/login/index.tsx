import { useAuth } from "../../hooks/auth";

const Login = () => {
    const { handleLogin, isLoginLoading, loginError } = useAuth()

    return (
        <main className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 shadow-md rounded-md min-w-96">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block mb-2">Email</label>
                        <input name="email" type="email" disabled={isLoginLoading} className="border border-gray-300 px-4 py-2 rounded-md w-full h-12" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Password</label>
                        <input name="password" type="password" disabled={isLoginLoading} className="border border-gray-300 px-4 py-2 rounded-md w-full h-12" />
                    </div>
                    <button type="submit" disabled={isLoginLoading} className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed">Entrar</button>
                    {isLoginLoading && <p>Loading...</p>}
                    {loginError && <p>{`${loginError}`}</p>}
                </form>
            </div>
        </main>
    );
};

export default Login;
