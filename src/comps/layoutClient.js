import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ClientFooter from './general_comps/clientFooter';
import ClientHeader from './general_comps/clientHeader';
import { AppContext } from "../context/shopContext"
import { toast } from 'react-toastify';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import "./css/client.css"
import "./css/headerFooter.css"
import Cart from './cart_comps/cart';
import { getCartFromLocal, saveCartLocal } from '../services/localService';

function LayoutClient(props) {
  const [favs_ar, setFavsAr] = useState([]);

  // cart global state
  const [cart_ar,setCartAr] = useState([]);
  const [showCart, setShowCart] = useState("none");



  useEffect(() => {
    doFavApi()
    // get cart from local
    setCartAr(getCartFromLocal());
  }, [])

  const updateCart = (_newAr) => {
    setCartAr(_newAr);
    // TODO: add to localstorage
    saveCartLocal(_newAr);
  }

  // add cart , but before check it the item already
  // in the cart
  const addToCart = (_newItem) => {
    let inCart = false;
    cart_ar.map(item => {
      if(item._id == _newItem._id){
        inCart = true;
      }
    })
    // check if not in cart already and add it if not
    if(!inCart){
      updateCart([...cart_ar,_newItem])
    }
    setShowCart("block");
  }

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
    else{
      toast.error("You must be logged in to add to favorite!");
    }
  }

  return (
    <AppContext.Provider value={
      {
        favs_ar,
        addRemoveFav,
        doFavApi,
        showCart,
        setShowCart,
        cart_ar,
        updateCart,
        addToCart
      }
      }>
      <Cart />
      <ClientHeader />
      <Outlet />
      <ClientFooter />
    </AppContext.Provider>
  )
}

export default LayoutClient