import React from "react";
import { io } from "socket.io-client";

export const socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ["websocket", "polling", "flashsocket"],
  query: `companyID=${
    window.location.pathname.split("/")[1] === "embed" ||
    window.location.pathname.split("/")[1] === "snippet"
      ? window.location.pathname.split("/")[2]
      : ""
  }`,
});
export const SocketContext = React.createContext();
