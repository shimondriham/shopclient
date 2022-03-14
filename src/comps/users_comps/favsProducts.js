import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import ProducItem from '../productItem';
import AuthClientComp from './authClientComp';

function FavsProducts(props) {
  const [ar,setAr] = useState([])
  const [loading,setLoading] = useState(false)
  

  useEffect(() => {
   
    doApiListFav()
  },[])

  const doApiListFav = async() => {
    setLoading(true);
    let url = API_URL+"/favs/productsInfo";
    let resp = await doApiGet(url)
    setAr(resp.data)
    setLoading(false);
  }

  return (
    <div className='container-fluid' style={{ minHeight: "85vh" }}>
      <div className="container">
        <AuthClientComp />
        <h1 className='text-center gradi'>Your favorites</h1>
        <h5 className='text-center gradi'>Click on star to remove them from the list</h5>
        {loading? <h2 className='text-center'>Loading...</h2> : ""}
        {ar.length === 0 && !loading  ? <div className='mt-5' style={{height:"300px", maxWidth:"600px",display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",margin:"0 auto",background:"linear-gradient(rgba(73, 73, 73, 0.18),rgba(0, 0, 0, 0.18))"}}>you didn't have favorites product's yet...</div> : ""}
        
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