import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ClientFooter from './general_comps/clientFooter';
import ClientHeader from './general_comps/clientHeader';
import { AppContext } from "../context/shopContext"
import { toast } from 'react-toastify';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import "./css/client.css"
import "./css/headerFooter.css"

function LayoutClient(props) {
  const [favs_ar, setFavsAr] = useState([]);

  useEffect(() => {
    doFavApi()
  }, [])

  // get data and add to global favs_ar state favs of currenct user
  const doFavApi = async () => {
    if (localStorage["tok"]) {
      let url = API_URL + "/favs/"
      try {
        let resp = await doApiGet(url);
        console.log(resp.data);
        if (resp.data.favs_ar) {
          setFavsAr(resp.data.favs_ar);
        }
      }
      catch (err) {
        console.log(err.response)
      }
    }
    else{
      // if user not logged in will erase all favorite in the memory like in log out
      setFavsAr([])
    }
  }
// add or remove from favorites of user
  const addRemoveFav = async(_short_id) => {
    if (localStorage["tok"]) {
      let url = API_URL+"/favs/add_remove/"+_short_id;
      try{
        let resp = await doApiMethod(url,"PATCH",{})
        if(resp.data.modifiedCount){
          // alert("add_remove_fav")
          // call again foo the fo FavApi to update in the ui the new change
          doFavApi()
        }
      }
      catch (err) {
        console.log(err.response)
        toast.info("There error try again later")
      }
    }
  }

  return (
    <AppContext.Provider value={{favs_ar,addRemoveFav,doFavApi}}>
      <ClientHeader />
      <Outlet />
      <ClientFooter />
    </AppContext.Provider>
  )
}

export default LayoutClient