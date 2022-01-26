import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HeaderAdmin(props){
  let nav = useNavigate()

  const onLogOutClick = () => {
    if(window.confirm("Are you sure you want to logout?")){
      nav("/admin/logout");
    }
  }

  return(
    <div className='header_admin container-fluid bg-dark d-flex align-items-center'>
      <h2 className='text-white col-auto me-4'>Admin panel</h2>
      <nav className='col-md-9'>
        <Link to="/admin/products" >Products</Link>
        <Link to="/admin/categories" >Categories</Link>
        <Link to="/admin/users" >Users</Link>

        {/* we cant do nav command to Link comp */}
        <button onClick={onLogOutClick} className='badge bg-danger float-md-end '>Log out</button>
      </nav>
    </div> 
  )
}

export default HeaderAdmin