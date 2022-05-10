import React from "react";
import AuthForm from "./AuthForm";

function Login(props) {
  return (
    <AuthForm title="Вход" buttonName="Войти" onSubmit={props.handleLogin} />
  );
}

export default Login;
