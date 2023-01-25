import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllProducts from "../components/Products/AllProducts";
import SingleProduct from "../components/Products/SingleProduct";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";

function NewRoutes() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default NewRoutes;
