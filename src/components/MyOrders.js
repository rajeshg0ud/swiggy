import React from 'react'
import { useGetOrdersQuery } from '../context/orderApiSlice'

function MyOrders() {
  const {data, isLoading, isError}= useGetOrdersQuery();

  console.log(data)

  return (
    <div className=' top-28'>MyOrders</div>
  )
}

export default MyOrders