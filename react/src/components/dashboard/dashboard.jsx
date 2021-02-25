// import react from "react";

// import Nav from "../nav/nav"
import axios from 'axios'
import {useGlobalState} from '../../context/globalContext'
import React, { useState } from 'react';
import './dashboard.css';
import Products from './Products';
import Cart from './Cart';

const PAGE_PRODUCTS = 'products';
const PAGE_CART = 'cart';
function Dashboard() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (sum, { quantity }) => sum + quantity,
      0
    );
  };

  const  GlobalState= useGlobalState()

  function logout() {
    axios({
      methid: "post",
      url: 'http://localhost:5000/logout',
    }).then((response)=>{
      console.log(response)
    }).catch((error)=>{
      console.log(error)
    })
    return false
  }

  return (
    // <div logout={logout}>
    //   <h1>Dashboard</h1>
    //   <h1>{GlobalState.user.name}</h1>
    // </div>

    <div className="App">
    <header>
      <button onClick={() => navigateTo(PAGE_CART)}>
        Go to Cart ({getCartTotal()})
      </button>

      <button onClick={() => navigateTo(PAGE_PRODUCTS)}>
        View Products
      </button>
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