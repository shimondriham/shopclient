import React from 'react';

function CartItem(props){
  return(
    <div className='border pt-2 px-2 overflow-hidden'>
      <button className='float-end badge bg-danger ms-2'>X</button>
      <h5 className='float-end'>400 Nis</h5>
      <h5>product name </h5>
    </div> 
  )
}

export default CartItem
