import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';

function LogoutAdmin(props){
  let nav = useNavigate();

  useEffect(() => {
    localStorage.removeItem("tok");
    nav("/admin");
  },[])

  return(
    <div>Please wait... you log out.</div> 
  )
}

export default LogoutAdmin