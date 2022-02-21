import React, { useEffect, useState } from 'react';
import AuthAdminComp from '../misc_comps/authAdminComp';
import { API_URL, doApiGet } from '../services/apiService';
import CheckoutItem from './checkoutItem';

function CheckoutListAdmin(props){
  const [ar,setAr] = useState([]);

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    let url = API_URL+"/orders/allOrders"
    let resp = await doApiGet(url);
    console.log(resp.data);
    setAr(resp.data); 
  }

  return(
    <div className='container'>
      <AuthAdminComp />
      <h2>Checkout of store:</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>status</th>
            <th>name</th>
            <th>address</th>
            <th>total price</th>
            <th>amount of kind of products</th>
            <th>del/info</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            return(
            <CheckoutItem key={item._id} item={item} index={i}/>
            )
          })}
        </tbody>
      </table>
    </div> 
  )
}

export default CheckoutListAdmin