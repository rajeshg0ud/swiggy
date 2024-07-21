import { BASE_URL } from "../Constants";
import { ApiSlice } from "./ApiSlice";


const orderApiSlice= ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        placeOrder:builder.mutation({
            query:(data)=>({
                url: `${BASE_URL}/api/orders/placeorder`,
                body: data,
                method: 'POST'
            })
        }),
        getOrders:builder.query({
            query:()=>({
                url: `${BASE_URL}/api/orders/`
            })
        })
    })
})


export const {usePlaceOrderMutation, useGetOrdersQuery}=orderApiSlice;