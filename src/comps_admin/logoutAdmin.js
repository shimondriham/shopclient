import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react/cjs/react.development';

function LogoutAdmin(props){
  let nav = useNavigate();

  useEffect(() => {
    localStorage.removeItem("tok");
    toast.info("You log out from system, see you later")
    nav("/admin");
  },[])

  return(
    <div>Please wait... you log out.</div> 
  )
}

export default LogoutAdmin