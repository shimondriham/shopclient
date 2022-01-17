import React from 'react';
import {useForm} from "react-hook-form"

function LoginAdmin(props){
  let {register , handleSubmit ,  formState: { errors } } = useForm();

  const onSubForm = (data) => {
    console.log(data);
  }

  let emailRef = register("email",{
    required:true,  
    pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  })
 
  let passwordRef =  register("password",{required:true, minLength:3}) ;

  return(
    <div className='container'>
      <h1>Login to system</h1>
      <form onSubmit={handleSubmit(onSubForm)} className='col-md-6 p-3 border'>
        <label>Email:</label>
        <input {...emailRef} type="text" className='form-control' />
        {errors.email ? <small className='text-danger d-block'>Email invalid</small> : ""}
        <label>Password:</label>
        <input {...passwordRef} type="text" className='form-control' />
        {errors.password ? <small className='text-danger d-block'>Enter valid password min 3 chars</small> : ""}
        <button className='btn btn-info mt-4'>Login</button>
      </form>  
    </div> 
  )
}

export default LoginAdmin