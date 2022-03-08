import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../services/apiService';
import { checkVisitedLocal, VISITED_PRODUCT } from '../services/localService';
import ProducItem from './productItem';

function ProductsHome(props){
  let [ar,setAr] = useState([]);

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    // check if there products saved in the local that user visited in
    let vistedProds = checkVisitedLocal();
    let url;
    if(vistedProds){
     url = API_URL+"/products/visited?visited="+vistedProds;
    }
    else{
      url = API_URL+"/products?perPage=4";
    }
    let resp = await doApiGet(url);
    console.log(resp.data);
    setAr(resp.data);
  }


  return(
    <div className='container py-4'>
      {localStorage[VISITED_PRODUCT] ? 
        <h2 className='text-center text-info gradi'>Products you intersted in</h2> :
      <h2 className='text-center'>
        New products in our store
      </h2>
    }
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