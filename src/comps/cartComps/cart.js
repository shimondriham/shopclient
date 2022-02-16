import React from 'react';
import "../css/cart.css";
import CartItem from './cartItem';

function Cart(props){
  return(
    <div className='cart'>
      <button className='btn btn-danger close-btn'>close</button>
      <h2 className='p-2'>Products in carts:</h2>
      {/* <CartItem /> */}

      <h2 className='p-2'>Total: xx Nis</h2>
    </div> 
  )
}

export default Cart

