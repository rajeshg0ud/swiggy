import {configureStore} from '@reduxjs/toolkit'
import { ApiSlice } from './ApiSlice'
import cartSlice from './cartSlice'


export const Store= configureStore({
    reducer:{
        [ApiSlice.reducerPath]: ApiSlice.reducer,
        cartSlice,

    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(ApiSlice.middleware),
    devTools: true
})