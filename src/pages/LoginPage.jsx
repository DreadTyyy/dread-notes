import React from "react";
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";
import { login } from "../utils/network-data";
import PropTypes from "prop-types";

function LoginPage({ onLogin }) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChage] = useInput("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    login({ email, password }).then(({ data, error }) => {
      if (!error) {
        onLogin(data);
      }
    });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">Welcome To Dread Notes</h1>
      <p className="text-xl font-normal pb-4">
        Silahkan login untuk dapat masuk.
      </p>
      <form className="flex gap-4 flex-col" onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-2 text-lg">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={onEmailChange}
            type="email"
            name="email"
            id="email"
            placeholder="Your Email..."
            className="p-2 rounded-md text-black"
            required
          />
        </div>
        <div className="flex flex-col gap-2 text-lg">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={onPasswordChage}
            type="password"
            name="password"
            id="password"
            placeholder="Password..."
            className="p-2 rounded-md text-black"
            required
          />
        </div>
        <button className="p-2 border rounded-md mb-4">Login</button>
      </form>
      <p>
        Belum punya akun?{" "}
        <Link to={"/register"} className="underline">
          Daftar di sini
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
