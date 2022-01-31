import React from 'react';
import { Outlet } from 'react-router-dom';
import "./css/client.css"

function LayoutClient(props){
  return(
    <React.Fragment>
      <Outlet />
    </React.Fragment> 
  )
}

export default LayoutClient