import React, { useContext, useEffect, useState } from 'react';
import "../css/cart.css";
import CartItem from './cartItem';
import {AppContext} from "../../context/shopContext"
import { Link } from 'react-router-dom';

function Cart(props){
  const [total,setTotal] = useState(0);
  const {showCart,setShowCart,cart_ar} = useContext(AppContext);

//  calc the total
  useEffect(()=>{
    let sumTotal = 0;
    cart_ar.forEach(item => {
      sumTotal += item.price;
    })
    setTotal(sumTotal)
  },[cart_ar])

  return(
    <div style={{display:showCart}} className='cart'>
      <button className='btn btn-outline-danger close-btn' onClick={() => {
        setShowCart("none");
      }}>X</button>
      <h4 className='p-2'>Products in carts:</h4>
      {cart_ar.map(item => {
        return(
          <CartItem key={item._id} item={item} />
        )
      })}
      <h5 className='p-2'>Total: {total} <i class="fa fa-ils" aria-hidden="true"></i></h5>
      <Link  to={"/Checkout/"} className='m-2 btn btn-outline-primary ToCheckout'><i class="fa fa-credit-card-alt mx-1" aria-hidden="true"></i>  To Checkout</Link>
    </div> 
  )
}

export default Cart