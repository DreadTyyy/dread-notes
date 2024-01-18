import React from "react";
import useInput from "../hooks/useInput";
import { register } from "../utils/network-data";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [userName, onUserNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChage] = useInput("");
  const [password2, onPassword2Chage] = useInput("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Password yang anda masukkan tidak sesuai!");
    } else {
      register({ name: userName, email, password }).then(({ error }) => {
        if (!error) {
          navigate("/");
        }
      });
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">Welcome To Dread Notes</h1>
      <p className="text-xl font-normal pb-4">Silahkan registrasi akun anda.</p>
      <form className="flex gap-4 flex-col" onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-2 text-lg">
          <label htmlFor="userName">Nama</label>
          <input
            value={userName}
            onChange={onUserNameChange}
            type="userName"
            name="userName"
            id="userName"
            placeholder="Your name..."
            className="p-2 rounded-md text-black"
            required
          />
        </div>
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
            placeholder="Password"
            className="p-2 rounded-md text-black"
            minLength={6}
            required
          />
        </div>
        <div className="flex flex-col gap-2 text-lg">
          <label htmlFor="password">Confirm Password</label>
          <input
            value={password2}
            onChange={onPassword2Chage}
            type="password"
            name="password2"
            id="password2"
            placeholder="Confirm password"
            className="p-2 rounded-md text-black"
            minLength={6}
            required
          />
        </div>
        <button className="p-2 border rounded-md mb-4">Register</button>
      </form>
      <p>
        Sudah punya akun?{" "}
        <Link to={"/"} className="underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
