import React from "react";
import { useState } from "react";

function AuthForm(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
      name,
      password,
    });
  }
  function handleChangeEmail(e) {
    const name = e.target.value;
    setName(name);
  }
  function handleChangePassword(e) {
    const password = e.target.value;
    setPassword(password);
  }

  return (
    <form className="intro" onSubmit={handleSubmit}>
      <h1 className="intro__title">{props.title}</h1>
      <input
        className="intro__input"
        onChange={handleChangeEmail}
        type="text"
        placeholder="Email"
        required
        minLength="2"
        maxLength="40"
      />
      <input
        className="intro__input"
        onChange={handleChangePassword}
        type="password"
        placeholder="Пароль"
        required
        minLength="2"
        maxLength="200"
      />
      <button className="intro__button" type="submit">
        {props.buttonName}
      </button>
      {props.children}
    </form>
  );
}

export default AuthForm;
