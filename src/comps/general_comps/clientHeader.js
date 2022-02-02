import React from 'react';
import { Link } from 'react-router-dom';
import { BsSearch } from "react-icons/bs"

function ClientHeader(props) {
  return (
    <header className='shadow header-client container-fluid'>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className='logo col-md-auto'>
            <Link to="/">
              <h2>Koko makolet</h2>
            </Link>
          </div>
          <nav className='col-md-auto'>
            <div className='d-md-flex align-items-center'>
              <div className='links_header me-md-3'>
                <Link to="/">Home</Link>
                <Link to="#">Carts</Link>
                <Link to="#">Favorites</Link>
              </div>
              <div className='search_header d-flex'>
                <input placeholder='search...' type="text" className='form-control' />
                <button className='btn'><BsSearch className='icon1' /></button>
              </div>
              <div className='log_in_out'>
                <Link to="#">Log in</Link>/
                <Link to="#">Sign up</Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default ClientHeader