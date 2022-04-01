import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import ProductList from './components/ProductList';
import ItemDetails from './components/ItemDetails';
import Cart from './components/Cart';
import Profile from './components/Profile';
import { ProfileURL, header, OrdersURL } from './constants';
import { useGlobalState } from './state/provider';
import UpdateProfile from './components/UpdateProfile';
import OrderHistory from './components/OrderHistory';

const BaseRouter = () => {
  const get_token = window.localStorage.getItem('token');
  const [{profile, pageReload,incompleteOrders, completeOrder},dispatch] = useGlobalState();
  useEffect(() => {
    if (get_token !== null) {
      
      const getProfileData = async () => {
        await fetch(ProfileURL, {
          method: 'GET',
          headers: header
        })
          .then(response => {
            
            return response.json();
          })
          .then(json_data => {
            dispatch({
              type:"ADD_PROFILE",
              profile:json_data.data
            });

          }).catch(error=>error)
      }
      getProfileData();
    }
    
  }, [pageReload])
 useEffect(()=>{
   const getOrders = async()=>{
        await fetch(OrdersURL,{
          headers: header
        }).then(resp=>resp.json()).then(json_data=>{
          {
            
            const all_data = []
            json_data.map(data=>{
              /* check if the current object in the returned array is a completed order or incomplete and dispatch actions based on the results. */
              if(data.complete){
                 
                 all_data.push(data)
                 console.log("all data",all_data)
                 dispatch({
                   type:"ADD_COMPLETE_CART",
                   completeOrder: all_data
                 });
              }else{
                // console.log(data)
                dispatch({
                  type:"ADD_INCOMPLETE_CART",
                  incompleteOrders:data
                });
              }
            })
          }
        });
   }
   getOrders()
 },[])
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/item_detail/:id" element={<ItemDetails />} />
      {
        profile !==null&&(
          <>
              <Route path='/update' element={<UpdateProfile/>}/>
              <Route path='/cart_items' element={<Cart/>}/>
              <Route path='/order_history' element={<OrderHistory/>}/>
          </>
        )
      }
      <Route path='/profile' element={<Profile />} />

    </Routes>
  )
}
export default BaseRouter;