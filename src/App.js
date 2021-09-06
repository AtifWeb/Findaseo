import "./App.css";
import "./Assets/styles/css/dashboard.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "App/redux/store";
import { SocketContext, socket } from "App/context/socket";
import Routes from "App/router";

function App() {
  return (
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <div className="App">
          <Router>
            <Routes />
          </Router>
        </div>
      </SocketContext.Provider>
    </Provider>
  );
}

export default App;
