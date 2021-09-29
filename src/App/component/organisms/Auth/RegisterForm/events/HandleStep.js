let CurrentStep = 0;

export const HandleNextStep = (setStep, Fields) => {
  CurrentStep++;
  setStep(Fields[CurrentStep]);
  if (CurrentStep == 1) {
    document.querySelector("#progress_inner").style.width = "60%";
    document.querySelector(".step2").textContent = "2";
    document.querySelector(".heading-steps").textContent =
      "You’re nearly there";
  }
  if (CurrentStep == 2) {
    document.querySelector(".heading-steps").textContent = "Last Step";
    document.querySelector("#progress_inner").style.width = "100%";
    document.querySelector(".step2").textContent = "3";
    document.querySelector(".next_button").style.display = "none";
  }
  return CurrentStep;
};
