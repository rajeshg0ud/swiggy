import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../context/cartSlice';

function AddButton({ resInfo, value, res }) {
  const dispatch = useDispatch();
  return (
    <button
      className={`bg-white px-5 md:px-7 py-1 border-[1.57px] rounded-sm text-green-500 border-green-500 text-sm font-semibold hover:shadow-lg hover:bg-green-50 ${res?.card?.info?.imageId ? 'absolute top-20 mr-6 md:top-24 left-5 md:left-7' : ' mr-[18.4px] md:mr-6 h-8'}`}
      onClick={() => dispatch(addToCart({
        id: resInfo.id,
        resName: resInfo.name,
        resImageId: resInfo.cloudinaryImageId,
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
