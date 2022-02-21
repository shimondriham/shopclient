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
import ProductInfo from './comps/productInfo';

import 'react-toastify/dist/ReactToastify.css';
import SignUpClient from './comps/users_comps/signupClient';
import LogInClient from './comps/users_comps/loginClient';
import LogoutClient from './comps/users_comps/logoutClient';
import FavsProducts from './comps/users_comps/favsProducts';
import SearchProducts from './comps/searchProducts';
import Page404 from './comps/general_comps/page404';
import CheckoutListAdmin from './comps_admin/checkoutListAdmin';
import CheckoutInfo from './comps_admin/checkoutInfo';

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
          <Route path="/admin/checkout" element={<CheckoutListAdmin />}/>
          <Route path="/admin/checkoutInfo/:id" element={<CheckoutInfo />}/>
        </Route>
        {/* For regular user client path */}
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<Home />} />
          <Route path="/products/:cat_url" element={<ProductsListPage />}  />
          <Route path="/productsSearch/" element={<SearchProducts />}  />
          <Route path="/productInfo/:id" element={<ProductInfo />}  />
          <Route path="/signup" element={<SignUpClient />}  />
          <Route path="/login" element={<LogInClient />}  />
          <Route path="/logout" element={<LogoutClient />}  />
          <Route path="/products_favs" element={<FavsProducts />}  />
         {/* * - for any url that not in another route go to 404 */}
          <Route path="/*" element={<Page404 />} />
        </Route> 
      </Routes>
      {/* theme='colored' make the toast message bg to be red,green... */}
      <ToastContainer position="top-right" theme='colored' />
    </Router> 
  )
}

export default AppRoute