import React, { useState } from "react";

export const OperatingHoursCheckbox = ({ day }) => {
  const [showTime, setShowTime] = useState(false);
  return (
    <div className="input-wrapper">
      <p>{day}</p>
      <input
        type="checkbox"
        name=""
        id={day}
        onChange={(e) => setShowTime(!showTime)}
      />
      <label className="checkbox-custom-op" htmlFor={day}>
        <p className="Available">Available</p>
        <p className="Unavailable">Unavailable</p>

        <span className="ball"></span>
      </label>{" "}
      {showTime && <input type="time" name="" id="" />}
      {showTime && <input type="time" name="" id="" />}
      {showTime && <button>Add 24 hours</button>}
    </div>
  );
};
