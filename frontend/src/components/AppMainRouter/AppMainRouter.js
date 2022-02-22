import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Client from "../Client/Client";
import Admin from "../Admin/Admin";
import CouponsTable from "../Coupons/Admin/CouponsTable";
import SettingsTable from "../SettingsTable/SettingsTable";
import AdminItemsViewer from "../ItemsViewer/AdminItemsViewer";
import AppOrders from "../AppOrders/AppOrders";
import Login from "../Login/Login";
import ClientItemsViewer from "../ItemsViewer/ClientItemsViewer";
import ClientCart from "../ClientCart/ClientCart";

class AppMainRouter extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />

          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/adminCoupons" element={<><Admin /><CouponsTable/></>} />
          <Route exact path="/adminSettings" element={<><Admin /><SettingsTable/></>} />
          <Route exact path="/adminItems" element={<><Admin /><AdminItemsViewer/></>} />
          <Route exact path="/adminOrders" element={<><Admin /><AppOrders/></>} />

          <Route exact path="/client" element={<Client />} />
          <Route exact path="/clientItems" element={<><Client /><ClientItemsViewer/></>} />
          <Route exact path="/clientOrders" element={<><Client /><AppOrders/></>} />
          <Route exact path="/clientCart" element={<><Client /><ClientCart/></>} />
        </Routes>
      </Router>
    );
  }
}

export default AppMainRouter;
