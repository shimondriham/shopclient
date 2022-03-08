import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import ProducItem from '../productItem';
import AuthClientComp from './authClientComp';

function FavsProducts(props) {
  let [ar,setAr] = useState([])


  useEffect(() => {
   
    doApiListFav()
  },[])

  const doApiListFav = async() => {
    let url = API_URL+"/favs/productsInfo";
    let resp = await doApiGet(url)
    console.log(resp.data);
    setAr(resp.data)
  }

  return (
    <div className='container-fluid' style={{ minHeight: "85vh" }}>
      <div className="container">
        <AuthClientComp />
        <h1 className='text-center gradi'>Your favorites</h1>
        <h5 className='text-center gradi'>Click on star to remove them from the list</h5>
        {/* {ar.length == 0 ? <h2 className='text-center'>Loading...</h2> : ""} */}
        {ar.length == 0 ? <h2 className='text-center text-danger'>You have not yet selected any favorites</h2> : ""}
        <div className="row">
          {ar.map(item => {
            return (
              <ProducItem key={item._id} item={item} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FavsProducts