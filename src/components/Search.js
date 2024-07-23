import React, { useEffect, useState } from 'react'
import { useGetRestaurantsMutation } from '../context/getRestaurantsApi';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CDN_URL } from './config';
import star from '../img/sta (2).png';

function Search() {
    const [searchTerm, setSearchTerm]=useState("");
    const [data, setData]=useState([]);
    const [getRestaurants,{isLoading}]=useGetRestaurantsMutation();
    const navigate=useNavigate(); 
  const [params]= useSearchParams();

  const keyword= params.get('s'); 

    const handleSubmit=(e)=>{
      e.preventDefault();
      if(searchTerm){
      navigate(`/search?s=${searchTerm}`)
      }
    }

    useEffect(()=>{

      const getSearchRes=async()=>{
       try{
        const res= await getRestaurants({keyword}).unwrap();
        console.log(res)
        setData(res)
       }
       catch(err){
        toast.error(err.message || "Unable to fetch the data")
       }
      }

      if(keyword){
      getSearchRes();
      }
    }, [keyword, getRestaurants])


  return (
    <div className='mt-[84px] md:mt-32 w-full'>
       <form onSubmit={(e)=> handleSubmit(e)} className=' w-full  flex justify-center'>
        <input type='text' placeholder='Search for Restaurants' onChange={(e)=> setSearchTerm(e.target.value)} className=' border p-3 text-black outline-none border-gray-400 rounded-sm w-[85%] md:w-[50%]'/>
        </form>

     {isLoading ? (
        <div className="self-center flex justify-center m-[6px] items-center text-3xl font-semibold">
          <ClipLoader color="#000000" loading={isLoading} size={50} />
        </div>
      )

      :(
        <div className=' flex flex-col items-center md:w-[50%] mx-auto'>
          <h1 className=' font-semibold border bg-gray-800 p-2 rounded-full my-1 text-sm text-white self-start ml-8 md:ml-10 '>Restaurants</h1>
          <div className='flex flex-wrap justify-between'>
            
                {data?.map(res => (
                    <Link key={res.info.id} to={`/restaurant/${res.info.id}`}>
                        <div className='m-2 mt-5 ml-8 md:ml-10 hover:scale-95 flex  transition-transform duration-300 hover:cursor-pointer w-[320px]'>
                            <img
                                className='h-[100px] w-[150px] shadow-md object-cover rounded-xl'
                                src={CDN_URL + res.info.cloudinaryImageId}
                                alt='restaurant'
                            />

                            <div className='m-2  text-sm'>
                                <p className='font-bold'>{res.info.name}</p>

                                <div className='text-xs flex justify-between items-center py-1'>
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

                                <p className='text-slate-600 text-xs'>
                                    {res.info.areaName}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        
      )
    }

    </div>
  )
}

export default Search


