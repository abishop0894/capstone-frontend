import { Route, BrowserRouter, Routes } from "react-router-dom";
import React, { useState, useContext, createContext, useEffect } from "react";
import "./App.css";
import AllData from "./alldata";
import Balance from "./balance";
import Login from "./login";
import NavBar from "./navbar";
import Home from "./home";
import CreateAccount from "./createaccount";
import Deposit from "./deposit";
import Withdraw from "./withdraw";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <div>
        {" "}
        <NavBar />
        <div className="container" style={{ padding: "20px" }}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/CreateAccount/" element={<CreateAccount />} />
              <Route path="/login/" element={<Login />} />
              <Route path="/deposit/" element={<Deposit />} />
              <Route path="/withdraw/" element={<Withdraw />} />
              {/* <Route path="/transactions/" component={Transactions} /> */}
              <Route path="/balance/" element={<Balance />} />
              <Route path="/alldata/" element={<AllData />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
