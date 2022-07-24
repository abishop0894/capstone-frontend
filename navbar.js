import React, { useState, useContext, createContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

function NavBar() {
  return (
    <Nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ width: "100%" }}
    >
      <a className="navbar-brand" href="/">
        Bishop Bank
      </a>

      <Nav.Link className="nav-link" href="/CreateAccount/">
        Create Account
      </Nav.Link>

      <Nav.Link className="nav-link" href="/login/">
        Login
      </Nav.Link>

      <Nav.Link className="nav-link" href="/deposit/">
        Deposit
      </Nav.Link>

      <Nav.Link className="nav-link" href="/withdraw/">
        Withdraw
      </Nav.Link>

      <Nav.Link className="nav-link" href="/balance/">
        Balance
      </Nav.Link>

      <Nav.Link className="nav-link" href="/alldata/">
        AllData
      </Nav.Link>
    </Nav>
  );
}

export default NavBar;
