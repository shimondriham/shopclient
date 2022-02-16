import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteToken } from '../../services/localService';
import {AppContext} from "../../context/shopContext"

function LogoutClient(props){
  const {doFavApi} = useContext(AppContext)
  let nav = useNavigate();

  useEffect(() => {
    // Logout the user from system and send him to home page
    deleteToken();
    toast.info("You logged out from system , see you soon!")
    nav("/");
    doFavApi();
  },[])

  return(
    <div></div> 
  )
}

export default LogoutClient