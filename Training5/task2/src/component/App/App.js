import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { RootRouter } from "../../routes";

function App() {
  return (
    <Router>
      <RootRouter />
    </Router>
  );
}

export default App;
