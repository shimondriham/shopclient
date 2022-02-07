import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL, doApiGet } from '../services/apiService';
import ProducItem from './productItem';

function InfoProductsList(props){
  let [ar,setAr] = useState([]);
  let params = useParams();

  useEffect(() => {
    doApi()
  },[])

  const doApi = async() =>{ 
    let url = API_URL+"/products?perPage=5&cat="+props.
    cat_short_id;

    let resp = await doApiGet(url);
    console.log(resp.data);
    

    // check if we are in the product page
    // not show it again in the list of new products
    // in first time
    let temp_ar = resp.data;
    temp_ar = temp_ar.filter(item => {

      return item._id != params.id;
    })
    if(temp_ar.length > 4){
      temp_ar.pop();
    }
     
  
    setAr(temp_ar);
  }
  
  return(
    <div className='my-5'>
      <h2 className='text-center'>
        New products in our store
      </h2>
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

export default InfoProductsList