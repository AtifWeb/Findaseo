import React from "react";
import { CalenderBookingArea } from "App/component/templates/Calender/CalenderBookingArea/CalenderBookingArea";

import { PeronMettingArea } from "App/component/templates/Calender/PeronMettingArea/PeronMettingArea";
import { SelecTimeArea } from "App/component/templates/Calender/SelecTimeArea/SelecTimeArea";
import style from "./Calender.module.css";

const Calender = ({ data }) => {
  return (
    <div className={`${style.calender} w-1200`}>
      <PeronMettingArea data={data} />

      <CalenderBookingArea data={data} />
      <SelecTimeArea data={data} />
      <div className={style.buttonWrapper}>
        <button
          disabled={!data.continue}
          onClick={data.continue}
          className={style.button}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Calender;
