import React, { useEffect } from "react";
import { CalenderJs } from "./event/calender";

export const CalenderPure = () => {
  useEffect(() => {
    CalenderJs();
  });
  return (
    <div class="box calender stagger">
      <div class="calender-top">
        <div class="icon-wrapper" id="calender-back-icon-wrapper">
          <i class="fas fa-arrow-left"></i>
        </div>
        <strong class="Calender-DateTime">Dec, 2021</strong>
        <div class="icon-wrapper" id="calender-towards-icon-wrapper">
          <i class="fas fa-arrow-right"></i>
        </div>
      </div>
      <div class="calender-days-name">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thur</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
      <div class="calender-days"></div>
    </div>
  );
};
