import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetRestaurantByIdMutation } from '../context/getRestaurantsApi'; // Adjust the import path as necessary
import star from '../img/sta (2).png';
import { CDN_URL } from './config';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../context/cartSlice';
import AddButton from './addButton';
import ClipLoader from 'react-spinners/ClipLoader';

const SpecificRes = () => {
  const { id } = useParams();
  const [getRestaurantById, { isLoading, isError }] = useGetRestaurantByIdMutation();
  const [restaurant, setRestaurant] = useState(null);

  const { restInfo, items } = useSelector((store) => store.cartSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const result = await getRestaurantById(id).unwrap();
        setRestaurant(result);
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      }
    };

    getRestaurant();
  }, [getRestaurantById, id]);

  if (isLoading) return (
    <div className="self-center flex justify-center m-[6px] items-center text-3xl font-semibold">
        < ClipLoader color="#000000" loading={isLoading} size={50} />
    </div>
);

if (isError) return <div className="m-5 mt-24">{isError?.message}</div>;


  if (!restaurant) {
    return <div>No data found</div>;
  }

  const { resInfo, resMenu } = restaurant;

  return (
    <div className='flex justify-center'>
      <div className="mt-28 md:m-36 w-[95.6%] md:w-2/4">
        <div className="flex px-2 justify-between min-w-[350px] max-w-[700px] md:max-w-3xl mb-7">
          <div>
            <h3 className="font-extrabold text-md md:text-lg">{resInfo.name}</h3>
            <p>{resInfo.areaName}, {resInfo.city}</p>
          </div>
          <div>
            <p className="flex font-bold mr-2">
              {resInfo.avgRating}
              {resInfo.avgRating && <img className="h-4 w-4 rounded-full m-1" src={star} alt="rating" />}
            </p>
            <p className='hidden md:block'>{resInfo.costForTwoMessage}</p>
          </div>
        </div>
        <div className="flex-col">
          {resMenu && resMenu.length > 0 ? (
            resMenu.map((res, index) => {
              const existingItem = items.find(item => item.itemId === res?.card?.info?.id);
              const value = res?.card?.info?.price
                ? `₹${Math.floor(res?.card?.info?.price / 100)}`
                : Math.floor(res?.card?.info?.variantsV2?.variantGroups[0]?.variations[0]?.price);

              return (
                <div className="flex justify-between md:m-5 max-w-3xl md:max-w-6xl px-4 py-9 md:p-10 border-b font-semibold" key={index}>
                  <div>
                    <h4 className='max-w-[200px] md:max-w-[490px] font-bold text-sm md:text-[1rem]'>{res?.card?.info?.name}</h4>
                    <p className='text-sm md:text-[1rem] py-1 md:py-3'>{value}</p>
                    <p className=" max-w-[200px] md:max-w-[490px] text-xs md:text-sm text-gray-500 font-normal">{res?.card?.info?.description}</p>
                  </div>

                  <div className="relative">
                    {res?.card?.info?.imageId && (
                      <img className=" h-24 w-28 md:h-28 md:w-36 object-cover rounded-xl" src={`${CDN_URL}${res?.card?.info?.imageId}`} alt="menu-img" />
                    )}
                    {resInfo?.id === restInfo?.id ? (
                      existingItem ? (
                        <div className={`flex bg-white mr-6 border-[1.57px] border-green-500 rounded-sm text-green-500 text-sm font-semibold hover:shadow-lg hover:bg-green-50 ${res?.card?.info?.imageId ? 'absolute top-20 md:top-24 left-5 md:left-7' : 'h-8'}`}>
                          <button className='border-r border-green-500 px-[7.8px] md:px-[10.5px] py-1' onClick={() => dispatch(removeFromCart({ id: resInfo.id, itemId: existingItem.itemId }))}>-</button>
                          <button className='border-r border-green-500 px-[7.8px] md:px-[10.5px] py-1'>{existingItem.quantity}</button>
                          <button className='px-[7.8px] md:px-[10.5px] py-1' onClick={() => dispatch(addToCart({ id: resInfo.id, itemId: existingItem.itemId }))}>+</button>
                        </div>
                      ) : (
                        <AddButton resInfo={resInfo} res={res} value={value} />
                      )
                    ) : (
                      <AddButton resInfo={resInfo} res={res} value={value} />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No items available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecificRes;
