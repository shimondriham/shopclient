import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL, doApiGet } from '../services/apiService';
import ProducItem from './productItem';

function SearchProducts(props){
  const [ar,setAr] = useState([]); 
  const [whatSearch,setWhatSearch] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  let location = useLocation();
  
  useEffect(() => {
    setShowLoading(true);
    doApi()
  },[location])

  //?s=
  const doApi = async() => {
    const urlParams = new URLSearchParams(window.location.search);
    let searchQuery = urlParams.get("s") || "";
    setWhatSearch(searchQuery);
    let url = API_URL+"/products/search?s="+searchQuery;
    let resp = await doApiGet(url);
    console.log(resp.data);
    setShowLoading(false);
    setAr(resp.data);
  }

  return(
    <div className='container-fluid pb-4' style={{ minHeight: "85vh" }}>
      <div className="container">
        <h1 className='text-center my-4'>Search for "{whatSearch}":</h1>
        {showLoading ? <h2 className='text-center'>Loading...</h2> : ""}
        {ar.length == 0 && !showLoading ?   <h2 className='text-center'>Search not match, try another query</h2> : ""}
        <div className="row">
          {ar.map(item => {
            return (
              <ProducItem key={item._id} item={item} />
            )
          })}
        </div>
        
      </div>
    </div>
  )
}

export default SearchProducts