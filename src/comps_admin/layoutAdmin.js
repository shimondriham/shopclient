import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderAdmin from './headerAdmin';

function LayoutAdmin(props){
  return(
    <React.Fragment>
      <HeaderAdmin/>
      <Outlet />
    </React.Fragment>
  )
}

export default LayoutAdmin