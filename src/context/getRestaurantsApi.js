import { BASE_URL } from "../Constants";
import { ApiSlice } from "./ApiSlice";




export const RestaurantApiSlice= ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getRestaurants:builder.query({
            query:()=>({
                url: `${BASE_URL}/api/restaurants`
            })
        }),
        getRestaurantById:builder.query({
            query:(id)=>({
                url:`${BASE_URL}/api/restaurants/${id}`
            })
        })
    })
})

export const {useGetRestaurantsQuery, useGetRestaurantByIdQuery}= RestaurantApiSlice;