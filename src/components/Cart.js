import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, clearCart, removeFromCart, updateAddress } from '../context/cartSlice'; 
import empty_cart from '../assets/empty_cart.webp'
import { CDN_URL } from './config';
import { usePlaceOrderMutation } from '../context/orderApiSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';


function Cart() {
  const { restInfo, items, address, userInfo } = useSelector((store) => store.cartSlice);
  const [isEditing, setIsEditing] = useState(false);
  const [area, setArea] = useState(address?.area || "");
  const [city, setCity] = useState(address?.city || "");
  const [state, setState] = useState(address?.state || "");
  const [pincode, setPincode] = useState(address?.pincode || "");
  const dispatch = useDispatch();

  const handleAddressChange = () => {
    setIsEditing(false);
    dispatch(updateAddress({ area, city, state, pincode }));
  };

  const getItemPrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace('₹', '')) || 0;
    }
    return 0;
  };

  const [placeOrder,{isLoading, isError}]=usePlaceOrderMutation();

  if (isLoading) return (
    <div className="self-center flex justify-center m-[6px] items-center text-3xl font-semibold">
        < ClipLoader color="#000000" loading={isLoading} size={50} />
    </div>
);

if (isError) return <div className="m-5 mt-24">{isError?.message}</div>;

  const totalCartValue= items.reduce((total, item) => total + getItemPrice(item.itemPrice) * item.quantity, 0);

  const handleOrder=async()=>{
    if(userInfo?.id){
      
    if(area && city && state && pincode){
      const res= await placeOrder({
        restaurantInfo:restInfo,
        orderItems: items,
        shippingAddress: {area,city,pincode,state,},
        paymentMethod: 'COD',
        itemsPrice:  totalCartValue,
        charges: 60,
        shippingprice: 0,
        totalPrice: totalCartValue+60,
      }).unwrap();

      console.log(res);
      
      toast.success('Order Placed');
      dispatch(clearCart());
    }
    else{
      toast.error("You don't have an address to deliver")
    }
    }
    else{
      toast.error('Log in or signup to place an order')
    }
  }

  return (
    <div className="mt-[69px] md:mt-[82px] container mx-auto p-4 bg-zinc-100 h-screen">
      <div className="flex flex-col justify-center lg:flex-row lg:space-x-3">
        {
          items.length > 0 ?
          <>
            <div className="w-[91vw] lg:w-[55%] md:p-6 rounded ">
              <div className="mb-4 p-8 bg-white shadow-sm">
                <h2 className="text-md font-bold">Delivery address</h2>
                <div className="mt-4 rounded">
                  {isEditing ? (
                    <div>
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full text-sm p-2 mb-2 border rounded"
                        placeholder="Area"
                      /> 
                      
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-sm p-2 mb-2 border rounded"
                        placeholder="City"
                      />
                     
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full text-sm p-2 mb-2 border rounded"
                        placeholder="Pincode"
                      />
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full text-sm p-2 mb-2 border rounded"
                        placeholder="state"
                      />
                      <button
                        onClick={handleAddressChange}
                        className="bg-lime-600 brightness-105 text-white p-[6px] px-3"
                      >
                        Save
                      </button>
                    </div>
                  ) : (address.area ? (
                    <div className='flex justify-between'>
                      <div>
                        <p className='text-md'>{area}</p>
                        <p className="text-xs text-gray-600">{city}, {state}</p>
                        <p className="text-xs text-gray-600">{pincode}</p>
                      </div>
                      <a
                        href="#"
                        onClick={() => setIsEditing(true)}
                        className="text-orange-600 mt-2 block text-sm font-semibold"
                      >
                        CHANGE
                      </a>
                    </div>
                  ) : (
                    <div className='flex flex-col md:flex-row items-center md:items-start md:justify-between'>
                      <div className='flex flex-col items-center'>
                        <img className='w-44' src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_252/NoSavedAddress_ttsdqs' alt='address not found' />
                        <p className='text-md font-medium text-gray-500'>Can't find a door to knock</p>
                        <p className='text-gray-500 text-xs'>You don't have an address to deliver.</p>
                      </div>
                      <a
                        href="#"
                        onClick={() => setIsEditing(true)}
                        className="text-orange-600 mt-3 md:mt-2 block text-sm font-semibold"
                      >
                        ADD ADDRESS
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className='bg-white p-8 shadow-sm'>
                <h2 className="text-md font-bold">Choose payment method</h2>
                <button className="w-full mt-4 p-3 bg-lime-600 brightness-105 font-semibold text-white text-sm md:text-md" onClick={()=> handleOrder()}>PROCEED TO PAY</button>
              </div>
            </div>
            <div className="w-full lg:w-[24%] bg-white p-6 shadow-sm mt-6 lg:mt-6">
              
              <div className='flex pb-4'>
              <Link to={`/restaurant/${restInfo?.id}`}>
              <img className='h-16 w-[50px] md:h-12 md:w-14 shadow-md object-cover mr-2' src={CDN_URL + restInfo?.resImageId} alt={`${ restInfo?.resImageId}`} />
              </Link>
              <div className=' flex flex-col justify-start items-start'>
              <h2 className="text-md font-bold ">{restInfo?.resName}</h2>
              <p className=' text-xs mb-4 text-gray-600'>{restInfo?.area}</p>
              </div>
              </div>
              <div>
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center mb-4">
                    <div className='w-[33%]'>
                      <h3 className="text-xs">{item.itemName}</h3> 
                    </div>
                    <div className={`flex bg-white mr-6 border-[1.57px] border-green-500 rounded-sm text-green-500 text-xs font-semibold hover:shadow-lg hover:bg-green-50 h-8`}>
                      <button className='border-r border-green-500 px-[7.8px] md:px-[10.5px] py-1' onClick={() => dispatch(removeFromCart({ id: restInfo.id, itemId: item.itemId }))}>-</button>
                      <button className='border-r border-green-500 px-[7.8px] md:px-[10.5px] py-1'>{item.quantity}</button>
                      <button className='px-[7.8px] md:px-[10.5px] py-1' onClick={() => dispatch(addToCart({ id: restInfo.id, itemId: item.itemId }))}>+</button>
                    </div>
                    <p className="text-xs">{item.itemPrice}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <input type="checkbox" id="no-contact" className="mr-2" />
                <label htmlFor="no-contact" className="text-xs">Opt in for No-contact Delivery</label>
              </div>
              <div className="mt-4">
                <button className="text-xs w-full py-2 border border-dashed border-gray-400 rounded">Apply Coupon</button>
              </div>
              <div className="mt-4">
                <h3 className="text-xs font-bold">Bill Details</h3>
                <div className="text-xs flex justify-between mt-2 text-gray-600">
                  <p>Item Total</p>
                  <p>₹{totalCartValue}</p>
                </div>
                <div className="text-xs flex justify-between mt-2 text-gray-600 border-b py-2">
                  <p>GST and Restaurant Charges</p>
                  <p>₹60</p>
                </div>
                <div className="text-md flex justify-between font-bold mt-2">
                  <p>To Pay</p>
                  <p>₹{totalCartValue + 60}</p>
                </div>
              </div>
            </div>
          </>
          :
          <div className='mt-14 flex flex-col items-center'> 
            <img src={empty_cart} alt='empty cart' className='w-56 md:w-80' />
            <p className='text-xs md:text-lg pt-4 pb-2 font-semibold'>Your cart is empty</p>
            <p className='text-xs text-gray-500'>You can go to home page to view more restaurants</p>
          </div>
        }
      </div>
    </div>
  );
}

export default Cart;
