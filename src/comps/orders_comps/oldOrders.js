import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiService';
import AuthClientComp from '../users_comps/authClientComp';

function OldOrders(props){
  const [ar,setAr] = useState([]);

  useEffect(() => {
    doApi();
  },[])


   // Collecting orders to ar
  const doApi = async() => {
    let url = API_URL+"/orders/userOrder";
    let resp = await doApiGet(url);
    let temp_ar = resp.data.filter(item => item.status !== "pending")
    setAr(temp_ar);
  }


  return(
    <div className='container mt-3' style={{ minHeight: "85vh" }}>
      <AuthClientComp />
      <h2>Old orders</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>status</th>
            <th>total price</th>
            <th>Date of order</th>
            <th>info</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            let date = item.date_created.replace("T"," ");
            date = date.substring(0,date.indexOf(":")+3);
            return(
             <tr key={item._id}>
               <td>{i+1}</td>
               <td>{item.status}</td>
               <td>{item.total_price}</td>
               <td>{date}</td>
               <td>
                 <Link  to={"/oldOrders/"+item._id} className='btn btn-outline-info'>More info</Link>
               </td>
             </tr>
            )
          })}
        </tbody>
      </table>
    </div> 
  )
}
export default OldOrders