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
      }}>close</button>
      <h2 className='p-2'>Products in carts:</h2>
      {cart_ar.map(item => {
        return(
          <CartItem key={item._id} item={item} />
        )
      })}
      {/* <CartItem /> */}

      <h2 className='p-2'>Total: {total} Nis</h2>
      <Link  to={"/Checkout/"} className='m-2 btn btn-outline-primary'>To Checkout</Link>
    </div> 
  )
}

export default Cart