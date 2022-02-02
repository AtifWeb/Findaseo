import "./App.css";
import "./Assets/styles/css/dashboard.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "App/redux/store";
import { SocketContext, socket } from "App/context/socket";
import Routes from "App/router";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  fetchBookings,
  fetchOperatorsAndDepartments,
  fetchStats,
  fetchTickets,
  fetchTodolist,
} from "Lib/Axios/endpoints/queries";
import { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const [isLoaded, setLoaded] = useState(false);

  const queryClient = new QueryClient({
    defaultOptions: { queries: { keepPreviousData: true } },
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!isLoaded) {
      await queryClient.prefetchQuery("todolist", fetchTodolist, {
        initialData: {},
      });
      await queryClient.prefetchQuery("stats", fetchStats, { initialData: {} });
      await queryClient.prefetchQuery(["tickets", ""], fetchTickets, {
        initialData: {},
      });
      await queryClient.prefetchQuery("calendarBooking", fetchBookings, {
        initialData: {},
      });
      await queryClient.prefetchQuery(
        "operatorsAndDepartments",
        fetchOperatorsAndDepartments,
        {
          initialData: {},
        }
      );
      setLoaded(true);
    }
  };

  return (
    <HelmetProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <SocketContext.Provider value={socket}>
            <div className="App">
              {isLoaded ? (
                <Router>
                  <Routes />
                </Router>
              ) : (
                <div
                  style={{
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "#13215e",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    style={{ width: "150px", marginBottom: "30px" }}
                    src={"/images/logo1.png"}
                  />

                  <img style={{ eidth: "100%" }} src={"/images/loading.gif"} />
                </div>
              )}
            </div>
          </SocketContext.Provider>
        </QueryClientProvider>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
