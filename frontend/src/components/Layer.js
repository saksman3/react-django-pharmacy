import React, { useState } from "react";
import {
  Container,
  Menu,
  Icon
} from "semantic-ui-react";
import './main.css';
import { Link } from 'react-router-dom'
import { useGlobalState } from '../state/provider';
import MyModal from "./MyModal";

const CustomLayout = ({ children }) => {
  const [{ profile, incompleteOrders }, { }] = useGlobalState();
  const [show,setOpen] = useState(false); // used to hide or show the modal
  let  cart_length=0
  if (incompleteOrders !==null ){
    //console.log(incompleteOrders?.order_items.length);
    cart_length = incompleteOrders?.order_items.length
  }else{
    cart_length=0;
  }
  const handleOpenClose = ()=>{
    //when the modal is closed we need to make sure that the show modal is h
        if(show){
          setOpen(false);
          
        }
        else{
          setOpen(true);
        }         
  }
  return (
    <div>
      { 
      show&&<MyModal handleOpenClose={handleOpenClose}/>}
      <Menu inverted fixed="top" >
        <Container fluid>
          <Link to="/" position="left">
            <Menu.Item header>Home</Menu.Item>
          </Link>
          <Link to="/sale">
            <Menu.Item header>Sale</Menu.Item>
          </Link>
          <Link to="/products">
            <Menu.Item header>Products</Menu.Item>
          </Link>
          {
            profile !== null ? (
            <>

              <Menu.Item position="right">
                <span /* to="/profile" */ onClick={()=>{setOpen(true)}}>
                  <Icon name="user circle" />{profile.user.username}
                </span>
              </Menu.Item>
              <Menu.Item >
                <Link to="/Logout" position="right">
                  <Icon name="user close" />Logout
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/cart_items">
                   <Icon name="shopping cart" link color="red"/> Cart({cart_length})
                </Link>
                </Menu.Item>

              </>

            ) : (<>
              <Menu.Item position="right">
                <Link to="/login" >
                  <Icon name="arrow circle left" />login
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/signup" position="right">
                  <Icon name="add circle" />signup
                </Link>
              </Menu.Item>
            
            </>)
          }



        </Container>
      </Menu>
      {children}
    </div>
  );
}
export default CustomLayout;