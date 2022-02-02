import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, doApiGet } from '../services/apiService';


function HomeCategoryList(props) {
  const [ar, setAr] = useState([]);

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    let url = API_URL + "/categories";
    let resp = await doApiGet(url);
    console.log(resp.data);
    setAr(resp.data);
  }



  return (
    <div className='container-fluid shadow'>
      <div className='container py-4 categories_list'>
        <h2 className='text-center'>Choose category of products you want to buy:</h2>
        <div className="row">
          {ar.map(item => {
            return (
              <Link to={"/products/"+item.url_name} key={item._id} className='myCard col-md-4 p-3'>
                <div className="shadow  bg-dark text-white">
                  {/* check if there bg image  */}

                  <div style={{ backgroundImage: `url(${item.img_url || "/images/cover.jpg"})` }} className='img_card'></div>
                  {/* TODO:Add link */}
                    
                  <h3 className='p-2'>{item.name}</h3>
                </div>
              </Link>)
          })}
        </div>
      </div>
    </div>
  )
}

export default HomeCategoryList