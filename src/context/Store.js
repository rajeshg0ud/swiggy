import {configureStore} from '@reduxjs/toolkit'
import { ApiSlice } from './ApiSlice'


export const Store= configureStore({
    reducer:{
        [ApiSlice.reducerPath]: ApiSlice.reducer,

    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(ApiSlice.middleware),
    devTools: true
})