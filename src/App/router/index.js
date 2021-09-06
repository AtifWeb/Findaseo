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

import Login from "App/pages/auth/login";
import Logout from "App/pages/auth/logout";
import Register from "App/pages/auth/register";

import Snippet from "App/pages/embed/Snippet";
import Embed from "App/pages/embed";

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
    <Route path="/CalendarBooking" exact>
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
    <Route path="/snippet/:company" exact>
      <Snippet />
    </Route>
    <Route path="/embed/:company" exact>
      <Embed />
    </Route>
    <Route path="/logout" exact>
      <Logout />
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
      <Redirect from="*" to="/login" />
    </Switch>
  );
export default Routes;
