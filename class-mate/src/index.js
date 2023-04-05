import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Header,
  Footer,
  Home,
  Info,
  Creator,
  Order,
  Enter,
  Confirm,
  Display,
} from "./modules/Layout";

ReactDOM.render(
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info" element={<Info />} />
      <Route path="/creator" element={<Creator />} />
      <Route path="/order" element={<Order />} />
      <Route path="/Enter" element={<Enter />} />
      <Route path="/confirm" element={<Confirm />} />
      <Route path="/display" element={<Display />} />
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

// serviceWorker.unregister();
