import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderAdmin from './headerAdmin';
import "./admin.css"

function LayoutAdmin(props){
  return(
    <React.Fragment>
      <HeaderAdmin />
      <Outlet />
    </React.Fragment>
  )
}

export default LayoutAdmin