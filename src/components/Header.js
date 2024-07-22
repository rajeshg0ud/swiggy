import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; 
import swiggy from '../assets/swiggy.svg'  
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useSignoutMutation } from '../context/userApiSlice';
import { addUserInfo } from '../context/cartSlice';
import { toast } from 'react-toastify';


function Header() {

  const user= useSelector(Store =>  Store.cartSlice.userInfo)
  const [dropdownVisible, setDropdownVisible]=useState(false);
  const dispatch=useDispatch();
  const dropdownRef=useRef(null);
  const navigate=useNavigate();

  useEffect(()=>{
    const handleClickOutside=(event)=>{
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setDropdownVisible(false)
      }
    }
      document.addEventListener('mousedown', handleClickOutside);

      return()=>{
        document.removeEventListener('mousedown', handleClickOutside)
      }

  }, [dropdownRef])
 

  const [signout,{isLoading, isError}]=useSignoutMutation();

  const handleSignout=async()=>{
    try{
      await signout().unwrap();
      dispatch(addUserInfo(null))
      toast.success('Signed out')
    }
    catch(Err){
      toast.error(Err)
    }
  }


  return (
    <div className=' z-10 fixed w-full top-0 flex justify-center shadow-md bg-white brightness-105  '>

        <div className='flex w-[97%] md:w-[80%] justify-between items-center  text-slate-700 '>
        
        <div className='px-2 flex items-center'>
          <div className=' w-6 md:w-[36px]'>
            <Link to={'/'}>
            <img src={swiggy} alt='swiggy' className=' w-[33.7px] hover:w-[36px] transition-width duration-500 ease-in-out hover:cursor-pointer'/>
            </Link>
          </div>

          <div className='flex items-center hover:cursor-pointer m-2 md:m-7 my-6 text-sm '>
           <p className=' hover:text-orange-500 border-gray-800 border-b-2 hover:border-orange-500  text-sm md:text-md pb-1 mx-[5px] md:mx-2 font-bold'>Banjara Hills </p> 
           <p className='pr-1 pb-1 text-gray-600 hidden md:block'> Hyderabad, Telangana, India </p>
           <FontAwesomeIcon icon={faAngleDown} className=' text-orange-500'/>
          </div>
        </div>

       <div className=' items-center flex'>
       <div className=' hidden md:flex mx-8 py-2'>
        <FontAwesomeIcon className='p-1 px-2 ' icon={faSearch} />  
        <p className='hover:text-orange-500 font-medium hover:cursor-pointer'>Search</p>
        </div>

        <div className='mx-8 py-2  hidden md:flex hover:text-orange-500 font-medium hover:cursor-pointer'><img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/helpcenter-7d90c0.svg"  className='px-2'/> <a>Help</a></div>
        {
          user?.name ?        
           (<div  ref={dropdownRef}>
           <div className='mx-[6.5px] md:mx-8py-2 flex  hover:text-orange-500 text-sm md:text-md font-medium hover:cursor-pointer' onClick={()=> setDropdownVisible(!dropdownVisible)}> <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"   className='px-1 md:px-2'/><a> {user.name}</a> </div>
         {
          dropdownVisible && 
          <div className='absolute text-xs md:text-base top-[74px] md:top-[83px] ml-1 bg-white flex flex-col'>
            <Link to='/myorders' >
            <button className=' border border-gray-300 p-2 hover:bg-gray-200 shadow-md'>My Orders</button>
            </Link>
            <button className=' border border-gray-300 p-2 hover:bg-gray-200 shadow-md' onClick={()=>handleSignout()}>Sign Out</button>
          </div>
         } 
         </div>)
         :        
           <div className='mx-[6.5px] md:mx-8  py-2 flex  hover:text-orange-500 text-sm md:text-md font-medium hover:cursor-pointer'><Link className='flex' to={'/login'}><img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"   className='px-1 md:px-2'/><a className='mt-[2px]'> Sign In</a></Link></div>

        }

        <div className='mx-[6.5px] md:mx-8 py-2 flex  hover:text-orange-500 text-sm md:text-md font-medium hover:cursor-pointer'><Link className='flex' to={'/cart'}><img src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg'  className='px-1 md:px-2' /> <a className='mt-[2px]'>Cart</a>  </Link> </div>
      
       </div>

       </div> 
</div>
  )
}

export default Header 