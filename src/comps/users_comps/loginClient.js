import React, { useContext } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../../services/apiService';
import { saveTokenLocal } from '../../services/localService';
import {AppContext} from "../../context/shopContext"

function LogInClient(props){
  const {doFavApi} = useContext(AppContext)

  let nav = useNavigate()
  let { register, handleSubmit, formState: { errors } } = useForm();

  const onSubForm = (data) => {
    doApi(data)
  }
  const doApi = async (_dataBody) => {
    let url = API_URL + "/users/login";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      if (resp.data.token) {
        toast.success("You logged in");
        saveTokenLocal(resp.data.token);
        nav("/");
        doFavApi();
      }
    }
    catch(err){
      
      
      toast.error("User password not match, or there another problem")
      
      
    }
  }

  let emailRef = register("email", {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  })
  
  let passwordRef = register("password", { required: true, minLength: 3 });

  return(
    <div className='container col-md-6 mx-auto my-5'>
    <h1>Login to the store</h1>
    <form onSubmit={handleSubmit(onSubForm)} className='col-12 p-3 border'>
     
      <label><i className="fa fa-envelope" aria-hidden="true"></i> Email:</label>
      <input {...emailRef} type="text" className='form-control' />
      {errors.email ? <small className='text-danger d-block'>* Email invalid</small> : ""}
      <label><i className="fa fa-lock" aria-hidden="true"></i> Password:</label>
      <input {...passwordRef} type="text" className='form-control' />
      {errors.password ? <small className='text-danger d-block'>* Enter valid password, min 3 chars</small> : ""}
      

      <button style={{fontFamily:"cursive"}} className='btn btn-success mt-5 px-4 mx-2'>Log in <i className="fa fa-sign-in mx-1" aria-hidden="true"></i></button>
    </form>
  </div> 
  )
}

export default LogInClient