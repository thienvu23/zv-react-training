import "./Main.css";
import React from "react";
import { AppRouter, PATH_CHILD, PATH_ROOT } from "../../routes/main";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout, getProfile } from "../../redux/actions/auth";
import { selectorUserCharName } from "../../redux/reducers/auth";

import Logo from "../../zigvy-logo.jpg";

const routes = [
  {
    path: PATH_CHILD.home,
    title: "Home",
  },
  {
    path: PATH_CHILD.users,
    title: "Users",
  },
  {
    path: PATH_CHILD.profile,
    title: "My info",
  },
];

function Main() {
  const charName = useSelector(selectorUserCharName);
  const userProfile = useSelector((state) => state.auth.userInfo);
  const isAuth = !!useSelector((state) => state.auth.token);
  const loadingAuth = useSelector((state) => state.auth.loading);

  const history = useHistory();
  const dispatch = useDispatch();

  const onPressProfile = () => history.push(PATH_CHILD.profile);

  React.useEffect(() => {
    isAuth ? dispatch(getProfile()) : history.push("login");
  }, [isAuth]);

  const onLogout = () => {
    dispatch(logout());
    history.replace("/login");
  };

  return (
    <div className="Main">
      <header className="header">
        <img className="logo" src={Logo} />
        <span className="name-company">Zigvy Company</span>
        <div className="user">
          <h5 className="short-name-user">{charName ?? "😃"}</h5>
          <div className="user-menu">
            <span onClick={onPressProfile} className="menu-item">
              {userProfile?.fullName}
            </span>
            <div className="white-space" />
            <span onClick={onLogout} className="menu-item">
              Logout
            </span>
          </div>
        </div>
      </header>
      <div className="nav-container">
        <div className="nav-menu">
          <ul className="nav-menu-list">
            {routes.map((route) => {
              return (
                <React.Fragment key={route.path}>
                  <li className={`nav-menu-item`}>
                    <NavLink
                      activeStyle={{ fontWeight: 700 }}
                      to={route.path}
                      className="nav-menu-link"
                    >
                      {route.title}
                    </NavLink>
                  </li>
                  <div className="white-space" />
                </React.Fragment>
              );
            })}
          </ul>
        </div>
        <div className="nav-route">
          <AppRouter />
        </div>
      </div>
      <footer className="footer">
        <span className="footer-text">Zigvy Corp</span>
        <span className="footer-text-copy-right">Copy right 2021</span>
      </footer>
      {loadingAuth && (
        <div className="loading-view">
          <div className="loader" />
        </div>
      )}
    </div>
  );
}

export default Main;
