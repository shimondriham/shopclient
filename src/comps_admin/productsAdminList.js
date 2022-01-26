import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthAdminComp from '../misc_comps/authAdminComp';
import PageLinks from '../misc_comps/pageLinks';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';




function ProductsAdminList(props){
  let [ar,setAr] = useState([]);
  let [catObj,setCatObj] = useState({})
  let nav = useNavigate();
  let location = useLocation();

  useEffect(() => {
    
    doApi();
  },[location])

  const doApi = async() => {
    // get the product list from server api

    try{
      let url0 = API_URL + "/categories";
      let resp0 = await doApiGet(url0);
      console.log(resp0.data);
      let temp_ar = resp0.data;
      // var that will assoiative array with short_id that equal
      // to the category name categories_data["97548"] -> cars
      // we create it in object and not array for save memeory becuase the short id
      // can be 999999 and then the system will create 999999 cells in the memory
      let categories_data = {};
      temp_ar.forEach(item => {
        categories_data[item.short_id] = item.name;
      })
      console.log("cat",categories_data)
      setCatObj(categories_data)
      const urlParams = new URLSearchParams(window.location.search);
      //?page 
      let pageQuery = urlParams.get("page") || 1;
 
      let url = API_URL + "/products?page="+pageQuery;

      let url = API_URL + "/products";
      let resp = await doApiGet(url);
      // console.log(resp.data);
      setAr(resp.data);
    }
    catch(err){
      alert("there problem come back later")
      if(err.response){
        console.log(err.response.data)
      }
    }
  }

  const delProduct = async(_idDel) => {
    if(window.confirm("Are you sure you want to delete?")){
      try{
        let url = API_URL+"/products/"+_idDel;
        let resp = await doApiMethod(url,"DELETE",{});
        console.log(resp.data);
        if(resp.data.deletedCount){
          toast.info("product delted !");
        }
        // for show the new list without the product that we deleted
        doApi();
      }
      catch(err){
        console.log(err.response);
        alert("there problem , try again later")
      }
    }
  }

  return(
    <div className='container'>
      <AuthAdminComp />
      <h1>List of products in system</h1>
      <Link to="/admin/addProduct" className="btn btn-success">Add new product</Link>
      {/* show page buttons */}
      <PageLinks perPage="5" apiUrlAmount={API_URL+"/products/amount"} urlLinkTo={"/admin/products"} />
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
                {/* show the name of category and not its short_id
                look on line 31+
                */}
                <td>{catObj[item.cat_short_id]}</td>
                <td>{item.condition}</td>
                <td>{item.short_id}</td>
                <td>
                  <button onClick={() => {delProduct(item._id)}} className='badge bg-danger'>X</button>
                  <button onClick={() => {
                    nav("/admin/editProduct/"+item._id)
                  }} className='badge bg-info'>Edit</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {ar.length === 0 ? <h2>Loading...</h2> : ""}
    </div> 
  )
}

export default ProductsAdminList