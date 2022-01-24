import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import AuthAdminComp from '../misc_comps/authAdminComp';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService'

function AddCategory(props){
  
   // for disabled the send btn for avoid multi click on him
   let [btnSend,setBtnSend] = useState(false)
 
   let nav = useNavigate()
   let { register, handleSubmit, formState: { errors } } = useForm();
 
   let nameRef = register("name", { required: true, minLength: 2, maxLength: 150 })
   let url_nameRef = register("url_name", { required: true, minLength: 2, maxLength: 500 })
 
   const onSubForm = (formData) => {
     // console.log(formData);
     setBtnSend(true);
     doFormApi(formData);
   }
 
   const doFormApi = async (formData) => {
     let url = API_URL + "/categories";
     try {
       let resp = await doApiMethod(url, "POST", formData);
       // console.log(resp.data);
       if (resp.data._id) {
         alert("Category added");
         // back to the list of products in the admin panel
         nav("/admin/categories")
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
       <h1>Add new product</h1>
       <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-3 shadow'>
         <label>Name:</label>
         <input {...nameRef} type="text" className='form-control' />
         {errors.name ? <small className='text-danger d-block'>* Enter valid name 2 to 99 chars</small> : ""}

         <label>url name:</label>
         <input {...url_nameRef} type="text"  className='form-control' />
         {errors.url_name ? <small className='text-danger d-block'>* Enter valid url name, between 1 to 500 chars</small> : ""}
 
         {/* disable-> if true user cant click */}
         <button className='mt-4' disabled={btnSend}>Add new category</button>
       </form>
     </div>
   )
}

export default AddCategory