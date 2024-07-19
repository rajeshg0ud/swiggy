import '@splidejs/splide/dist/css/splide.min.css';
import Splide from '@splidejs/splide';
import { useEffect } from 'react';
import { carousel, CDN_URL } from './config';

const PopularCusine = () => {
  useEffect(() => {
    new Splide('.splide', {
      type       : 'loop',
      perPage    : 7,
      autoplay   : false,
      interval   : 5000,
      arrows     : false,
      pagination : false,
    }).mount();
  }, []);

  return (
    <div className="mt-4 font-bold text-2xl pb-4 border-b-2 mx-auto max-w-[1240px] flex flex-col">
      <h1 className="ml-12">What's on your mind?</h1>
      <div className="ml-9 mt-6 relative">
        <div className="splide">
          <div className="splide__track">
            <ul className="splide__list">
              {Object.values(carousel).map((item) => (
                <li key={item.id} className="splide__slide">
                  <img className="w-[136px] hover:cursor-pointer" src={CDN_URL + item.imageId} alt="imageofcusine" /> 
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCusine;
