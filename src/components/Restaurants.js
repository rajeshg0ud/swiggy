import React, { useEffect, useState } from 'react';
import { useGetRestaurantsMutation } from '../context/getRestaurantsApi';
import { CDN_URL } from './config';
import star from '../img/sta (2).png';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';


function Restaurants() {
    const [getRestaurants, { isLoading, isError }] = useGetRestaurantsMutation();
    const [data, setData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await getRestaurants().unwrap();
                setData(result);
            } catch (error) {
                console.error('Failed to fetch restaurants:', error);
            }
        };

        getData();
    }, [getRestaurants]);

    if (isLoading) return (
        <div className="self-center flex justify-center m-[6px] items-center text-3xl font-semibold">
            < ClipLoader color="#000000" loading={isLoading} size={50} />
        </div>
    );
  
    if (isError) return <div className="m-5 mt-24">{isError?.message}</div>;

    return (
        <div className='max-w-[1240px] flex flex-col justify-center mx-auto'>
            <h1 className=' mt-6 md:mt-10 mb-2 font-bold text-lg md:text-2xl ml-4 md:ml-11'>
            Top restaurant chains in Hyderabad
            </h1>

            <div className='flex flex-wrap'>
                {data?.map(res => (
                    <Link key={res.info.id} to={`restaurant/${res.info.id}`}>
                        <div className='m-2 mt-5 ml-8 md:ml-10 hover:scale-95 transition-transform duration-300 hover:cursor-pointer'>
                            <img
                                className='h-48 w-[299px] md:h-44 md:w-64 shadow-md object-cover rounded-xl'
                                src={CDN_URL + res.info.cloudinaryImageId}
                                alt='restaurant'
                            />

                            <div className='m-2'>
                                <p className='font-bold'>{res.info.name}</p>

                                <div className='text-sm flex justify-between items-center py-1'>
                                    <div className='flex'>
                                        <span>{res.info.avgRating}</span>
                                        <img
                                            className='h-[13px] w-[13px] mt-[3px] ml-1'
                                            src={star}
                                            alt='rating'
                                        />
                                    </div>

                                    <span className='flex font-semibold'>
                                        {res.info.slaString}
                                    </span>
                                </div>

                                <p className='text-slate-600 text-sm'>
                                    {res.info.areaName}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Restaurants;
