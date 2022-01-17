import React from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Home from './comps/home';
import LayoutClient from './comps/layoutClient';
import LayoutAdmin from './comps_admin/layoutAdmin';
import LoginAdmin from './comps_admin/loginAdmin';
function AppRoute(props){
  return(
    <Router>
      <Routes>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<LoginAdmin />}/>
        </Route>
        {/* For regular user client path */}
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home />} />
        </Route> 
      </Routes>
    </Router> 
  )
}

export default AppRoute