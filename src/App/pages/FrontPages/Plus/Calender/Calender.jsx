import React from "react";
import { CalenderBookingArea } from "../../../../component/templates/Calender/CalenderBookingArea/CalenderBookingArea";

import { PeronMettingArea } from "../../../../component/templates/Calender/PeronMettingArea/PeronMettingArea";
import { SelecTimeArea } from "../../../../component/templates/Calender/SelecTimeArea/SelecTimeArea";
import style from "./Calender.module.css";
export const Calender = () => {
  return (
    <div className={`${style.calender} w-1200`}>
      <PeronMettingArea />

      <CalenderBookingArea />
      <SelecTimeArea />
    </div>
  );
};
