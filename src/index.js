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
import SpecificRes from './components/SpecificRes';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MyOrders from './components/MyOrders';
import Search from './components/Search';

const AppLayout=()=>{
  return(
<Provider store={Store}>
    <Header />
    <Outlet />
    <ToastContainer />
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
  },
  {

    path:'/login',
    element:<Login />
  },
  {
    path:'/signup',
    element:<SignUp />
  },
  {
    path:'/myorders',
    element:<MyOrders  />
  },
  {
    path:'/search',
    element:<Search  />
  }]
}])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRoutes} />);
 
reportWebVitals();
