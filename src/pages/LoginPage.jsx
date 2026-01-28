import { useMutation } from "@tanstack/react-query"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/admin';

    const mutation = useMutation({
        mutationFn: async (user) => {
            return await login(user.email, user.password);
        },
        onSuccess: () => {
            toast.success("Logged in successfully!");
            navigate(from, { replace: true });
        },
        onError: (error) => {
            toast.error(error?.message);
        }
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            email: formData.email,
            password: formData.password
        }

        mutation.mutate(user);
    }

    const isLoading = mutation.isPending;
    const error = mutation.error;


    return (
        <section className='w-full bg-secondary'>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <section className='w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0'>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className='text-xl font-bold md:text-3xl text-primary text-center'>
                            Login
                        </h1>
                        <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
                            <div>
                                <label htmlFor="email" className='block mb-2 text-sm font-semibold text-primary'>Email</label>
                                <input type="email" name='email' id='email' value={formData.email} onChange={handleChange} className='bg-gray-50 border border-primary/40 text-gray-900 text-sm rounded-lg focus:ring-accent/80 focus:border-accent/60 focus:outline-none block w-full p-2.5' required/>
                            </div>
                            <div>
                                <label htmlFor="password" className='block mb-2 text-sm font-semibold text-primary'>Password</label>
                                <input type="password" name='password' id='password' value={formData.password} onChange={handleChange} className='bg-gray-50 border border-primary/40 text-gray-900 text-sm rounded-lg focus:ring-accent/80 focus:border-accent/60 focus:outline-none block w-full p-2.5' required/>
                            </div>
                            <button className='w-full text-white bg-accent hover:bg-amber-400 font-semibold rounded-lg text-sm px-6 py-3 text-center cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed' disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button>
                        </form>
                        {/* Error message */}
                        {error && (
                            <div className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded p-3">
                                {error?.message || console.log(error) }
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </section>
    )
}

export default LoginPage