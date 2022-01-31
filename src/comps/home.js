import React from 'react';
import HomeStrip from './homeStrip';
import "./css/home.css"
import HomeCategoryList from './homeCategoryList';

function Home(props){
  return(
    <React.Fragment>
      <HomeStrip />
      <HomeCategoryList/>
    </React.Fragment> 
  )
}

export default Home