import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = React.lazy(() => import('./pages/Home'))
const Register = React.lazy(() => import('./components/Register'));
const Login = React.lazy(() => import('./components/Login'));
import Header from './components/Header'
import Loading from './components/Loading'
import ErrorPage from "./components/ErrorPage";
const Cart = React.lazy(() => import('./pages/Cart'))
const MoreProduct = React.lazy(() => import('./pages/MoreProduct'))
import Checkout from "./pages/Checkout";
// Admin routes importing
const Order = React.lazy(() => import('./pages/manage/Order'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const ProductManage = React.lazy(() => import('./pages/manage/ProductManage'))
const Watch = React.lazy(() => import('./pages/app/Watch'))
const UserComments = React.lazy(() => import('./pages/app/UserComment'))
const ProductAllData = React.lazy(() => import('./pages/ProductAllData'))

// styles component
import './styles/home.scss'
import './styles/header.scss'
import './styles/dashboard.scss'
import './styles/upload.scss'
import './styles/loading.scss'
import './styles/manage.scss'
import './styles/cart.scss'
import './styles/comment.scss'
import './styles/register.scss'
import './styles/moreProduct.scss'
import './styles/allproduct.scss'
import './styles/checkout.scss'
import './styles/order.scss'


// protected route
import { ProtectRoute } from './ProtectedRoute/ProtectRoute'


const App = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, [])

  return (
    <div>
      <Router>
        <Header />
        <Suspense fallback={<Loading />}>
          {loading ? (
            <Loading />
          ) : (

            <>
              <Routes>
                <Route path="/" element={
                  <ProtectRoute>
                    <Home />
                  </ProtectRoute>
                } />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={
                  <ProtectRoute>
                    <Cart />
                  </ProtectRoute>
                } />

                <Route path="/more" element={
                  <ProtectRoute>
                    <MoreProduct />
                  </ProtectRoute>
                } />

                <Route path="/order" element={
                  <ProtectRoute>
                    <Order />
                  </ProtectRoute>
                } />

                {/* Admin routes Imported  */}
                <Route path="/dashboard" element={
                  <ProtectRoute>
                    <Dashboard />
                  </ProtectRoute>
                } />


                <Route path="/manage" element={
                  <ProductManage />
                } />

                <Route path="/watch" element={
                  <Watch />
                } />

                <Route path="/comment" element={
                  <UserComments />
                } />

                <Route path="/allproduct/:id" element={
                  <ProductAllData />
                } />

                <Route path="/checkout" element={
                  <Checkout />
                } />

                <Route path="*" element={<ErrorPage />} />
              </Routes>
              <ToastContainer />
            </>
          )}
        </Suspense>
      </Router>
    </div>
  )
}

export default App