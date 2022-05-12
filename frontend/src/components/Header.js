import { Route, Switch, Link } from "react-router-dom";

import logo from "../images/header-logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="лого" />
      <Switch>
        <Route exact path="/signin">
          <div className="login">
            <Link to="/signup">
              <button className="login__button">Регистрация</button>
            </Link>
          </div>
        </Route>
        <Route exact path="/signup">
          <div className="login">
            <Link to="/signin">
              <button className="login__button">Войти</button>
            </Link>
          </div>
        </Route>
        <Route exact path="/">
          <div className="login">
            <div className="login__email">{props.userEmail}</div>
            <button onClick={props.handleLogout} className="login__button">
              Выйти
            </button>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
