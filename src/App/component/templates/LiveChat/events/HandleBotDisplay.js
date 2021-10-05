export const HandleBotDisplay = (e) => {
  const Bot = document.querySelector(".collapse-bot");

  if (window.innerWidth > 600) {
    if (Bot.classList.contains("active")) {
      document.querySelector("#MessageArea").style.display = "none";
      document.querySelector(".collapse-bot").style.opacity = 0;
      document.querySelector(".collapse-bot").style.transform =
        " translateY(30px)";
      setTimeout(() => {
        document.querySelector(".collapse-bot").style.display = "none";
      }, 400);
      document.querySelector(".collapse-bot").classList.remove("active");
    } else {
      document.querySelector(".collapse-bot").style.display = "block";

      setTimeout(() => {
        document.querySelector(".collapse-bot").style.opacity = 1;
        document.querySelector(".collapse-bot").style.transform =
          " translateY(0px)";
      }, 100);
      document.querySelector(".collapse-bot").classList.add("active");
    }
  } else {
    if (e.target.id == "burgerButton") {
      document.querySelector(".collapse-bot").style.display = "block";
    } else {
      document.querySelector(".collapse-bot").style.display = "none";
    }
  }
};
