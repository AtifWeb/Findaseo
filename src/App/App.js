import "../App.css";
import '../Assets/styles/css/dashboard.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Settings from "./pages/Settings";
import Contact from "./pages/Contact";
import EmailTickets from "./pages/EmailTickets";
import Operators from "./pages/Operators";
import LiveChat from "./pages/LiveChat";
import LiveVisitors from "./pages/LiveVisitors";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/dashhboard/settings" exact>
          <Settings/>
          </Route>
          <Route path="/dashhboard/contact" exact>
          <Contact />
          </Route>
          <Route path="/dashhboard/EmailTickets" exact>
          <EmailTickets />
          </Route>
          <Route path="/dashboard/operators" exact>
          <Operators />
          </Route>
          <Route path="/dashboard/LiveChat" exact>
          <LiveChat />
          </Route>
          <Route path="/dashboard/LiveVisitors" exact>
          <LiveVisitors />
          </Route>
         
        </Switch>
      </Router>
    </div>
  );
}

export default App;
