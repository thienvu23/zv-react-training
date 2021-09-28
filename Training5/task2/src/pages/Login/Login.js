import React from "react";
import "./Login.css";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { login } from "../../redux/actions/auth";

import { useHistory } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector((state) => state.auth.loading);
  const token = useSelector((state) => state.auth.token);

  const [email, setEmail] = React.useState("john@doe.com");
  const [password, setPassword] = React.useState("zigvy123");

  React.useEffect(() => {
    token && history.push("/app");
  }, [token]);

  const onLogin = () => {
    if (!password) {
      toast.warn("Password is require");
      return;
    }
    if (!email) {
      toast.warn("Email is require");
      return;
    }

    dispatch(
      login({
        email,
        password,
      })
    );
  };

  const onChangeEmail = (e) => setEmail(e.target.value);

  const onChangePassword = (e) => setPassword(e.target.value);

  return (
    <div className="login">
      <h3>Login</h3>
      <div className="from">
        <div className="from__row">
          <label className="from__label">Email</label>
          <input value={email} onChange={onChangeEmail} />
        </div>
        <div className="white-space-large" />
        <div className="from__row">
          <label className="from__label">Password</label>
          <input value={password} onChange={onChangePassword} type="password" />
        </div>
        <div className="white-space" />
        <button onClick={onLogin}>Submit</button>
      </div>
      {loading && (
        <div className="loading-view">
          <div className="loader" />
        </div>
      )}
    </div>
  );
}

export default Login;
