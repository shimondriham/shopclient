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
      <h2 className=' col-auto me-4' style={{color:"pink"}}>Admin panel</h2>
      <nav className='col-md-9'>
        <Link to="/admin/products" ><i class="fa fa-gamepad" aria-hidden="true"></i> Products</Link>
        <Link to="/admin/categories" ><i class="fa fa-bars" aria-hidden="true"></i> Categories</Link>
        <Link to="/admin/users" ><i class="fa fa-users" aria-hidden="true"></i> Users</Link>
        <Link to="/admin/checkout" ><i class="fa fa-credit-card-alt" aria-hidden="true"></i> Checkout</Link>

        {/* we cant do nav command to Link comp */}
        {localStorage["tok"] ? 
        <button onClick={onLogOutClick} className='badge bg-danger float-md-end '><i class="fa fa-sign-out" aria-hidden="true"></i> Log out</button> : "" }
      </nav>
    </div> 
  )
}

export default HeaderAdmin