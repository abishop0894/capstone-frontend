import Card from "./context";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

function Deposit() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={
        show ? (
          <DepositForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <DepositMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function DepositMsg(props) {
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
        Deposit again
      </button>
    </>
  );
}

function DepositForm(props) {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  function handle(e) {
    e.preventDefault();
    fetch(
      `https://albisproject.herokuapp.com/account/update/${email}/${amount}`
    )
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus(`New Balance: $${JSON.stringify(data.balance)}`);
          props.setShow(false);
          console.log("JSON:", data);
        } catch (err) {
          props.setStatus("Error. Please try again.");
          console.log("err:", text);
        }
      });
  }

  return (
    <div>
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
            Deposit
          </button>
        </form>
      </>
    </div>
  );
}

export default Deposit;
