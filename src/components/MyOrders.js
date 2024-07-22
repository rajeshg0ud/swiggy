import React from 'react';
import { useGetOrdersQuery } from  '../context/orderApiSlice';
import ClipLoader from 'react-spinners/ClipLoader';
import { Link } from 'react-router-dom';
import { CDN_URL } from './config'; 

function MyOrders() {
    const  { data: orders, isLoading, error } = useGetOrdersQuery();

    if (isLoading) return (
        <div className="self-center flex justify-center m-[6px] items-center text-3xl font-semibold">
            < ClipLoader color="#000000" loading={isLoading} size={50} />
        </div>
    );

    if (error) return <div className="m-5 mt-24">{error?.message}</div>;

    return (
        <div className="flex flex-col m-2 sm:ml-16 mt-24">
            <p className=" ml-2 md:font-semibold md:m-[6px] text-lg sm:text-2xl">MY ORDERS</p>
            <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-10/12">
                
                    {orders && orders.map((order, index) => (
                        <div className="flex flex-col md:flex-row p-4 m-[8px] my-5 border" key={index}>
                            <div className="flex flex-col md:w-[71%]">
                                <div className="border-b p-4 mb-4">
                                   
                                   <div className='flex w-full'>
                                    <Link to={`/restaurant/${order.restaurantInfo?.id}`}>
                                   <img className='h-16 w-[50px] md:h-20 md:w-28 mb-3 shadow-md object-cover mr-4' src={CDN_URL + order.restaurantInfo?.resImageId} alt={`${ order.restaurantInfo?.resImageId}`} />
                                   </Link>
                                   <div>
                                   <h2 className="text-base md:text-xl font-bold ">{order.restaurantInfo?.resName}</h2>
                                   <p className=' text-sm mb-4 text-gray-600'>{order.restaurantInfo?.area}</p>
                                   </div>
                                    </div>

                                    <p className="text-md md:text-lg mb-2 font-semibold">Item Details</p>
                                    {order.orderItems.map((item, idx) => (
                                        <div key={idx} className="flex my-3">
                                            {item.imageUrl &&
                                            <Link to={`/Product?p=${item.itemId}`}>
                                            <img src={item.imageUrl} alt={item.itemName} className=" min-w-14 md:w-20 h-20 object-cover md:pr-3 mr-3 md:mr-6" />
                                            </Link>}
                                            <div className=' ml-2 text-sm lg:text-base md:ml-0 min-w-full'>
                                                <p className="text-zinc-800 font-semibold md:w-[90%]">{item.itemName}</p>
                                                <p className="text-zinc-800">Qty: {item.quantity}</p>
                                                <p className="text-zinc-800">{item.itemPrice}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 text-sm md:text-md border-b md:border-none">
                                    <p className="text-md md:text-lg mb-2 font-semibold">Address</p>
                                    <div className="flex flex-col mb-2  ">
                                        <p className="text-gray-500">Area</p>
                                        <p>{order.shippingAddress.area}</p>
                                    </div>
                                    <div className="flex flex-col mb-2">
                                        <p className="text-gray-500">Locality / City</p>
                                        <p>{order.shippingAddress.city}</p>
                                    </div>
                                    <div className="flex flex-col mb-2">
                                        <p className="text-gray-500">Pincode</p>
                                        <p className="text-green-600">{order.shippingAddress.pincode}</p>
                                    </div>
                                    <div className="flex flex-col mb-2">
                                        <p className="text-gray-500">State</p>
                                        <p>{order.shippingAddress.state}</p>
                                    </div> 
                                </div>
                            </div>
                            <div className="md:border-l p-3 md:p-4 md:ml-4 flex-1 text-sm md:text-md">
                                <p className="text-md md:text-lg mb-2 font-semibold">Order Summary</p>
                                <p className="py-2 flex flex-col md:flex-row justify-between"><span className=' text-gray-500 md:text-black'>Order ID:</span><span>{order._id}</span></p>
                                <p className="py-2 flex flex-col md:flex-row justify-between"><span className=' text-gray-500 md:text-black'>Ordered on:</span><span>{new Date(order.createdAt).toLocaleString()}</span></p>
                                <p className="py-2 flex justify-between"><span>Items Price:</span><span>₹{order.itemsPrice}</span></p>
                                <p className="py-2 flex justify-between"><span>Charges:</span><span>₹{order.charges}</span></p>
                                <p className="py-2 flex justify-between"><span>Shipping Price:</span><span>₹{order.shippingPrice}</span></p>
                                <p className="py-2 flex justify-between"><span>Payment Method:</span><span>{order.paymentMethod}</span></p>
                                <hr className="mt-2" />
                                <p className="my-2"><strong className="flex justify-between"><span>Grand Total:</span><span>₹{order.totalPrice}</span></strong></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MyOrders;

