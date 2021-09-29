import React from "react";
import { Route, Redirect, useHistory, Switch } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { ProfilePage } from "../pages/Profile";
import { UsersPage } from "../pages/Users";

import { useSelector, useDispatch } from "react-redux";

import { setPermissionDeny } from "../redux/actions/auth";

export const PATH_ROOT = "/app";

export const PATH_CHILD = {
  home: PATH_ROOT,
  users: `${PATH_ROOT}/users`,
  profile: `${PATH_ROOT}/profile`,
};

export const AppRouter = () => {
  const permissionDeny = !!useSelector((state) => state.auth.permissionDeny);
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (permissionDeny) {
      history.push(PATH_ROOT);
      dispatch(setPermissionDeny(false));
    }
  }, [permissionDeny]);

  return (
    <Switch>
      <PrivateRoute path={PATH_CHILD.home} exact>
        <HomePage />
      </PrivateRoute>
      <PrivateRoute path={[`${PATH_ROOT}/users/:id`, PATH_CHILD.users]}>
        <UsersPage />
      </PrivateRoute>
      <PrivateRoute path={PATH_CHILD.profile}>
        <ProfilePage />
      </PrivateRoute>
      <PrivateRoute path="*">
        <Redirect to={"/app"} />
      </PrivateRoute>
    </Switch>
  );
};

function PrivateRoute({ children, component, ...rest }) {
  const auth = !!useSelector((state) => state.auth.token);

  return (
    <Route
      {...rest}
      render={() => {
        return auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        );
      }}
    />
  );
}
