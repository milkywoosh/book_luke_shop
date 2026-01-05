import { useState } from "react";


const LoginPage = ({ onHandleLogin }: { onHandleLogin: any }) => {

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);
        // Logic: Authenticate the user
        // 1. Extract values efficiently
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // data will look like: { username: "your_user", password: "123" }
        console.log("Payload to send:", data);

        // fetch data to SERVER API
        // onHandleLogin
    };

    return (
        <div className="w-[400px] bg-gray-50 font-sans text-gray-900 pb-10">


            <div className=" space-y-8 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">

                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Halloow
                    </h2>
                    <p className="mt-2 text-center font-extrabold text-md text-gray-600">
                        Halaman ini khusus admin.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username or Email
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="tailor_admin_1"
                                onChange={(e) => e.target.value}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="••••••••"
                                onChange={(e) => e.target.value}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative  flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-300"
                    >
                        {loading ? "Authenticating..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;