import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../context/cartSlice';
import { CDN_URL } from './config';

function AddButton({ resInfo, value, res }) {
  const dispatch = useDispatch();
  return (
    <button
      className={`bg-white px-5 md:px-7 py-1 mr-6 border-[1.57px] rounded-sm text-green-500 border-green-500 text-sm font-semibold hover:shadow-lg hover:bg-green-50 ${res?.card?.info?.imageId ? 'absolute top-20 md:top-24 left-5 md:left-7' : 'h-8'}`}
      onClick={() => dispatch(addToCart({
        id: resInfo.id,
        resName: resInfo.name,
        area: resInfo.areaName,
        city: resInfo.city,
        itemId: res?.card?.info?.id,
        itemName: res?.card?.info?.name,
        itemPrice: value,
      }))}
    >
      ADD
    </button>
  );
}

export default AddButton;
