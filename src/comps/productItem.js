import React from 'react';

function ProducItem(props){
  let item = props.item;

  return(
    <div className='product-item col-md-3 p-2'>
      <div className="border">
        <div style={{backgroundImage:`url(${item.img_url||"/images/cover.jpg"})`}} className='product-img'></div>
        <div className='p-2'>
        <h4>{item.name}</h4>
        <div>Price: {item.price}</div>
        </div>
      </div>
    </div> 
  )
}

export default ProducItem

