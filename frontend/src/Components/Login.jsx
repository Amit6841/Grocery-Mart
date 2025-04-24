import React from "react";
import { userAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
    const { setshowUserLogin, setuser, axios, navigate } = userAppContext();
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false); // Loading state

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            setLoading(true); // Set loading to true
            const { data } = await axios.post(`/api/user/${state}`, {
                name,
                email,
                password,
            });
            if (data.success) {
                navigate('/');
                setuser(data.user);
                setshowUserLogin(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            if (error.response?.status === 404) {
                toast.error("Users does not exist");
            } else if (error.response?.status === 401) {
                toast.error("Invalid password");
            } else if (error.response?.status === 409) {
                toast.error("User already exists");
            } else {
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        } finally {
            setLoading(false)
        }
    };

    return (
        <div
            onClick={() => setshowUserLogin(false)}
            className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/60"
        >
            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
            >
                <p className="text-2xl font-medium m-auto">
                 {state === "signup" ? "signup" : "login"}
                </p>
                {state === "signup" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="type here"
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500"
                            type="text"
                            required
                        />
                    </div>
                )}
                <div className="w-full ">
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="type here"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500"
                        type="email"
                        required
                    />
                </div>
                <div className="w-full ">
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="type here"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500"
                        type="password"
                        required
                    />
                </div>
                {state === "signup" ? (
                    <p>
                        Already have account?{" "}
                        <span
                            onClick={() => setState("login")}
                            className="text-green-500 cursor-pointer"
                        >
                            click here
                        </span>
                    </p>
                ) : (
                    <p>
                        Create an account?{" "}
                        <span
                            onClick={() => setState("signup")}
                            className="text-green-500 cursor-pointer"
                        >
                            click here
                        </span>
                    </p>
                )}
                <button
                    className={`bg-green-500 hover:bg-green-600 transition-all text-white w-full py-2 rounded-md cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    disabled={loading}
                >
                    {loading ? "Loading..." : state === "signup" ? "Create Account" : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
