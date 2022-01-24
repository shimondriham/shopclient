import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import AuthAdminComp from '../misc_comps/authAdminComp';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';

function AddProduct(props) {
  let [cat_ar, setCatAr] = useState([]);
  let [btnSend,setBtnSend]= useState(false);

  let nav = useNavigate()
  let { register, handleSubmit, formState: { errors } } = useForm();

  let nameRef = register("name", { required: true, minLength: 2, maxLength: 150 })
  let infoRef = register("info", { required: true, minLength: 2, maxLength: 500 })
  let priceRef = register("price", { required: true, min: 1, max: 999999 })
  let cat_short_idRef = register("cat_short_id", { required: true, minLength: 1, maxLength: 99 })
  let img_urlRef = register("img_url", { required: false, minLength: 3, maxLength: 500 })
  let conditionRef = register("condition", { required: false, minLength: 3, maxLength: 100 })
  let qtyRef = register("qty", { required: true, min: 1, max: 9999 })

  useEffect(() => {
    doApi()
  }, [])

  // get the catgories for select box
  const doApi = async () => {
    let url = API_URL + "/categories";
    let resp = await doApiGet(url);
    console.log(resp.data);
    setCatAr(resp.data);
  }

  const onSubForm = (formData) => {
    // console.log(formData);
    setBtnSend(true)
    doFormApi(formData);
  }

  const doFormApi = async (formData) => {
    let url = API_URL + "/products";
    try {
      let resp = await doApiMethod(url, "POST", formData);
      // console.log(resp.data);
      if (resp.data._id) {
        alert("Product added");
        // back to the list of products in the admin panel
        nav("/admin/products")
      }
    }
    catch (err) {
      console.log(err.response);
      alert("There problem try again later")
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

        <label>Info:</label>
        <textarea {...infoRef} className='form-control' rows="3"></textarea>
        {errors.info ? <small className='text-danger d-block'>* Enter valid info, 3 to 500 chars</small> : ""}

        <label>Price:</label>
        <input {...priceRef} type="number" defaultValue="50" className='form-control' />
        {errors.price ? <small className='text-danger d-block'>* Enter valid  price, between 1 to 999999</small> : ""}

        <label>Qty (amount in the stock):</label>
        <input {...qtyRef} type="number" defaultValue="1" className='form-control' />
        {errors.qty ? <small className='text-danger d-block'>* Enter valid  qty, between 1 to 9999</small> : ""}

        <label>Category:</label>
        <select {...cat_short_idRef}  className='form-select'>
          <option  value="" >Choose Category</option>
          {cat_ar.map(item => {
            return (
              <option key={item._id} value={item.short_id}>{item.name}</option>
            )
          })}
          {/* loop from api of category */}
        </select>
        {errors.cat_short_id ? <small className='text-danger d-block'>You must choose category from the list </small> : ""}

        <label>Img url:</label>
        <input {...img_urlRef} type="text" className='form-control' />
        {errors.img_url ? <small className='text-danger d-block'>* Enter valid  img url </small> : ""}

        <label>Condition:</label>
        <select  {...conditionRef} className='form-select'>
          <option value="new">Brand New</option>
          <option value="like new">Like New</option>
          <option value="used">Used</option>
          <option value="broken">Broken</option>
        </select>
        <button  disabled={btnSend} className='btn btn-info my-2'>Add new product</button>
      </form>
    </div>
  )
}

export default AddProduct