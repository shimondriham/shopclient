import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { doApiGet } from '../services/apiService';

function PageLinks(props){
  let [pages,setPages] = useState(0)

  useEffect(() => {

    doApi()
  })

  const doApi = async() => {
    let url = props.apiUrlAmount;
    let resp = await doApiGet(url);
    setPages(Math.ceil(resp.data.amount / props.perPage));
  }


  return(
    <div>PageLinks work</div> 
  )
}

export default PageLinks