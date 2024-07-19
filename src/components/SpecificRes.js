import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetRestaurantByIdMutation } from '../context/getRestaurantsApi'; // Adjust the import path as necessary
import star from '../img/sta (2).png';
import { CDN_URL } from './config';

const SpecificRes = () => {
  const { id } = useParams();
  const [ getRestaurantById, {  isLoading, isError }] = useGetRestaurantByIdMutation();
  const [restaurant, setRestaurant] = useState(null);


  useEffect(()=>{
   const getRestaurant=async()=>{ 
    try {
      const result = await getRestaurantById(id).unwrap();
      setRestaurant(result);
  } catch (error) {
      console.error('Failed to fetch restaurants:', error);
  } 
};

getRestaurant();

  }, [getRestaurantById])


if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading data</div>;
    }

  if (!restaurant) {
    return <div>No data found</div>;
  }

  const { resInfo, resMenu } = restaurant;

  return (
   <div className=' flex justify-center'>
     <div className="m-36 w-2/4">
      <div className="flex justify-between min-w-96 max-w-3xl mb-7">
        <div>
          <h3 className="font-extrabold text-lg ">{resInfo.name}</h3>
          <p>{resInfo.areaName}, {resInfo.city}</p>
        </div>
        <div>
          <p className="flex font-bold">
            {resInfo.avgRating}
            {resInfo.avgRating && <img className="h-4 w-4 rounded-full m-1" src={star} alt="rating" />}
          </p>
          <p>{resInfo.costForTwoMessage}</p>
        </div>
      </div>
      <div className="flex-col">
        {resMenu && resMenu.length > 0 ? (
          resMenu.map((res, index) => (
            <div className="flex justify-between m-5 max-w-6xl p-10 border-b font-semibold" key={index}>
              <div>
                <h4 className=' font-bold'>{res?.card?.info?.name}</h4>
                <p>{res?.card?.info?.price ? `₹${Math.floor(res?.card?.info?.price / 100)}` : '₹199.1'}</p>
                <p className="max-w-[490px] text-sm text-gray-500 font-normal">{res?.card?.info?.description}</p>
              </div>
              {res?.card?.info?.imageId ? (
                <div className="relative">
                  <img className="h-28 w-36 object-cover rounded-xl" src={`${CDN_URL}${res?.card?.info?.imageId}`} alt="menu-img" />
                  <button className="absolute top-24 left-7 bg-white px-7 py-1 border-2 rounded-sm text-green-500 text-sm font-semibold hover:shadow-lg hover:bg-gray-100">ADD</button>
                </div>
              ) : (
                <button className="h-8 bg-white px-7 py-1 mr-6 border-2 rounded-sm text-green-500 text-sm font-semibold hover:shadow-lg hover:bg-gray-100">ADD</button>
              )}
            </div>
          ))
        ) : (
          <p>No items available</p>
        )}
      </div>
    </div>
   </div>
  );
};

export default SpecificRes;
