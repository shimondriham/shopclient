import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from 'react-router-dom';
import AuthAdminComp from '../misc_comps/authAdminComp';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService'

function EditCategory(props){
  let [category,setCategory] = useState({})
   // for disabled the send btn for avoid multi click on him
   let [btnSend,setBtnSend] = useState(false)
   let params = useParams();
 
   let nav = useNavigate()
   let { register, handleSubmit, formState: { errors } } = useForm();
 
   let nameRef = register("name", { required: true, minLength: 2, maxLength: 150 })
   let url_nameRef = register("url_name", { required: true, minLength: 2, maxLength: 500 })
  
  useEffect(()=> {
    doApi();
  },[])

  const doApi = async() => {
    let urlProduct = API_URL+"/categories/single/"+params.url_name;
    let resp2 = await doApiGet(urlProduct);
    console.log(resp2.data)
    setCategory(resp2.data);
  }

   const onSubForm = (formData) => {
     // console.log(formData);
    //  setBtnSend(true);
     doFormApi(formData);
   }
 
   const doFormApi = async (formData) => {
     let url = API_URL + "/categories/"+category._id;
     try {
       let resp = await doApiMethod(url, "PUT", formData);
       // console.log(resp.data);
       if (resp.data.modifiedCount) {
         alert("Category updated");
         // back to the list of products in the admin panel
         nav("/admin/categories")
       }
       else{
         alert("you not change nothing")
       }
     }
     catch (err) {
       console.log(err.response);
       alert("There problem try again later")
       nav("/admin/categories")
     }
   }
 
   return (
     <div className='container'>
       <AuthAdminComp />
       <h1>Edit product</h1>
       {(category._id) ? 
       <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-3 shadow'>
         <label>Name:</label>
         <input defaultValue={category.name} {...nameRef} type="text" className='form-control' />
         {errors.name ? <small className='text-danger d-block'>* Enter valid name 2 to 99 chars</small> : ""}

         <label>url name:</label>
         <input defaultValue={category.url_name} {...url_nameRef} type="text"  className='form-control' />
         {errors.url_name ? <small className='text-danger d-block'>* Enter valid url name, between 1 to 500 chars</small> : ""}
 
         {/* disable-> if true user cant click */}
         <button className='mt-4 btn btn-warning' disabled={btnSend}>update category</button>
       </form> : <h2>Loading...</h2> }
     </div>
   )
}

export default EditCategory