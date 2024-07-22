import { BASE_URL } from "../Constants";
import { ApiSlice } from "./ApiSlice";

const userApiSlice= ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url: `${BASE_URL}/api/user/login`,
                method: 'POST',
                body: data,
            })
        }),

        signup:builder.mutation({
            query:(data)=>({
                url: `${BASE_URL}/api/user/signup`,
                method: 'POST',
                body: data,
            })
        }),
        signout:builder.mutation({
            query:()=>({
                url: `${BASE_URL}/api/user/signout`,
                method: 'POST'
            })
        })
    })
})

export const {useLoginMutation, useSignupMutation, useSignoutMutation}=userApiSlice;