import { Switch, Route } from "react-router-dom";
import { LoginPage } from "../component/Login";
import { MainPage } from "../component/Main";

export const RootRouter = () => {
  return (
    <Switch>
      <Route path={["/login", "/"]} exact component={LoginPage} />
      <Route path={["/app", "/*"]} exact component={MainPage} />
    </Switch>
  );
};
