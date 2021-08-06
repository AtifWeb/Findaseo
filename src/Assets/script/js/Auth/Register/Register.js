export const HandleMessages = (
  success,
  error,
  Successdisplay,
  ErrorDisplay
) => {
  document.querySelector(success).style.display = Successdisplay;
  document.querySelector(error).style.display = ErrorDisplay;
};
