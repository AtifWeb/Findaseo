import "../App.css";
import '../Assets/styles/css/dashboard.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
          <Settings/>
          </Route>
         
        </Switch>
      </Router>
    </div>
  );
}

export default App;
