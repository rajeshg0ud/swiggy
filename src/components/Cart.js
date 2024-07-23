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
     if (!area || !city || !state || !pincode) {
      toast.error("Please fill in all address fields.");
      return;
    }
  
     if (!/^\d{6}$/.test(pincode)) {  
      toast.error("Please enter a valid 6-digit pincode.");
      return;
    }
  
    if( area.split(' ').length < 2){
      toast.error("Area should have at least 2 words");
      return;
    }
  
    setIsEditing(false);
    dispatch(updateAddress({ area, city, state, pincode }));
  };
  

  const getItemPrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace('₹', '')) || 0;
    }
    return 0;
  };

  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  if (isLoading) return (
    <div className="self-center flex justify-center m-[6px] items-center text-3xl font-semibold">
      <ClipLoader color="#000000" loading={isLoading} size={50} />
    </div>
  );
 

  const totalCartValue = items.reduce((total, item) => total + getItemPrice(item.itemPrice) * item.quantity, 0);

  const handleOrder = async () => {
    if (userInfo?.id) {
      if (area && city && state && pincode) {
        const res = await placeOrder({
          restaurantInfo: restInfo,
          orderItems: items,
          shippingAddress: { area, city, pincode, state },
          paymentMethod: 'COD',
          itemsPrice: totalCartValue,
          charges: 60,
          shippingprice: 0,
          totalPrice: totalCartValue + 60,
        }).unwrap();

        console.log(res);

        toast.success('Order Placed');
        dispatch(clearCart());
      } else {
        toast.error("You don't have an address to deliver");
      }
    } else {
      toast.error('Log in or signup to place an order');
    }
  }

  return (
    <div className="mt-[60px] md:mt-[82px] container mx-auto p-4 bg-zinc-100 h-screen">
      <div className="flex flex-col justify-center lg:flex-row lg:space-x-3">
        {items.length > 0 ? (
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
                        placeholder="State"
                      />
                      <button
                        onClick={handleAddressChange}
                        className="bg-lime-600 brightness-105 text-white p-[6px] px-3"
                      >
                        Save
                      </button>
                    </div>
                  ) : address.area ? (
                    <div className="flex justify-between">
                      <div>
                        <p className="text-md">{area}</p>
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
                    <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between">
                      <div className="flex flex-col items-center">
                        <img className="w-44" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_252/NoSavedAddress_ttsdqs" alt="address not found" />
                        <p className="text-md font-medium text-gray-500">Can't find a door to knock</p>
                        <p className="text-gray-500 text-xs">You don't have an address to deliver.</p>
                      </div>
                      <a
                        href="#"
                        onClick={() => setIsEditing(true)}
                        className="text-orange-600 mt-3 md:mt-2 block text-sm font-semibold"
                      >
                        ADD ADDRESS
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white p-8 shadow-sm">
                <h2 className="text-md font-bold">Choose payment method</h2>
                <button
                  className="w-full mt-4 p-3 bg-lime-600 brightness-105 font-semibold text-white text-sm md:text-md"
                  onClick={handleOrder}
                >
                  PROCEED TO PAY
                </button>
              </div>
            </div>
            <div className="w-full lg:w-[24%] bg-white p-6 shadow-sm mt-6 lg:mt-6">
              <div className="flex pb-4">
                <Link to={`/restaurant/${restInfo?.id}`}>
                  <img className="h-16 w-[50px] md:h-12 md:w-14 shadow-md object-cover mr-2" src={CDN_URL + restInfo?.resImageId} alt={restInfo?.resImageId} />
                </Link>
                <div className="flex flex-col justify-start items-start">
                  <h2 className="text-md font-bold ">{restInfo?.resName}</h2>
                  <p className="text-xs mb-4 text-gray-600">{restInfo?.area}</p>
                </div>
              </div>
              <div>
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center mb-4">
                    <div className="w-[33%]">
                      <h3 className="text-xs">{item.itemName}</h3>
                    </div>
                    <div className="flex bg-white mr-6 border-[1.57px] border-green-500 rounded-sm text-green-500 text-xs font-semibold hover:shadow-lg hover:bg-green-50 h-8">
                      <button className="border-r border-green-500 px-[7.8px] md:px-[10.5px] py-1" onClick={() => dispatch(removeFromCart({ id: restInfo.id, itemId: item.itemId }))}>-</button>
                      <button className="border-r border-green-500 px-[7.8px] md:px-[10.5px] py-1">{item.quantity}</button>
                      <button className="px-[7.8px] md:px-[10.5px] py-1" onClick={() => dispatch(addToCart({ id: restInfo.id, itemId: item.itemId }))}>+</button>
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
                <h2 className="text-md font-bold">Order Summary</h2>
                <div className="flex justify-between mt-2">
                  <span className="text-xs">Items Price:</span>
                  <span className="text-xs">₹{totalCartValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs">Delivery Charges:</span>
                  <span className="text-xs">₹60.00</span>
                </div>
                <div className="flex justify-between mt-2 font-bold">
                  <span className="text-xs">Total Price:</span>
                  <span className="text-xs">₹{(totalCartValue + 60).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center mt-24">
            <img className="w-60" src={empty_cart} alt="empty cart" />
            <h2 className="text-lg font-semibold mt-4">Your Cart is Empty</h2>
            <p className="text-gray-600 text-sm mt-2">Add items to your cart to see them here</p>
            <Link to="/" className="mt-4 bg-lime-600 text-white px-4 py-2 rounded">Go to Home</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
