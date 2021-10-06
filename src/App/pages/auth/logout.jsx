import { clearUser } from "App/helpers/auth";
import React from "react";
import { useEffect } from "react";

function Logout(props) {
  useEffect(() => {
    clearUser();
    window.location = "/";
  });
  return <section className="container"></section>;
}

export default Logout;
