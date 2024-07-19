import { BASE_URL } from "../Constants";
import { ApiSlice } from "./ApiSlice";


export const RestaurantApiSlice= ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getRestaurants:builder.mutation({
            query:()=>({
                url: `${BASE_URL}/api/restaurants`,
                method: 'POST'
            })
        }),
        getRestaurantById:builder.mutation({
            query:(id)=>({
                url:`${BASE_URL}/api/restaurants/${id}`,
                method: 'POST'
            })
        })
    })
})

export const {useGetRestaurantsMutation, useGetRestaurantByIdMutation}= RestaurantApiSlice;