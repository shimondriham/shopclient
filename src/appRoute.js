import React from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './comps/home';
import LayoutClient from './comps/layoutClient';
import AddCategory from './comps_admin/addCategory';
import AddProduct from './comps_admin/addProduct';
import CategoriesList from './comps_admin/categoriesList';
import EditCategory from './comps_admin/editCategory';
import EditProduct from './comps_admin/editProduct';
import LayoutAdmin from './comps_admin/layoutAdmin';
import LoginAdmin from './comps_admin/loginAdmin';
import LogoutAdmin from './comps_admin/logoutAdmin';
import ProductsAdminList from './comps_admin/productsAdminList';
import UsersList from './comps_admin/usersList';
import ProductsListPage from "./comps/productsListPage";

import 'react-toastify/dist/ReactToastify.css';

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
          <Route path="/admin/categories" element={<CategoriesList />}/>
          <Route path="/admin/editCategory/:url_name" element={<EditCategory />}/>
          <Route path="/admin/addcategory" element={<AddCategory />}/>
          <Route path="/admin/users" element={<UsersList />}/>
          <Route path="/admin/logout" element={<LogoutAdmin />}/>
        </Route>
        {/* For regular user client path */}
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home />} />
          <Route path="/products/:cat_url" element={<ProductsListPage />}  />
        </Route> 
      </Routes>
      {/* theme='colored' make the toast message bg to be red,green... */}
      <ToastContainer position="top-right" theme='colored' />
    </Router> 
  )
}

export default AppRoute