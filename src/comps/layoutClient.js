import React from 'react';
import { Outlet } from 'react-router-dom';

function LayoutClient(props){
  return(
    <React.Fragment>
      <Outlet />
    </React.Fragment> 
  )
}

export default LayoutClient