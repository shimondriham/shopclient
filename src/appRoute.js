import React from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Home from './comps/home';
import LayoutClient from './comps/layoutClient';
import AddProduct from './comps_admin/addProduct';
import EditProduct from './comps_admin/editProduct';
import LayoutAdmin from './comps_admin/layoutAdmin';
import LoginAdmin from './comps_admin/loginAdmin';
import ProductsAdminList from './comps_admin/productsAdminList';
function AppRoute(props){
  return(
    <Router>
      <Routes>
        {/* for admin user */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<LoginAdmin />}/>
          <Route path="/admin/products" element={<ProductsAdminList />}/>
          <Route path="/admin/addProduct" element={<AddProduct />}/>
          <Route path="/admin/editProduct/:id" element={<EditProduct />}/>
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