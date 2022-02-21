import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch, BsCart3} from "react-icons/bs"

import { checkTokenLocal } from '../../services/localService';
import {AppContext} from "../../context/shopContext"

function ClientHeader(props) {
  const {showCart,setShowCart} = useContext(AppContext)
  let [login,setLogin] = useState("");
  let inputRef = useRef()
  let location = useLocation();
  let nav = useNavigate()

  useEffect(() => {
    setLogin(checkTokenLocal())
  },[location])

  // work on every key click on the keyboard
  const onKeyboardClick = (e) => {
    // check if we click Enter 
    if(e.key == "Enter"){
      onSearchClick();
    }
  }

  const onSearchClick = () => {
    let input_val = inputRef.current.value;
    nav("/productsSearch?s="+input_val);
  }


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
                <Link to="/products_favs">Favorites</Link>
              </div>
              <div className='search_header d-flex'>
                <input onKeyDown={onKeyboardClick} ref={inputRef} placeholder='search...' type="text" className='form-control' />
                <button onClick={onSearchClick} className='btn'><BsSearch className='icon1' /></button>
               {/* cart button */}
                <button onClick={() => { showCart === "none" ? setShowCart("block") : setShowCart("none")}} className='btn'><BsCart3 className='icon1' /></button>
              </div>

              <div className='log_in_out'>
                {login ?
                  <Link to="/logout" className='text-danger'>Log out</Link>
                  :
                  <React.Fragment>
                    <Link to="/login">Log in</Link>/
                    <Link to="/signup">Sign up</Link>
                  </React.Fragment>
                }
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default ClientHeader