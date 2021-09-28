import { Switch, Route } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import { MainPage } from "../pages/Main";
import { NotFound } from "../pages/NotFound";

export const RootRouter = () => {
  return (
    <Switch>
      <Route path={["/login", "/"]} exact component={LoginPage} />
      <Route path={["/app", "/app/*"]} exact component={MainPage} />
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};
