import { useMutation } from "@tanstack/react-query"
import axios from "axios"

function LoginPage() {
  
    const mutation = useMutation({
        mutationFn: async (user) => {
            return axios.post(`${import.meta.env.VITE_API_URL}/users/login`, user, {withCredentials: true})
        },
        onSuccess: (res) => {
            localStorage.setItem("user", JSON.stringify(res.data.user));
        }
    })
  
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const user = {
            email: formData.get("email"),
            password: formData.get("password")
        }

        mutation.mutate(user);
    }
    return (
      <section className='w-full bg-gray-50 dark:bg-gray-900'>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <section className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                          Login
                      </h1>
                      <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
                          <div>
                              <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
                              <input type="email" name='email' id='email' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:ring-gray-600 focus:border-gray-600 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                          </div>
                          <div>
                              <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
                              <input type="password" name='password' id='password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:ring-gray-600 focus:border-gray-600 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'/>
                          </div>
                            <button className='w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer' disabled={mutation.isPending}>{ mutation.isPending ? "Logging in..." : "Login"}</button>
                      </form>
                  </div>
              </section>
          </div>
      </section>
  )
}

export default LoginPage