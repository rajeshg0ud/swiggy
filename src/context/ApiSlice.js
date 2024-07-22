import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../Constants';


const baseQuery= fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',  
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        return headers;
    }

})

export const ApiSlice= createApi({
    baseQuery,
    tagTypes:['Restaurant', 'Item', 'Order', 'User'],
    endpoints:(builder)=>({})
})