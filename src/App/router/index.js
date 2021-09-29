import { Switch, Route, Redirect } from "react-router-dom";
import { isLogin } from "../helpers/auth/index";

import Settings from "App/pages/Settings";
import Contact from "App/pages/Contact";
import EmailTickets from "App/pages/EmailTickets";
import EmailTicketConversation from "App/pages/EmailTicketConversation";
import Operators from "App/pages/Operators";
import LiveChat from "App/pages/LiveChat";
import LiveVisitors from "App/pages/LiveVisitors";
import Home from "App/pages/Home";
import Analytics from "App/pages/Analytics";
import CalendarBooking from "App/pages/CalendarBooking";
import Calendars from "App/pages/calendar/Calendars";
import Booking from "App/pages/calendar/Booking";

import Login from "App/pages/auth/login";
import Logout from "App/pages/auth/logout";
import Register from "App/pages/auth/register";

import Snippet from "App/pages/embed/Snippet";
import Embed from "App/pages/embed";

// front page

import { HomePage } from "App/pages/FrontPages/HomePage/HomePage";
import { Pricing } from "App/pages/FrontPages/Plus/Pricing/Pricing";
import { Features } from "App/pages/FrontPages/Plus/Features/Features";
import { Careers } from "App/pages/FrontPages/Plus/Careers/Careers";
import { PrivacyPolicy } from "App/pages/FrontPages/Plus/Privacy Policy/PrivacyPolicy";
import { Login as Loginn } from "App/pages/FrontPages/Plus/Auth/Login/Login";
import { Register as Registerr } from "App/pages/FrontPages/Plus/Auth/Register/Register";

const AuthRoutes = () => (
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/Analytics" exact>
      <Analytics />
    </Route>
    <Route path="/CalendarBooking/calendars" exact>
      <Calendars />
    </Route>
    <Route path="/CalendarBooking/:type?" exact>
      <CalendarBooking />
    </Route>
    <Route path="/settings/:channel?" exact>
      <Settings />
    </Route>
    <Route path="/contact/:channel?" exact>
      <Contact />
    </Route>
    <Route path="/EmailTickets/conversation/:id?" exact>
      <EmailTicketConversation />
    </Route>

    <Route path="/EmailTickets/:type?" exact>
      <EmailTickets />
    </Route>
    <Route path="/operators" exact>
      <Operators />
    </Route>
    <Route path="/LiveChat/:user?" exact>
      <LiveChat />
    </Route>
    <Route path="/LiveVisitors" exact>
      <LiveVisitors />
    </Route>
    <Route path="/calendar/:calendar" exact>
      <Booking />
    </Route>
    <Route path="/snippet/:company" exact>
      <Snippet />
    </Route>
    <Route path="/embed/:company" exact>
      <Embed />
    </Route>
    <Route path="/logout" exact>
      <Logout />
    </Route>

    {/* front page routing */}

    <Route path="/h" exact>
      <HomePage />
    </Route>

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

    {/* Auth */}
    <Route path="/plus/auth/login" exact>
      <Loginn />
    </Route>
    <Route path="/plus/auth/register" exact>
      <Registerr />
    </Route>
  </Switch>
);

const Routes = () =>
  isLogin() ? (
    <AuthRoutes />
  ) : (
    <Switch>
      <Route path={"/register"} component={Register} />
      <Route path={"/login"} component={Login} />
      <Route path="/snippet/:company" exact>
        <Snippet />
      </Route>
      <Route path="/embed/:company" exact>
        <Embed />
      </Route>
      <Redirect from="*" to="/login" />
    </Switch>
  );
export default Routes;
