import Card from "./context";
import Toast from "react-bootstrap/Toast";
import React, { useState } from "react";

function Login() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  return (
    <Card
      bgcolor="secondary"
      header={show ? "Login" : "Your Account"}
      status={status}
      body={
        show ? (
          <LoginForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <LoginMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function LoginMsg(props) {
  return (
    <>
      <Toast>
        <Toast.Header>Success</Toast.Header>
        <Toast.Body>
          <button
            type="submit"
            className="btn btn-light"
            onClick={async () => {
              alert("Logged out");
              props.setShow(true);
            }}
          >
            <h2>Log Out</h2>
          </button>
        </Toast.Body>
      </Toast>
    </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function Handle(e) {
    e.preventDefault();
    fetch(
      `https://albisproject.herokuapp.com/account/login/${email}/${password}`
    )
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          props.setStatus("");
          props.setShow(false);
          console.log("JSON:", data);
          console.log(data.balance);
          console.log(data.name);
          alert(`Logged in as ${data.name}`);
          if (data.balance < 0) {
            alert(
              "Your account is overdrafted. Please deposit funds as soon as possible to avoid fees."
            );
          }
        } catch (err) {
          props.setStatus("Incorrect Login");
          console.log("err:", text);
          return;
        }
      });
  }

  return (
    <>
      Email
      <br />
      <form onSubmit={Handle}>
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
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <br />
        <button type="submit" className="btn btn-light">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
