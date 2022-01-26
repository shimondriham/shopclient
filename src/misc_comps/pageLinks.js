import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react/cjs/react.development';
import { API_URL, doApiGet } from '../services/apiService';

function PageLinks(props){
  const nav = useNavigate();
  const [pages,setPages] = useState(0)

  useEffect(() => {

    doApi()
  },[])

  const doApi = async() => {
    let url = props.apiUrlAmount;
    let resp = await doApiGet(url);
    setPages(Math.ceil(resp.data.amount / props.perPage));
  }


  return(
    <div className='my-3'>
      <span>page: </span>
      {/* [...Array(pages)] - createa array from number var that we can do map/loop on him */}
      {[...Array(pages)].map((item,i) => {
        return(
          <button className={props.clsCss} onClick={() => {
            nav(props.urlLinkTo+"?page="+(i+1))
          }}>{i + 1}</button>
        )
      })}
    </div> 
  )
}

export default PageLinks