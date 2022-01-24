import React from 'react';
import { Link } from 'react-router-dom';

function HeaderAdmin(props){
  return(
    <div className='header_admin container-fluid bg-dark d-flex align-items-center'>
      <h2 className='text-white col-auto me-4'>Admin panel</h2>
      <nav className='col-md-9'>
        <Link to="/admin/products" >Products</Link>
        <Link to="/admin/categories" >Categories</Link>
        <Link to="/admin/users" >Users</Link>
      </nav>
    </div> 
  )
}


export default HeaderAdmin

