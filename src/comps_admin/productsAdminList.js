import React, { useEffect, useState } from 'react';
import AuthAdminComp from '../misc_comps/authAdminComp';
import { API_URL, doApiGet } from '../services/apiService';

function ProductsAdminList(props){
  let [ar,setAr] = useState([]);

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    // get the product list from server api
    let url = API_URL + "/products";
    try{
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr(resp.data);
    }
    catch(err){
      alert("there problem come back later")
      if(err.response){
        console.log(err.response.data)
      }
    }

  }

  return(
    <div className='container'>
      <AuthAdminComp/>
      <h1>List of products in system</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>price</th>
            <th>qty</th>
            <th>category</th>
            <th>condtion</th>
            <th>short_id</th>
            <th>del/edit</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            return(
              <tr key={item._id}>
                <td>{i+1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.qty}</td>
                <td>{item.cat_short_id}</td>
                <td>{item.condition}</td>
                <td>{item.short_id}</td>
                <td>
                  <button className='badge mx-1 bg-danger'>X</button>
                  <button className='badge bg-info'>Edit</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div> 
  )
}

export default ProductsAdminList