import React, { useContext, useEffect, useState } from 'react';
import { getCartFromLocal } from '../../services/localService';
import AuthClientComp from '../users_comps/authClientComp';
import { AppContext } from "../../context/shopContext"
import { API_URL, doApiMethod } from '../../services/apiService';

function Checkout(props) {
  const { cart_ar, setShowCart, updateCart } = useContext(AppContext);
  const [cartEmpty, setCartEmpty] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setShowCart("none")
    // Check if there products in the cart
    console.log(cart_ar)
    if (cart_ar.length > 0) {
      setCartEmpty(false)
      setShowLoading(true)
      //post the products in the db order
      doApiAddToCheckout()
    }
    else {
      setCartEmpty(true)
      setShowLoading(false);
    }
    // get the data of the products
  }, [cart_ar])

  const doApiAddToCheckout = async () => {
    // add to checkout
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

  const onXclick = (_delProdId) => {
    // delete from the cart in context the product and update it in local
    let temp_ar = cart_ar.filter(prod => prod._id != _delProdId);
    updateCart(temp_ar);
  }

  const onCommit = async () => {
    if (cart_ar.length > 0) {
      let url = API_URL + "/orders/orderPaid/"
      let resp = await doApiMethod(url, "PATCH", {});
      if (resp.data.modifiedCount == 1) {
        alert("Your order completed");
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
          <h4>Total price: {total} nis</h4>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>#</th>
                <th>name</th>
                <th>amount</th>
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
                    <td>1</td>
                    <td>{item.price}</td>
                    <td>
                      <button onClick={() => { onXclick(item._id) }} className="badge bg-warning">X</button>
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
              <button onClick={() => { onCommit() }} className='btn btn-info w-100'>Commit</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Checkout