import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import Private from './components/Routes/Private';
import Dashboard from './pages/user/Dashboard';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import UpdateProduct from './pages/admin/UpdateProduct';
import Users from './pages/admin/Users';
import Products from './pages/admin/Products';
import AdminOrders from './pages/admin/AdminOrders';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Login from './pages/Auth/Login';
import Pagenotfound from './pages/Pagenotfound';
import Authprovider from './Context/Authprovider';
import { CartProvider } from './Context/CartProvider';

function App() {

  return (
    <>
      <Authprovider>
        <CartProvider>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/search' exact element={<Search />} />
            <Route path='/product/:slug' exact element={<ProductDetails />} />
            <Route path='/cart' exact element={<CartPage />} />
            <Route path='/categories' exact element={<Categories />} />
            <Route path='/category/:slug' exact element={<CategoryProduct />} />
            <Route path='/dashboard' element={<Private />}>
              <Route path='user' element={<Dashboard />} />
              <Route path='user/orders' element={<Orders />} />
              <Route path='user/profile' element={<Profile />} />
            </Route>
            <Route path='/dashboard' element={<AdminRoute />}>
              <Route path='admin' element={<AdminDashboard />} />
              <Route path='admin/create-category' element={<CreateCategory />} />
              <Route path='admin/create-product' element={<CreateProduct />} />
              <Route path='admin/product/:slug' element={<UpdateProduct />} />
              <Route path='admin/users' element={<Users />} />
              <Route path='admin/products' element={<Products />} />
              <Route path='admin/orders' element={<AdminOrders/>} />
            </Route>
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/policy' element={<Policy />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Pagenotfound />} />
          </Routes>
        </CartProvider>
      </Authprovider>
    </>
  )
}

export default App
