import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/admin';

    const mutation = useMutation({
        mutationFn: async (user) => {
            return await login(user.email, user.password);
        },
        onSuccess: () => {
            navigate(from, { replace: true });
        },
        onError: (error) => {
            setError(error);       
        }
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const user = {
            email: formData.email,
            password: formData.password
        }

        mutation.mutate(user);
        setLoading(false)
    }
    return (
      <section className='w-full bg-gray-50 dark:bg-gray-900'>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
              <section className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                          Login
                      </h1>
                      <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
                          <div>
                              <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
                              <input type="email" name='email' id='email' value={formData.email} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:ring-gray-600 focus:border-gray-600 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                          </div>
                          <div>
                              <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
                              <input type="password" name='password' id='password' value={formData.password} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:ring-gray-600 focus:border-gray-600 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                          </div>
                            <button className='w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer' disabled={mutation.isPending}>{ mutation.isPending ? "Logging in..." : "Login"}</button>
                        </form>
                        {/* Error message */}
                        {error && (
                            <div className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded p-3">
                                {error?.response?.data?.message || error?.message || 'Failed to save project'}
                            </div>
                        )}
                  </div>
              </section>
          </div>
      </section>
  )
}

export default LoginPage