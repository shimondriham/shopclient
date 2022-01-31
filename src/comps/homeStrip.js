import React from 'react';

function HomeStrip(props){
  return(
    <div style={{backgroundImage:"url(/images/cover.jpg)"}} className='strip_home container-fluid d-flex align-items-center'>
      <div className="container text-center">
        <h1>Welcome to koko makolet!</h1>
        <h4>Shop that you can find everthing!</h4>
      </div>
    </div> 
  )
}

export default HomeStrip