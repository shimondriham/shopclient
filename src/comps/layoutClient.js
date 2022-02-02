import React from 'react';
import { Outlet } from 'react-router-dom';
import ClientFooter from './general_comps/clientFooter';
import ClientHeader from './general_comps/clientHeader';
import "./css/client.css"
import "./css/headerFooter.css"

function LayoutClient(props){
  return(
    <React.Fragment>
      <ClientHeader />
      <Outlet />
      <ClientFooter />
    </React.Fragment> 
  )
}

export default LayoutClient