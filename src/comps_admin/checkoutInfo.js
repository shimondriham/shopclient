import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_URL, doApiGet } from '../services/apiService';

// show info about the order checkout
// also give the option to change status
function CheckoutInfo(props) {
  let [ar,setAr] = useState([]);
  let [orderInfo,setOrderInfo] = useState({});
  let params = useParams();

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    let url = API_URL+"/orders/productsInfo/"+params.id;
    let resp = await doApiGet(url);
    console.log(resp.data);
    setOrderInfo(resp.data.order);
    setAr(resp.data.products);
  }


  return (
    <div className='container'>
      <Link to="/admin/checkout">back to list</Link>
      <h2>Order info:</h2>
      <h3>Status of order: {orderInfo.status}</h3>
      {/* TODO: option to change status 
        if img not found show another img
      */}
      <h4>Total price of order:{orderInfo.total_price} nis</h4>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>short_id</th>
            <th>img</th>
            <th>Price of one item</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            return(
              <tr key={item._id}>
                <td>{i}</td>
                <td title={item.info}>{item.name}</td>
                <td>{item.short_id}</td>
                <td>
                  <img src={item.img_url} alt="pic" height="50" />
                </td>
                <td>{item.price}</td>
              </tr>
            ) 
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CheckoutInfo