import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch, BsCart3} from "react-icons/bs"

import { checkTokenLocal } from '../../services/localService';
import {AppContext} from "../../context/shopContext"

function ClientHeader(props) {
  const {showCart,setShowCart} = useContext(AppContext)
  let [login,setLogin] = useState("");
  let [navborger,setnavborger] = useState("none");
  let inputRef = useRef()
  let location = useLocation();
  let nav = useNavigate()

  useEffect(() => {
    setLogin(checkTokenLocal())
  },[location])

  // check if we click Enter
  const onKeyboardClick = (e) => {
    if(e.key == "Enter"){
      onSearchClick();
    }
  }

  // Search button
  const onSearchClick = () => {
    let input_val = inputRef.current.value;
    if(input_val){
       nav("/productsSearch?s="+input_val);
    }
  }

  // Hide and seek button for hamburger
  const onBurgerClick = () => {
    if(navborger=="none")setnavborger("block")
    else setnavborger("none")
  console.log("aaa")
  }


  return (
    <header className='shadow header-client container-fluid'>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className='logo  col-auto'>
            <Link to="/">
            <h2><i   className="fa fa-gamepad " aria-hidden="true"></i></h2>
            </Link>
          </div>
          <div className='d-sm-inline-block d-md-none col-auto '><h2><button onClick={onBurgerClick}><i class="fa fa-bars" aria-hidden="true"></i></button></h2></div>
         {navborger=="block"?
         <div style={{position:"absolute" , top:"62px", background:"rgba(255, 255, 255, 0.856)" , right:"5px", width:"160px" , textAlign:"start" , border: "pink solid 1px"}} className='d-flex d-md-none flex-column align-items-center '>
             <div className='search_header d-flex mt-1'>
                <input style={{width:"100px",height:"30px"}} onKeyDown={onKeyboardClick} ref={inputRef} placeholder='search...' type="text" className='form-control' />
                <button onClick={onSearchClick} className='btn'><BsSearch className='icon1' /></button>
              </div>
              <div className='links_header me-md-3 d-flex flex-column'>
                {/* <Link to="/"><i class="fa fa-home" aria-hidden="true"></i> Home</Link> */}
                <Link to="/checkout"><i class="fa fa-credit-card-alt" aria-hidden="true"></i> Check Out</Link>
                <Link to="/products_favs"><i class="fa fa-star-o" aria-hidden="true"></i> Favorites</Link>
                <Link to="/oldOrders"><i class="fa fa-sort" aria-hidden="true"></i> Old orders</Link>        
              </div>
            
                <button style={{color:"red", textAlign:"start" }}  onClick={() => {showCart === "none" ? setShowCart("block") : setShowCart("none")}} className='btn'><i class="fa fa-shopping-cart" aria-hidden="true"></i> Cart</button>

              <div className='log_in_out'>
                {login ?
                  <Link to="/logout" ><i class="fa fa-sign-out" aria-hidden="true"></i> Log out</Link>
                  :
                  <React.Fragment >
                    <Link style={{color:"red" }} to="/login"><i  class="fa fa-sign-in" aria-hidden="true"></i> Log in</Link>
                    <br/>
                    <Link style={{color:"red"}} to="/signup"><i   class="fa fa-user-plus" aria-hidden="true"></i> Sign up</Link>
                  </React.Fragment>
                }
              </div>
            </div> :""

         } 
          <nav className='d-none d-md-block col-md-auto '>
            <div className='d-md-flex align-items-center'>
              <div className='links_header me-md-3'>
                <Link to="/"><i class="fa fa-home" aria-hidden="true"></i> Home</Link>
                <Link to="/checkout"><i class="fa fa-credit-card-alt" aria-hidden="true"></i> Check Out</Link>
                <Link to="/products_favs"><i class="fa fa-star-o" aria-hidden="true"></i> Favorites</Link>
                <Link to="/oldOrders"><i class="fa fa-sort" aria-hidden="true"></i> Old orders</Link>
           
              </div>
              <div className='search_header d-flex'>
                <input onKeyDown={onKeyboardClick} ref={inputRef} placeholder='search...' type="text" className='form-control' />
                <button onClick={onSearchClick} className='btn'><BsSearch className='icon1' /></button>
               {/* cart button */}
                <button onClick={() => {showCart === "none" ? setShowCart("block") : setShowCart("none")}} className='btn'><BsCart3 className='icon1' /></button>
              </div>

              <div className='log_in_out'>
                {login ?
                  <Link to="/logout" ><i class="fa fa-sign-out" aria-hidden="true"></i> Log out</Link>
                  :
                  <React.Fragment>
                    <Link to="/login"><i class="fa fa-sign-in" aria-hidden="true"></i> Log in</Link>/
                    <Link to="/signup"><i class="fa fa-user-plus" aria-hidden="true"></i> Sign up</Link>
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