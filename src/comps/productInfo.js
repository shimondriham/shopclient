import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet } from '../services/apiService';
import { addProdVisitedToLocal } from '../services/localService';

function ProductInfo(props){
  const [product,setProduct] = useState({});
  let params = useParams();
  let nav = useNavigate();

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    let url = API_URL + "/products/single/"+params.id;
    let resp = await doApiGet(url);
    console.log(resp.data);
     setProduct(resp.data)
    //  save in visited in local
     addProdVisitedToLocal(resp.data.short_id)
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
          <h3>Price: {product.price} nis</h3>
          <h3>Condition: {product.condition}</h3>
          <h4>Quantity: {product.qty} </h4>
          <button onClick={() => {
            nav(-1);
          }} className='btn btn-dark'>Back</button>
        </div>
      </div>
    </div> 
  )
}

export default ProductInfo