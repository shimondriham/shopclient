import React from 'react';
import { useParams } from 'react-router-dom';

function ProductsListPage(props){
  const params = useParams();
  

  return(
    <div className='container-fluid'>
      <div className="container">
        <h1 className='text-center'>Categories of {params.cat_url}</h1>
      </div>
    </div> 
  )
}

export default ProductsListPage

