import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import reportWebVitals from './reportWebVitals';
import Header from './components/Header';
import Body from './components/Body';
import { Provider } from 'react-redux';
import { Store } from './context/Store';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Cart from './components/Cart';
import SpecificRes from './components/SpecificRes.js';

const AppLayout=()=>{
  return(
<Provider store={Store}>
    <Header />
    <Outlet />
    </Provider>
  )
}
const appRoutes= createBrowserRouter([{
  path:'/',
  element:<AppLayout />,
  children:[{
    path:'/',
    element:<Body />
  },
  {

    path:'/cart',
    element:<Cart />
  },
  {
    path:'/restaurant/:id',
    element:<SpecificRes />
  }]
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRoutes} />);
 
reportWebVitals();
