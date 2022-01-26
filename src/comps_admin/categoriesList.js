import React, { useEffect , useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthAdminComp from '../misc_comps/authAdminComp';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';

function CategoriesList(props){
  let [ar,setAr] = useState([]);
  let nav = useNavigate()

  useEffect(() => {
    doApi()
  },[])

  const doApi = async() =>{
    let url = API_URL + "/categories";
    try{
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

  const delCategory = async(_idDel) => {
    if(window.confirm("Are you sure you want to delete?")){
      try{
        let url = API_URL+"/categories/"+_idDel;
        let resp = await doApiMethod(url,"DELETE",{});
        console.log(resp.data);
        if(resp.data.deletedCount){
          toast.info("Category delted !");
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
      <h1>List of Categoires in system</h1>
      <Link className='btn btn-success' to="/admin/addcategory">Add new Category</Link>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>url_name</th>
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
                <td>{item.url_name}</td>
                <td>{item.short_id}</td>
        
                <td>
                  <button onClick={() => {delCategory(item._id)}} className='badge bg-danger'>X</button>
                  <button onClick={() => {
                    nav("/admin/editCategory/"+item.url_name)
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

export default CategoriesList;