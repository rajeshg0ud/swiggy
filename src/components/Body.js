import React from 'react'
import PopularCusine from './PopularCusine'
import Restaurants from './Restaurants'
import Footer from './Footer'

function Body() {
  return (
    <div className=' mt-24'>
        <PopularCusine />
        <Restaurants />
        <Footer />
    </div>
  )
}

export default Body