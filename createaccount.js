import React, { useState, useContext, createContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "./context";

function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <CreateForm setShow={setShow} />
        ) : (
          <CreateMsg setShow={setShow} />
        )
      }
    />
  );
}

function CreateMsg(props) {
  return (
    <>
      <Card>
        <h5>Success</h5>
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => props.setShow(true)}
        >
          Add another account
        </button>
      </Card>
    </>
  );
}

function CreateForm(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function Handle() {
    console.log(name, email, password);
    const url = `https://albisproject.herokuapp.com/account/create/${name}/${email}/${password}`;
    (async () => {
      try {
        var res = await fetch(url);
        var data = await res.text();
        console.log(data);
        props.setShow(false);
      } catch (err) {
        console.log(err);
        alert("Error: User already exists");
      }
    })();
  }

  return (
    <>
      <form onSubmit={Handle}>
        Name
        <br />
        <input
          type="input"
          required
          className="form-control"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <br />
        Email address
        <br />
        <input
          type="email"
          required
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <br />
        Password
        <br />
        <input
          type="password"
          required
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <br />
        <button type="submit" className="btn btn-light">
          Create Account
        </button>
      </form>
    </>
  );
}

export default CreateAccount;
