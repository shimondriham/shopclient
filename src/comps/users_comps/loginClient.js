import React from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../../services/apiService';

function LogInClient(props){
  let nav = useNavigate()
  let { register, handleSubmit, formState: { errors } } = useForm();

  const onSubForm = (data) => {
    // data = the inputs in the form with ref in 1 object
    console.log(data);
    doApi(data)
  }
  const doApi = async (_dataBody) => {
    let url = API_URL + "/users/";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      if (resp.data._id) {
        toast.success("You sign up");
        // TODO: nav to login
      }
    }
    catch(err){
      if(err.response.data.code == 11000){
          toast.error("Email already in system , try log in")
      }
      else{
        alert("There problem , try come back later")
      }
      // if(err.responose.code == 11000){
      // }
      // console.log(err)
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
     
      <label>* Email:</label>
      <input {...emailRef} type="text" className='form-control' />
      {errors.email ? <small className='text-danger d-block'>* Email invalid</small> : ""}
      <label>* Password:</label>
      <input {...passwordRef} type="text" className='form-control' />
      {errors.password ? <small className='text-danger d-block'>* Enter valid password, min 3 chars</small> : ""}
      

      <button className='btn btn-success mt-5'>Log in</button>
    </form>
  </div> 
  )
}

export default LogInClient