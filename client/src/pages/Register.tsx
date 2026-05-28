import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { registerSchema } from "../schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../slices/userApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useEffect } from "react";

// type RegisterInputs = {
//     username: string;
//     email: string;
//     password: string
// }

type RegisterInputs = z.infer<typeof registerSchema>;

function Register() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<RegisterInputs>({
        resolver: zodResolver(registerSchema)
    });
    const navigate = useNavigate();
    const [userRegister, {isLoading}] = useRegisterMutation();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    useEffect(() => {
        if (userInfo) {
          navigate('/');
        }
      }, [navigate, userInfo])

    const submit: SubmitHandler<RegisterInputs> = async (data) => {
        try {
          await userRegister(data).unwrap();
          reset();
          toast.success("Registration Successful!");
          navigate('/login');
        } catch (err: any) {
          toast.error(err?.data?.message || err.error);
        }
    }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input
            {...register('username')}
            type="text"
            id="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
            placeholder="Enter your username"
          />
          <span className="text-sm text-red-800">{errors.username && errors.username.message}</span>
        </div>
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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
