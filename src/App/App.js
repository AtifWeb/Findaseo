import "../App.css";
import '../Assets/styles/css/dashboard.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Settings from "./pages/Settings";
import Contact from "./pages/Contact";
import EmailTickets from "./pages/EmailTickets";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/dashboard/settings" exact>
          <Settings/>
          </Route>
          <Route path="/dashhboard/contact" exact>
          <Contact />
          </Route>
          <Route path="/dashhboard/EmailTickets" exact>
          <EmailTickets />
          </Route>
         
        </Switch>
      </Router>
    </div>
  );
}

export default App;
