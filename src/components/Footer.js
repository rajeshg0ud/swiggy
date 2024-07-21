import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white py-10 mt-12">
      <div className="container mx-auto px-6 lg:px-20 max-w-[1240px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="mb-6 md:mb-0">
            <h3 className="text-md md:text-lg font-bold mb-4">Company</h3>
            <ul>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">About</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Team</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Swiggy One</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Swiggy Instamart</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Swiggy Genie</a></li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-md md:text-lg font-bold mb-4">Contact us</h3>
            <ul>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Help & Support</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Partner with us</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Ride with us</a></li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-md md:text-lg font-bold mb-4">Legal</h3>
            <ul>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Investor Relations</a></li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-md md:text-lg font-bold mb-4">We deliver to:</h3>
            <ul>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Bangalore</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Gurgaon</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Hyderabad</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Delhi</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Mumbai</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Pune</a></li>
              <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">589 cities</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
