import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import AuthAdminComp from '../misc_comps/authAdminComp';
import PageLinks from '../misc_comps/pageLinks';
import { API_URL, doApiGet } from '../services/apiService';
import CheckoutItem from './checkoutItem';

function CheckoutListAdmin(props){
  const [ar,setAr] = useState([]);
  // for collect query string from url like ?page=
  const [query] = useSearchParams()
  const location = useLocation();
  const [page,setPage] = useState(0);

  useEffect(() => {
    doApi();
  },[location])

  
  const doApi = async() => {
    let pageQ = query.get("page") || 1;
    setPage(pageQ-1)
    let url = API_URL+"/orders/allOrders?page="+pageQ;
    let resp = await doApiGet(url);
    setAr(resp.data); 
  }

  return(
    <div className='container'>
      <AuthAdminComp />
      <h2>Checkout of store:</h2>
      <PageLinks perPage="5" apiUrlAmount={API_URL+"/orders/allOrdersCount"} urlLinkTo={"/admin/checkout"} clsCss="btn btn-info me-1" />
     
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>status</th>
            <th>name</th>
            <th>address</th>
            <th>total price</th>
            <th>amount of kind of products</th>
            <th>info</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            return(
            <CheckoutItem key={item._id} item={item} index={i + page * 5}/>
            )
          })}
        </tbody>
      </table>
    </div> 
  )
}

export default CheckoutListAdmin