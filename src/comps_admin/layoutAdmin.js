import React from 'react';
import { Outlet } from 'react-router-dom';

function LayoutAdmin(props){
    return(
        <div>
            <Outlet/>
        </div> 
    )
}

export default LayoutAdmin