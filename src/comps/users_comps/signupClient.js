import React from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../../services/apiService';

function SignUpClient(props) {
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
        nav("/login");
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


let nameRef = register("name", { required: true, minLength: 2 });
let emailRef = register("email", {
  required: true,
  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
})

let passwordRef = register("password", { required: true, minLength: 3 });
let addressRef = register("address", { required: false, minLength: 2 });
let phoneRef = register("phone", { required: false, minLength: 9 });


return (
  <div className='container col-md-6 mx-auto my-5'>
    <h1>Sign up to the store</h1>
    <form onSubmit={handleSubmit(onSubForm)} className='col-12 p-3 border'>
      <label><i class="fa fa-user" aria-hidden="true"></i> Name:</label>
      <input {...nameRef} type="text" className='form-control' />
      {errors.name ? <small className='text-danger d-block'>* Enter valid name, min 2 chars</small> : ""}
      <label><i class="fa fa-envelope" aria-hidden="true"></i>  Email:</label>
      <input {...emailRef} type="text" className='form-control' />
      {errors.email ? <small className='text-danger d-block'>* Email invalid</small> : ""}
      <label><i class="fa fa-lock" aria-hidden="true"></i> Password:</label>
      <input {...passwordRef} type="text" className='form-control' />
      {errors.password ? <small className='text-danger d-block'>* Enter valid password, min 3 chars</small> : ""}
      <label><i class="fa fa-address-card-o" aria-hidden="true" ></i> Address:</label>
      <input {...addressRef} type="text" className='form-control' placeholder='not required'/>
      {errors.address ? <small className='text-danger d-block'>* Enter valid address, min 2 chars</small> : ""}
      <label><i class="fa fa-phone-square" aria-hidden="true"></i> Phone:</label>
      <input {...phoneRef} type="text" className='form-control' placeholder='not required'/>
      {errors.phone ? <small className='text-danger d-block'>* Enter valid phone number, min 9 numbers</small> : ""}

      <button className='btn btn-info mt-4'>Sign up <i class="fa fa-sign-in" aria-hidden="true"></i></button>
    </form>
  </div>
)
}

export default SignUpClient