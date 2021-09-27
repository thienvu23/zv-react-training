import { Route, Redirect } from "react-router-dom";
import { HomePage } from "../component/Home";
import { ProfilePage } from "../component/Profile";
import { UsersPage } from "../component/Users";

import { useSelector } from "react-redux";

const PATH_ROOT = "/app";
export const AppRouter = () => {
  return (
    <>
      <PrivateRoute path={["/", PATH_ROOT, `${PATH_ROOT}/home`]} exact>
        <HomePage />
      </PrivateRoute>
      <PrivateRoute path={[`${PATH_ROOT}/users/:id`, `${PATH_ROOT}/users`]}>
        <UsersPage />
      </PrivateRoute>
      <PrivateRoute path={`${PATH_ROOT}/profile`}>
        <ProfilePage />
      </PrivateRoute>
    </>
  );
};

function PrivateRoute({ children, component, ...rest }) {
  const auth = !!useSelector((state) => state.auth.token);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
