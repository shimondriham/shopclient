 import React,{useEffect, useState} from 'react';
  import { API_URL, doApiGet } from '../services/apiService';
  
  
  function HomeCategoryList(props){
    const [ar,setAr] = useState([]);
  
    useEffect(() => {
      doApi();
    },[])
  
    const doApi = async() => {
      let url = API_URL + "/categories";
      let resp = await doApiGet(url) ;
      console.log(resp.data);
      setAr(resp.data);
    }
    


    return(
      <div className='container py-4 categories_list'>
        <h2 className='text-center'>Choose category of products you want to buy:</h2>
        <div className="row">
          {ar.map(item => {
            return(
            <article key={item._id} className='myCard col-md-4 p-3'>
              <div className="border  bg-dark text-white">
                    <div style={{backgroundImage:`url(${item.img_url||"/images/cover.jpg"})`}} className='img_card'></div>  
                <h3 className='p-2'>{item.name}</h3>
              </div>
            </article>)
          })}
        </div>
      </div> 
    )
  }
  
  export default HomeCategoryList
  

