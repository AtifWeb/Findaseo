import React from "react";
import { Helmet } from "react-helmet";
import { CalenderBookingArea } from "../../../../component/templates/Calender/CalenderBookingArea/CalenderBookingArea";

import { PeronMettingArea } from "../../../../component/templates/Calender/PeronMettingArea/PeronMettingArea";
import { SelecTimeArea } from "../../../../component/templates/Calender/SelecTimeArea/SelecTimeArea";
import style from "./Calender.module.css";
export const Calender = () => {
  return (
    <div className={`${style.calender} w-1200`}>
      <Helmet>
        <title>Calendar Booking - Pavelify</title>
      </Helmet>
      <PeronMettingArea />

      <CalenderBookingArea />
      <SelecTimeArea />
    </div>
  );
};
