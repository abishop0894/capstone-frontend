import Card from "./context";
import React, { useState, useContext, createContext, useEffect } from "react";

function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={
        show ? (
          <BalanceForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <BalanceMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
        }}
      >
        Check balance again
      </button>
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState("");

  function handle(e) {
    e.preventDefault();
    fetch(`https://albisproject.herokuapp.com/account/findOne/${email}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus(`Balance: $${data.balance}`);
          props.setShow(false);
          console.log("JSON:", data);
        } catch (err) {
          props.setStatus("Error. Please try again");
          console.log("err:", text);
        }
      });
  }

  return (
    <>
      Email
      <br />
      <form>
        <input
          type="input"
          className="form-control"
          required
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <br />
        <button type="submit" className="btn btn-light" onClick={handle}>
          Check Balance
        </button>
      </form>
    </>
  );
}

export default Balance;
