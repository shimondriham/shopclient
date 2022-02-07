import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteToken } from '../../services/localService';

function LogoutClient(props){
  let nav = useNavigate();

  useEffect(() => {
    // Logout the user from system and send him to home page
    deleteToken();
    toast.info("You logged out from system , see you soon!")
    nav("/");
  },[])

  return(
    <div></div> 
  )
}

export default LogoutClient