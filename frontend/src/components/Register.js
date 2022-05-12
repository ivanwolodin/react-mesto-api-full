import React from "react";
import AuthForm from "./AuthForm";

import { Link } from "react-router-dom";

function Register(props) {
  return (
    <AuthForm
      title="Регистрация"
      buttonName="Зарегистрироваться"
      onSubmit={props.handleRegistration}
      children={
        <div className="intro__info">
          <p>
            Уже зарегистрированы?{" "}
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <span className="login__button">Войти</span>
            </Link>
          </p>
        </div>
      }
    />
  );
}

export default Register;
