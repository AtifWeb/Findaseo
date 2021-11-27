import "./App.css";
import "./Assets/styles/css/dashboard.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Settings from "./App/pages/Settings";
import SettingsAccount from "./App/pages/SettingsAccount";
import SettingsOperatingHours from "./App/pages/SettingsOperatingHours";
import SettingsIntegrations from "./App/pages/SettingsIntegrations";
import SettingsNotification from "./App/pages/SettingsNotification";
import Contact from "./App/pages/Contact";
import EmailTickets from "./App/pages/EmailTickets";
import Operators from "./App/pages/Operators";
import LiveChat from "./App/pages/LiveChat";
import LiveVisitors from "./App/pages/LiveVisitors";
import Home from "./App/pages/Home";
import Analytics from "./App/pages/Analytics";
import CalenderBooking from "./App/pages/CalenderBooking";

// front page

import { HomePage } from "./App/pages/FrontPages/HomePage/HomePage";
import { Pricing } from "./App/pages/FrontPages/Plus/Pricing/Pricing";
import { Features } from "./App/pages/FrontPages/Plus/Features/Features";
import { Careers } from "./App/pages/FrontPages/Plus/Careers/Careers";
import { PrivacyPolicy } from "./App/pages/FrontPages/Plus/Privacy Policy/PrivacyPolicy";
import { Terms } from "./App/pages/FrontPages/Plus/Terms/Terms";
import { Login } from "./App/pages/FrontPages/Plus/Auth/Login/Login";
import { Register } from "./App/pages/FrontPages/Plus/Auth/Register/Register";
import { Calender } from "./App/pages/FrontPages/Plus/Calender/Calender";
import { ConfirmationPopUpCalender } from "./App/pages/FrontPages/Plus/ConfirmationPopUpCalender/ConfirmationPopUpCalender";
import Home_Desk from "./App/pages/Home_Desk";
import SettingsEmailSetup from "./App/pages/SettingsEmailSetup";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/Features" exact>
            <Features />
          </Route>
          {/* <Route path="/" exact>
            <HomePage />
          </Route> */}
          <Route path="/dashhboard/help_desk" exact>
            <Home_Desk />
          </Route>
          <Route path="/dashhboard/Analytics" exact>
            <Analytics />
          </Route>
          <Route path="/dashhboard/CalenderBooking" exact>
            <CalenderBooking />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
          {/* <Route path="/dashhboard/settings" exact>
            <Settings />
          </Route> */}
          <Route path="/dashhboard/SettingsAccount" exact>
            <SettingsAccount />
          </Route>
          <Route path="/dashhboard/SettingsIntegration" exact>
            <SettingsIntegrations />
          </Route>
          <Route path="/dashhboard/SettingsEmailSetup" exact>
            <SettingsEmailSetup />
          </Route>
          <Route path="/dashhboard/SettingsOperatingHours" exact>
            <SettingsOperatingHours />
          </Route>
          <Route path="/dashhboard/SettingsNotifications" exact>
            <SettingsNotification />
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

          {/* front page routing */}

          {/* <Route path="/" exact>
            <HomePage />
          </Route> */}

          <Route path="/plus/pricing" exact>
            <Pricing />
          </Route>
          <Route path="/plus/features" exact>
            <Features />
          </Route>
          <Route path="/plus/careers" exact>
            <Careers />
          </Route>
          <Route path="/plus/PrivacyPolicy" exact>
            <PrivacyPolicy />
          </Route>
          <Route path="/plus/Terms" exact>
            <Terms />
          </Route>

          {/* Auth */}
          <Route path="/plus/auth/login" exact>
            <Login />
          </Route>
          <Route path="/plus/auth/register" exact>
            <Register />
          </Route>
          <Route path="/plus/Calender/Confirm" exact>
            <ConfirmationPopUpCalender />
          </Route>
          <Route path="/plus/Calender" exact>
            <Calender />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
