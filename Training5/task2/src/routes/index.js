import { Switch, Route } from "react-router-dom";
import { LoginPage } from "../component/Login";
import { AppRouter } from "./main";

export const RootRouter = () => {
  return (
    <Switch>
      <Route path={["/login", "/"]} exact component={LoginPage} />
      <AppRouter />
    </Switch>
  );
};
