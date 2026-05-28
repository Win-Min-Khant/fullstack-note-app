import type z from "zod"
import { loginSchema } from "../schema/login"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../slices/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../slices/auth";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { RootState } from "../store";

type LoginInputs = z.infer<typeof loginSchema>
function Login() {
  const dispatch = useDispatch();
  const [ login, { isLoading } ] = useLoginMutation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema)
  });
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const submit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setUserInfo(res));
      navigate('/');
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  }

  // Check user is login or not 
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo])
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
            placeholder="Enter your email"
          />
          <span className="text-sm text-red-800">{errors.email && errors.email.message}</span>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            {...register('password')}
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
            placeholder="Enter your password"
          />
          <span className="text-sm text-red-800">{errors.password && errors.password.message}</span>
        </div>
        <button
          disabled={isSubmitting || isLoading}
          type="submit"
          className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
