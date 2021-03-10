// import react from "react";


import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import './dashboard.css';
import Products from './Products';
import Cart from './Cart';

const PAGE_PRODUCTS = 'products';
const PAGE_CART = 'cart';
function Dashboard() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);
  const history = useHistory()
  function myorder(){
    history.push("/myOrders")
  }

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (sum, { quantity }) => sum + quantity,
      0
    );
  };

  return (
   
    
    
    <div className="App">
    <header>
      <button onClick={() => navigateTo(PAGE_CART)} className="btn" >
        Go to Cart ({getCartTotal()})
      </button>
        
      <button onClick={() => navigateTo(PAGE_PRODUCTS)}className="btn">
        View Products
      </button>
      <button onClick={myorder} className='btn'>My Orders</button>
    </header>
    {page === PAGE_PRODUCTS && (
      <Products cart={cart} setCart={setCart} />
    )}
    {page === PAGE_CART && (
      <Cart cart={cart} setCart={setCart} />
    )}
  </div>

  )

}

export default Dashboard;