import "./App.css";
import './Assets/styles/css/dashboard.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Settings from "./App/pages/Settings";
import Contact from "./App/pages/Contact";
import EmailTickets from "./App/pages/EmailTickets";
import Operators from "./App/pages/Operators";
import LiveChat from "./App/pages/LiveChat";
import LiveVisitors from "./App/pages/LiveVisitors";
import Home from "./App/pages/Home";
import Analytics from "./App/pages/Analytics";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
          <Home/>
          </Route>
          <Route path="/dashhboard/Analytics" exact>
          <Analytics/>
          </Route>
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
