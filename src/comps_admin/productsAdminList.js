import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthAdminComp from '../misc_comps/authAdminComp';
import PageLinks from '../misc_comps/pageLinks';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';




function ProductsAdminList(props){
  let [ar,setAr] = useState([]);
  let [numPage,setPageNum] = useState(1);
  let [catObj,setCatObj] = useState({})
  let nav = useNavigate();
  let location = useLocation()
  
  useEffect(() => { 
    doApi();
  },[location])

  const doApi = async() => {

    try{
      let url0 = API_URL + "/categories";
      let resp0 = await doApiGet(url0);
      let temp_ar = resp0.data;
      let categories_data = {};
      temp_ar.forEach(item => {
        categories_data[item.short_id] = item.name;
      })
      setCatObj(categories_data)

      const urlParams = new URLSearchParams(window.location.search);
      let pageQuery = urlParams.get("page") || 1;
      setPageNum(pageQuery)
      let url = API_URL + "/products?page="+pageQuery;
      let resp = await doApiGet(url);
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
      <PageLinks perPage="5" apiUrlAmount={API_URL+"/products/amount"} urlLinkTo={"/admin/products"} clsCss="btn btn-info me-1" />
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
                <td>{(i+1) + 5 * (numPage-1) }</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.qty}</td>
                <td>{catObj[item.cat_short_id]}</td>
                <td>{item.condition}</td>
                <td>{item.short_id}</td>
                <td>
                  <button onClick={() => {delProduct(item._id)}} className='badge bg-danger mx-1'>X</button>
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