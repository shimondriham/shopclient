import React, { useContext, useEffect, useState } from 'react';
import {PayPalButton} from "react-paypal-button-v2"
import { getCartFromLocal } from '../../services/localService';
import AuthClientComp from '../users_comps/authClientComp';
import { AppContext } from "../../context/shopContext"
import { API_URL, doApiMethod } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

function Checkout(props) {
  const { cart_ar, setShowCart, updateCart } = useContext(AppContext);
  const [cartEmpty, setCartEmpty] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const nav = useNavigate();


  useEffect(() => {
    setShowCart("none")
    if (cart_ar.length > 0) {
      setCartEmpty(false)
      setShowLoading(true)
      doApiAddToCheckout()
    }
    else {
      setCartEmpty(true)
      setShowLoading(false);
    }
  }, [cart_ar])

// add to checkout
  const doApiAddToCheckout = async () => {  
    let url = API_URL + '/orders';
    let total_price = 0
    let products_ar = cart_ar.map(item => {
      total_price += item.price;
      return {
        s_id: item.short_id,
        amount: 1,
        price: item.price
      }
    })
    setTotal(total_price)
    console.log(products_ar)
    console.log(total_price);
    let resp = await doApiMethod(url, "POST", { total_price, products_ar })
    console.log(resp.data)
    setShowLoading(false);
  }

  // delete from the cart
  const onXclick = (_delProdId) => {
    let temp_ar = cart_ar.filter(prod => prod._id != _delProdId);
    updateCart(temp_ar);
  }

  // Update order status if payment has been made
  const onCommit = async (_data) => {
    if (cart_ar.length > 0) {
      let url = API_URL + "/orders/orderPaid/"
      let paypalObject = {
        tokenId: _data.facilitatorAccessToken,
        orderId: _data.orderID,
        realPay:"sandbox"
      }
      let resp = await doApiMethod(url, "PATCH", paypalObject);
      if (resp.data.modifiedCount == 1) {
        alert("Your order completed");
        nav("/oldorders");
        updateCart([]);
      }
    }
  }


  return (
    <div className='container mt-3' style={{ minHeight: "85vh" }}>
      <AuthClientComp />

      {cartEmpty ? <h2>Cart is empty</h2> : ""}
      <div className="row">
        <div className="col-md-8">
          <h3>Products in cart:</h3>
          <h4>Total price: {total} <i class="fa fa-ils" aria-hidden="true"></i></h4>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>#</th>
                <th>name</th>
                {/* <th>amount</th> */}
                <th>price</th>
                <th>del</th>
              </tr>
            </thead>
            <tbody>
              {cart_ar.map((item, i) => {
                return (
                  <tr key={item._id} title={item.info}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    {/* <td>1</td> */}
                    <td>{item.price}</td>
                    <td>
                      <button onClick={() => { onXclick(item._id) }} className="badge bg-danger">X</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className='col-md-4'>
          {showLoading ? <h2>Loading...</h2> :
            <div>
              <h3>Choose paid method:</h3>
              <PayPalButton
                currency="ILS"
                amount={total}
                options={{
                  clientId:"AVC7mEW5RDbALzT1476MY9WJ8b7FnIMlQZ1iINrAieAP_-moVVf5UCTqRFQCPHxadMwGsCr4nhF71Gjd"
                }}
                onSuccess={(details,data) => {
                  if(data.orderID){
                    onCommit(data);
                  }
                }}
                onCancel={(err) => {
                  alert("The process end before the payment, try again")
                }}
              />        
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Checkout