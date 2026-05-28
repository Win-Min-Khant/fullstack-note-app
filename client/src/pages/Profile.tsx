import React from 'react'
import type z from 'zod'
import { profileSchema } from '../schema/profile';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useProfileMutation } from '../slices/userApi';
import { setUserInfo } from '../slices/auth';
import { toast } from 'react-toastify';

type ProfileInputs = z.infer<typeof profileSchema>;

function Profile() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<ProfileInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: userInfo?.username,
      email: userInfo?.email,
      password: ""
    }
  });
  const [updateProfile] = useProfileMutation();
  const dispatch = useDispatch();

  const submit: SubmitHandler<ProfileInputs> = async (data) => {
    try {
      const res = await updateProfile(data).unwrap();
      dispatch(setUserInfo(res));
      toast.success("Profile is updated successfully.");
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error);
    }
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Profile</h2>
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
          disabled={isSubmitting}
          type="submit"
          className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
        >
          Update Profile
        </button>
      </form>
    </div>
  )
}

export default Profile
