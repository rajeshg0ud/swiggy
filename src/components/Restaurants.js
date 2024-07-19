import React, { useEffect } from 'react'
import { useGetRestaurantsQuery } from '../context/getRestaurantsApi'
import { CDN_URL } from './config';
import star from '../img/sta (2).png'
import { Link } from 'react-router-dom';

function Restaurants() {

    const {data ,isLoading}= useGetRestaurantsQuery();

    useEffect(()=>{
      window.scrollTo(0,0)
    },[])
    
    if(isLoading){
        return <div>loading</div>
    }
    console.log(data);



  return (
    <div className='  max-w-[1240px] flex flex-col justify-center mx-auto'>
       <h1 className='mt-10 mb-2 font-bold text-2xl ml-11'>Restaurants with online food delivery in Hyderabad</h1> 

       <div className=' flex flex-wrap'>
        {
            data?.map(res=>(
                <Link to={`restaurant/${res.info.id}`}>
                <div className=' m-2 mt-5 ml-10 hover:scale-95 transition-transform duration-300 hover:cursor-pointer'>
                    <img className=" h-44 w-64 shadow-md object-cover rounded-xl" src={CDN_URL + res.info.cloudinaryImageId} alt="restaurant" />
                    
                    <div className='m-2'>
                        <p className=' font-bold '>{res.info.name}</p>

                      <div className='  text-sm flex justify-between items-center py-1'>
                      <div className='flex'>
                       <span >{res.info.avgRating}</span>
                       <img className='h-[13px] w-[13px] mt-[3px] ml-1' src={star}  alt='rating'/>
                      </div>

                      <span className='flex font-semibold'>{res.info.slaString}</span>
                      </div>

                      <p className=' text-slate-600 text-sm'>{res.info.areaName}</p>

                    </div>
                </div>
                </Link>
            ))
        }
       </div>
</div>
  )
}

export default Restaurants