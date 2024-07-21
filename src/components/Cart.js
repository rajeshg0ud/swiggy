import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateAddress } from '../context/cartSlice'; 
import empty_cart from '../assets/empty_cart.webp'

function Cart() {
  const { restInfo, items, address } = useSelector((store) => store.cartSlice);
  const [isEditing, setIsEditing] = useState(false);
  const [area, setArea] = useState(address?.area||"");
  const [city, setCity] = useState(address?.city||"");
  const [landmark, setLandmark] = useState(address?.landmark||"");
  const [pincode, setPincode] = useState(address?.pincode||"");
  const dispatch = useDispatch();

  const handleAddressChange = () => {
    setIsEditing(false);
    dispatch(updateAddress({ area, city, landmark, pincode }));
  };

  return (
    <div className="mt-[69px] md:mt-[90px]  container mx-auto p-4  bg-zinc-100 h-screen">
      <div className="flex flex-col justify-center lg:flex-row lg:space-x-3">
        {
          items.length>0 ?
          <>
          <div className="w-[91vw] lg:w-[55%] md:p-6  rounded ">
        <div className="mb-4 p-8 bg-white shadow-sm">
          <h2 className="text-md font-bold">Delivery address</h2>
          <div className="mt-4  rounded">
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
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full text-sm p-2 mb-2 border rounded"
                  placeholder="landmark"
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
                  placeholder="Pincode Code"
                />
                <button
                  onClick={handleAddressChange}
                  className=" bg-lime-600 brightness-105 text-white p-[6px] px-3 "
                >
                  Save
                </button>
              </div>
            ) : (
              <div className='flex justify-between'>
               <div>
               <p className='text-md'>{area}</p>
                <p className="text-xs text-gray-600">{city}, {landmark}</p>
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
            )}
          </div>
        </div>
        <div className=' bg-white p-8 shadow-sm'>
          <h2 className="text-md font-bold">Choose payment method</h2>
          <button className="w-full mt-4 p-3 bg-lime-600 brightness-105 font-semibold text-white text-sm md:text-md">PROCEED TO PAY</button>
        </div>
      </div>
      <div className="w-full lg:w-[24%] bg-white p-6 shadow-sm mt-6 lg:mt-6">
        <h2 className="text-md font-bold mb-4">{restInfo?.resName}</h2>
        <div>
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-4">
              <div className=' w-[33%]'>
                <h3 className="text-xs">{item.itemName}</h3> 
              </div>
              <div className={`flex bg-white mr-6 border-[1.57px] border-green-500 rounded-sm text-green-500 text-xs font-semibold hover:shadow-lg hover:bg-green-50 h-8'}`}>
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
            <p>₹{items.reduce((total, item) => total + parseFloat(item.itemPrice.replace('₹', ''))* item.quantity, 0)}</p>
          </div>
          <div className="text-xs flex justify-between mt-2 text-gray-600 border-b py-2">
            <p>GST and Restaurant Charges</p>
            <p>₹60</p>
          </div>
          <div className="text-md flex justify-between font-bold mt-2">
            <p>To Pay</p>
            <p>₹{items.reduce((total, item) => total + parseFloat(item.itemPrice.replace('₹', ''))* item.quantity, 0) + 60}</p>
          </div>
        </div>
      </div>
      </>
      :
      <div className=' mt-14 flex flex-col items-center'> 
      <img src={empty_cart} alt='empty cart' className=' w-56 md:w-80' />
        <p className=' text-xs md:text-lg pt-4 pb-2 font-semibold'>Your cart is empty</p>
        <p className=' text-xs text-gray-500 '>You can go to home page to view more restaurants</p>
      </div>
        }
      </div>
    </div>
  );
}

export default Cart;
