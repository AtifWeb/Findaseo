let CurrentStep = 0;
export const HandleNextStep = (setStep, Fields) => {
  CurrentStep++;
  setStep(Fields[CurrentStep]);
  if (CurrentStep == 2) {
    document.querySelector(".next_button").style.display = "none";
  }
  return CurrentStep;
};
