import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../services/apiService';
import ProducItem from './productItem';

function ProductsHome(props){
  let [ar,setAr] = useState([]);

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    let url = API_URL+"/products?perPage=4";
    let resp = await doApiGet(url);
    console.log(resp.data);
    setAr(resp.data);
  }


  return(
    <div className='container'>
      <h2>New products in our store</h2>
      <div className="row">
        {ar.map(item => {
          return(
            <ProducItem key={item._id} item={item} />
          )
        })}
      </div>
    </div> 
  )
}

export default ProductsHome

