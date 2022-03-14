import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet } from '../services/apiService';
import { addProdVisitedToLocal } from '../services/localService';
import InfoProductsList from './infoProductsList';
import { BsCart3} from "react-icons/bs"
import {AppContext} from "../context/shopContext"

function ProductInfo(props){
  const {addToCart } = useContext(AppContext);
  const [product,setProduct] = useState({});
  let params = useParams();
  let nav = useNavigate();
  let location = useLocation();

  useEffect(() => {
    doApi();
  },[location])

  const doApi = async() => {
    let url = API_URL + "/products/single/"+params.id;
    let resp = await doApiGet(url);
     setProduct(resp.data)
    //  save in visited in local
     addProdVisitedToLocal(resp.data.short_id)
  }

  const onAddToCartClick = () => {
    // ...cart_ar - take all cell from the old and add new
    // product
    addToCart(product)
  }

  return(
    <div className='container p-4' style={{minHeight:"85vh"}}>
      <div className="row">
        <div className="col-md-4">
          {/* img-fluid - real width of pics or width 100%  */}
            <img src={product.img_url || "/images/cover.jpg"} alt={product.name} className='img-fluid img-thumbnail shadow' />
        </div>
        <div className="col-md-8">
          <h2 className='display-4'>{product.name}</h2>
          <p><strong>Info:</strong> {product.info}</p>
          <h3>Price: {product.price} </h3>
          <h3>Condition: {product.condition}</h3>
          <h4>Quantity: {product.qty} </h4>
          <button onClick={() => {
            nav(-1);
          }} className='btn btn-dark'>Back</button>
          {product.qty > 0 ? 
          <button onClick={onAddToCartClick} className="btn btn-info ms-2">Add to cart 
          <BsCart3 className="ms-2 mb-1"/>+
          </button> :
           <button  className="btn btn-danger ms-2">SOLD OUT!!!
          
           </button>
          }
        </div>
      </div>
      {product.cat_short_id ? 
      <InfoProductsList cat_short_id={product.cat_short_id} />
      : "" }
    </div> 
  )
}

export default ProductInfo