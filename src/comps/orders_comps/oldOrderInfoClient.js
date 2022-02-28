import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiService';

function OldOrderInfoClient(props){
  let [ar, setAr] = useState([]);
  let [orderInfo, setOrderInfo] = useState({});
  let [orderDate,setOrderDate] = useState("");
  let params = useParams();
 
  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    let url = API_URL + "/orders/productsInfo/" + params.idOrder;
    let resp = await doApiGet(url);
    // console.log(resp.data);
    // defiendDate
    let date = resp.data.order.date_created.replace("T"," ");
    date = date.substring(0,date.indexOf(":")+3);
    setOrderDate(date);
    setOrderInfo(resp.data.order);
    setAr(resp.data.products);
  }

  return(
    <div className='container'>
      <Link className='btn btn-outline-secondary mt-2' to="/oldOrders/">back to list</Link>
      { orderInfo.name ? <article>
        <h2>Order info:</h2>
        <h3>Status of order: {orderInfo.status}</h3>
        <h3>Date: {orderDate}</h3>
      </article> : <h2>Loading...</h2>}
 
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
          {ar.map((item, i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1}</td>
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

export default OldOrderInfoClient