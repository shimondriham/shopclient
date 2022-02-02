import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL, doApiGet } from '../services/apiService';
import ProducItem from './productItem';

function ProductsListPage(props){
  const [ar,setAr] = useState([])

  let params = useParams();

  useEffect(() => {
    doApi();
  },[]);

  const doApi = async() => {

    // קודם כל אוסף מידע על הקטגוריה לפי היו אר אל שלה
    // כדי שיהיה לי את האיי די המקוצר להביא את כל המוצרים
    let urlCategory = API_URL+"/categories/single/"+params.cat_url;
    let resp1 = await doApiGet(urlCategory);
    // console.log(resp1.data);
    let short_id = resp1.data?.short_id;
    
    let urlProds = API_URL + "/products/?perPage=8&cat="+short_id;
    let resp2 = await doApiGet(urlProds)
    // console.log(resp2.data);

    setAr(resp2.data)
    
  }
// TODO: ADD PAGENATION
  return(
    <div className='container-fluid' style={{minHeight:"85vh"}}>
      <div className="container">
        <h1 className='text-center'>Categories of {params.cat_url}</h1>
        {ar.length == 0 ? <h2>Loading...</h2> : ""}
        <div className="row">
        {ar.map(item => {
          return(
            <ProducItem key={item._id} item={item} />
          )
        })}
      </div>
      </div>
    </div> 
  )
}

export default ProductsListPage