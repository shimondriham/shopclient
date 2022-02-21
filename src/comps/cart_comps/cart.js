import React, { useContext, useEffect, useState } from 'react';
import "../css/cart.css";
import CartItem from './cartItem';
import {AppContext} from "../../context/shopContext"

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
      <button className='btn btn-danger close-btn' onClick={() => {
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
    </div> 
  )
}

export default Cart