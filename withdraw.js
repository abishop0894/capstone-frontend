import React, { useState, useContext, createContext, useEffect } from "react";
import Card from "./context";

function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <WithdrawForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <WithdrawMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function WithdrawMsg(props) {
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
        Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");

  function handle(e) {
    e.preventDefault();
    fetch(
      `https://albisproject.herokuapp.com/account/update/${email}/-${amount}`
    )
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          console.log(data);
          props.setStatus(`New Balance: $${JSON.stringify(data.balance)}`);
          if (data.balance < 0) {
            alert(
              "Your account is overdrafted. Please replinish funds as soon as possible."
            );
          }
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
          required
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <br />
        Amount
        <br />
        <input
          type="number"
          required
          className="form-control"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.currentTarget.value)}
        />
        <br />
        <button type="submit" className="btn btn-light" onClick={handle}>
          Withdraw
        </button>
      </form>
    </>
  );
}

export default Withdraw;
