import { Switch, Route, Redirect } from "react-router-dom";
import { isLogin } from "../helpers/auth/index";

import Settings from "App/pages/Settings";
import Contact from "App/pages/Contact";
import EmailTickets from "App/pages/EmailTickets";
import EmailTicketConversation from "App/pages/EmailTicketConversation";
import Operators from "App/pages/Operators";
import LiveChat from "App/pages/LiveChat";
import LiveVisitors from "App/pages/LiveVisitors";
import Dashboard from "App/pages/Home";
import Analytics from "App/pages/Analytics";
import CalendarBooking from "App/pages/CalendarBooking";
import Calendars from "App/pages/calendar/Calendars";
import Booking from "App/pages/calendar/Booking";

// import Login from "App/pages/auth/login";
import Logout from "App/pages/auth/logout";
// import Register from "App/pages/auth/register";

import Snippet from "App/pages/embed/Snippet";
import Embed from "App/pages/embed";

// front page

import { HomePage } from "App/pages/FrontPages/HomePage/HomePage";
import { Pricing } from "App/pages/FrontPages/Plus/Pricing/Pricing";
import { Features } from "App/pages/FrontPages/Plus/Features/Features";
import { Careers } from "App/pages/FrontPages/Plus/Careers/Careers";
import { PrivacyPolicy } from "App/pages/FrontPages/Plus/Privacy Policy/PrivacyPolicy";
import { Login } from "App/pages/FrontPages/Plus/Auth/Login/Login";
import { Register } from "App/pages/FrontPages/Plus/Auth/Register/Register";
import useGetSubdomain from "App/hooks/useGetSubdomain";

// import { HomePage } from "./App/pages/FrontPages/HomePage/HomePage";
// import { Pricing } from "./App/pages/FrontPages/Plus/Pricing/Pricing";
// import { Features } from "./App/pages/FrontPages/Plus/Features/Features";
// import { Careers } from "./App/pages/FrontPages/Plus/Careers/Careers";
// import { PrivacyPolicy } from "./App/pages/FrontPages/Plus/Privacy Policy/PrivacyPolicy";
// import { Login } from "./App/pages/FrontPages/Plus/Auth/Login/Login";
// import { Register } from "./App/pages/FrontPages/Plus/Auth/Register/Register";
import { Calender } from "App/pages/FrontPages/Plus/Calender/Calender";
import { ConfirmationPopUpCalender } from "App/pages/FrontPages/Plus/ConfirmationPopUpCalender/ConfirmationPopUpCalender";

const AuthRoutes = () => {
  const { subdomain, domain } = useGetSubdomain();

  switch (subdomain) {
    case "":
      return (
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/snippet/:company" exact>
            <Snippet />
          </Route>
          <Route path="/pricing" exact>
            <Pricing />
          </Route>
          <Route path="/features" exact>
            <Features />
          </Route>
          <Route path="/careers" exact>
            <Careers />
          </Route>
          <Route path="/PrivacyPolicy" exact>
            <PrivacyPolicy />
          </Route>

          <Route path="/plus/Calender/Confirm" exact>
            <ConfirmationPopUpCalender />
          </Route>
          <Route path="/plus/Calender" exact>
            <Calender />
          </Route>

          {/* Authentications */}
          <Route
            path="/auth/login"
            component={() => {
              window.location.replace(
                `${window.location.protocol}//app.${domain}`
              );
              return null;
            }}
          />
          {/* <Login />
          </Route> */}
          <Route
            path="/auth/register"
            component={() => {
              window.location.replace(
                `${window.location.protocol}//app.${domain}/auth/register`
              );
              return null;
            }}
          />
        </Switch>
      );
      break;

    case "livechat":
      return (
        <Switch>
          <Route path="/:company" exact>
            <Embed />
          </Route>
        </Switch>
      );

    case "appointment":
      return (
        <Switch>
          <Route path="/:companyName/:calendar" exact>
            <Booking />
          </Route>
        </Switch>
      );

    case "app":
      return isLogin() ? (
        <Switch>
          <Route path="/" exact>
            <Dashboard />
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
          <Route path="/logout" exact>
            <Logout />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/auth/register" exact>
            <Register />
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
      );

    default:
      return <Login />;
      break;
  }
};

const Routes = () => <AuthRoutes />;

export default Routes;
