export const CalenderJs = () => {
  let CurrentDate = new Date();
  let CurrentMonth = CurrentDate.getMonth();
  let CurrentYear = CurrentDate.getFullYear();
  let TotalDays = 31;

  let CalenderDays = document.querySelectorAll(".calender-days div");
  const CalenderDateTime = document.querySelector(".Calender-DateTime");
  const CalenderDaysWrapper = document.querySelector(".calender-days");
  const CalenderNavigateButtons = {
    BackIcon: document.querySelector("#calender-back-icon-wrapper"),
    FrontIcon: document.querySelector("#calender-towards-icon-wrapper"),
  };

  const CovertIntoMonthString = (CurrentNumericMonth) => {
    let Months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return Months[CurrentNumericMonth];
  };

  const DisplayDate = () => {
    CalenderDateTime.textContent = `${CovertIntoMonthString(
      CurrentMonth
    )} , ${CurrentYear}`;
  };

  const ActivateThisDay = (e) => {
    const Element = document.querySelector(`#${e.target.id}`);
    document.querySelectorAll(".calender-days  > *").forEach((EachDay) => {
      EachDay.classList.remove("active-day");
    });
    Element.classList.toggle("active-day");
  };

  // Helping function to get total daus
  const GetTotalDays = (Month) => {
    if (Month == 3 || Month == 5 || Month == 8 || Month == 10) {
      Month = 30;
    } else if (Month == 1) {
      Month = 28;
    } else {
      Month = 31;
    }
    return Month;
  };

  // Helping function
  const StartDateWithRespectToDay = (year, month) => {
    let LocalDate = new Date(year, month, 1);
    let LocalDay = LocalDate.getDay();
    return LocalDay;
  };

  // Event Function

  const NavigateBack = (e) => {
    if (CurrentMonth == 0) {
      CurrentMonth = 11;
    } else {
      CurrentMonth--;
    }
    CalenderDateTime.textContent = `${CovertIntoMonthString(
      CurrentMonth
    )} , ${CurrentYear}`;
    DisplayDays();
  };

  const NavigateFront = (e) => {
    if (CurrentMonth == 11) {
      CurrentMonth = 0;
    } else {
      CurrentMonth++;
    }
    CalenderDateTime.textContent = `${CovertIntoMonthString(
      CurrentMonth
    )} , ${CurrentYear}`;
    DisplayDays();
  };

  const DisplayDays = () => {
    // Remove Event Listeners from Old Divs
    CalenderDays.forEach((CalenderDay) => {
      CalenderDay.removeEventListener("click", ActivateThisDay);
    });

    CalenderDaysWrapper.innerHTML = "";

    //   Calculate total Days
    TotalDays = GetTotalDays(CurrentMonth);

    //   frist date Start in which day Monday Tuesday etc
    let FirstElementInCalender = StartDateWithRespectToDay(
      CurrentYear,
      CurrentMonth
    );

    //   first Loop to add . dots
    for (let CurrentDay = 0; CurrentDay < TotalDays; CurrentDay++) {
      if (FirstElementInCalender - 1 > CurrentDay) {
        CalenderDaysWrapper.innerHTML += ` <div>
                <span>.</span>
              </div>`;
      }
    }

    //   Second loop to display date
    for (let CurrentDay = 0; CurrentDay < TotalDays; CurrentDay++) {
      CalenderDaysWrapper.innerHTML += ` <div id="calender-day-${
        CurrentDay + 1
      }">
            <span>${CurrentDay + 1}</span>
          </div>`;
    }

    if (CurrentDate.getMonth() === CurrentMonth) {
      document
        .querySelector(`#calender-day-${CurrentDate.getDate()}`)
        .classList.add("active-day");
    }
    //   Add Event Listeners In New Divs
    CalenderDays = document.querySelectorAll(".calender-days div");

    CalenderDays.forEach((CalenderDay) => {
      CalenderDay.addEventListener("click", ActivateThisDay);
    });
  };

  // display date
  DisplayDate();
  // display days
  DisplayDays();

  // add Event Listeners for back and front arrows in calender
  CalenderNavigateButtons.BackIcon.addEventListener("click", NavigateBack);
  CalenderNavigateButtons.FrontIcon.addEventListener("click", NavigateFront);
};
