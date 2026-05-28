import { apiSlice } from './api';

interface LoginInputs {
    email: string;
    password: string;
}

interface RegisterInputs extends LoginInputs {
    username: string;
}

interface ProfileInputs {
    username?: string;
    email?: string;
    password?: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data: LoginInputs) => ({
                url: 'login',
                method: 'POST',
                body: data,
                credentials: "include"
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'DELETE',
                credentials: 'include'
            })
        }),
        register: builder.mutation({
            query: (data: RegisterInputs) => ({
                url: 'register',
                method: 'POST',
                body: data,
                credentials: 'include'
            })
        }),
        profile: builder.mutation({
            query: (data: ProfileInputs) => ({
                url: '/profile',
                method: 'PUT',
                body: data,
                credentials: 'include'
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation } = userApiSlice;

