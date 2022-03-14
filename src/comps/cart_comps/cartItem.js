import React, { useContext } from 'react';
import {AppContext} from "../../context/shopContext"

function CartItem(props){
  const {cart_ar, updateCart} = useContext(AppContext);
  let item = props.item;

   // Remove product from the cart
  const onRemoveItemClick = () => {
    let temp_ar = cart_ar.filter(prod => prod._id !== item._id);
    updateCart(temp_ar);

  }

  return(
    <div className='border pt-2 px-2 overflow-hidden'>
      <button onClick={onRemoveItemClick} className='btn btn-outline-danger float-end badge text-danger ms-2'>X</button>
      <h5 className='float-end'>{item.price} <i className="fa fa-ils" aria-hidden="true"></i></h5>
      <h5>{item.name} </h5>
    </div> 
  )
}

export default CartItem