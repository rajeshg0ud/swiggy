import { BASE_URL } from "../Constants";
import { ApiSlice } from "./ApiSlice";

const userApiSlice= ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url: `${BASE_URL}/api/user/login`,
                body: data,
                method: 'POST',
                credentials: 'include',
            })
        }),

        signup:builder.mutation({
            query:(data)=>({
                url: `${BASE_URL}/api/user/signup`,
                body: data,
                method: 'POST',
                credentials: 'include',
            })
        })
    })
})

export const {useLoginMutation, useSignupMutation}=userApiSlice;