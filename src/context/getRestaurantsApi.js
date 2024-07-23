import { BASE_URL } from "../Constants";
import { ApiSlice } from "./ApiSlice";


export const RestaurantApiSlice= ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getRestaurants:builder.mutation({
            query:(keyword)=>({
                url: `${BASE_URL}/api/restaurants`,
                method:'POST',
                params: keyword
            })
        }),
        getRestaurantById:builder.mutation({
            query:(id)=>({
                url:`${BASE_URL}/api/restaurants/${id}`
            })
        })
    })
})

export const {useGetRestaurantsMutation, useGetRestaurantByIdMutation}= RestaurantApiSlice;