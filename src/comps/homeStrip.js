import React from 'react';

function HomeStrip(props){
  return(
    <div style={{backgroundImage:"url(https://images.unsplash.com/photo-1593277992013-05e17a5f417d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)"}} className='strip_home container-fluid d-flex align-items-center'>
 {/* <div style={{backgroundImage:"url(https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)"}} className='strip_home container-fluid d-flex align-items-center'> */}
      <div className="container text-center">
        <h3 className='h1'>Welcome to The gaming world!</h3>
        <h5>Shop that you can find everthing about gaming</h5>
      </div>
    </div> 
  )
}

export default HomeStrip