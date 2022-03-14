import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';

// show info about the order checkout
// also give the option to change status
function CheckoutInfo(props) {
  let [ar, setAr] = useState([]);
  let [orderInfo, setOrderInfo] = useState({});
  let params = useParams();
  let selectRef = useRef();

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    let url = API_URL + "/orders/productsInfo/" + params.id;
    let resp = await doApiGet(url);
    setOrderInfo(resp.data.order);
    setAr(resp.data.products);
  }

  const onStatusChanged = async () => {
    let status = selectRef.current.value;
    let url = API_URL + "/orders/" + orderInfo._id + "?status=" + status;
    let resp = await doApiMethod(url, "PATCH", {});
    if (resp.data.modifiedCount == 1) {
      doApi();
    }
  }


  return (
    <div className='container'>
      <Link style={{colore:"red"}}  to="/admin/checkout"><i className="fa fa-backward" aria-hidden="true"></i>  back to list</Link>
      { orderInfo.name ? <article>
        <h2>Order info:</h2>
        <h3>Name: {orderInfo.name} , Address: {orderInfo.address} , phone: {orderInfo.phone}</h3>
        <h3>Status of order: {orderInfo.status}</h3>
        <div className='col-md-3'>
          <h4>Change status:</h4>
          <select defaultValue={orderInfo.status} ref={selectRef} onChange={() => { onStatusChanged() }} className='form-select'>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
            <option value="canceld">Canceld</option>
          </select>
        </div>
      </article> : <h2>Loading...</h2>}
  
      <h4>Total price of order:{orderInfo.total_price} <i className="fa fa-ils" aria-hidden="true"></i></h4>
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

export default CheckoutInfo