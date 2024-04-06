import React, { Suspense } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./AllRoutes/Dashboard";
import "./App.css";
import SignIn from "./AuthRoutes/SignIn";
import SignUp from "./AuthRoutes/SignUp";
import Layout from "../src/Components/Layout/Layout";
import { commonservices } from "./Services/CommonServices";
import ProductDetails from './AllRoutes/Products/ProductDetails'
import ViewCart from './AllRoutes/Cart/ViewCart'
import Checkout from './AllRoutes/Cart/Checkout'

function App() {
  const token = commonservices.getItem("Token");
  const is_logged = token ? true : false;

  console.log('====================================');
  console.log('prakash 6-4-24');
  console.log('====================================');
  

  const allRoute = () => {
    return (
      <>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={"Loader..."}>
                <Dashboard />
              </Suspense>
            }
          ></Route>
          <Route
            path="/product_details/:id"
            element={
              <Suspense fallback={"Loader..."}>
                <ProductDetails />
              </Suspense>
            }
          ></Route>
          <Route
            path="/viewcart"
            element={
              <Suspense fallback={"Loader..."}>
                <ViewCart />
              </Suspense>
            }
          ></Route>
          <Route
            path="/checkout"
            element={
              <Suspense fallback={"Loader..."}>
                <Checkout />
              </Suspense>
            }
          ></Route>
          <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        </Route>
      </>
    );
  };

  const authRoute = () => {
    return (
      <>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </>
    );
  };

  return (
    <>
      <ToastContainer
        // theme="colored"
        containerId="an id"
        draggable={false}
        pauseOnFocusLoss={false}
        autoClose={3000}
      />
      <Router>
        {/* <Routes>{is_logged ? allRoute() : authRoute() }</Routes> */}
        <Routes>{allRoute()}</Routes>
        {/* <Routes>{allRoute()}</Routes> */}
      </Router>
    </>
  );
}

export default App;
