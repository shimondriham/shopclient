import React from 'react';
import HomeStrip from './homeStrip';
import "./css/home.css"
import HomeCategoryList from './homeCategoryList';
import ProductsHome from './productHome';

function Home(props){
  return(
    <React.Fragment>
      <HomeStrip />
      <HomeCategoryList/>
      <ProductsHome/>
    </React.Fragment> 
  )
}

export default Home