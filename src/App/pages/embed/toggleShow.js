export const HandleBotDisplay = (e, innerSize) => {
  const Bot = document.querySelector(".collapse-bot");
  const BurgerBtn = document.querySelector("#burgerButton");

  if (Bot.classList.contains("active")) {
    document.querySelector(".collapse-bot").style.opacity = 0;
    document.querySelector(".collapse-bot").style.transform =
      " translateY(30px)";

    document.querySelector(".collapse-bot").style.display = "none";
    // if (window.innerWidth <= 600) {
    //   BurgerBtn.style.display = "block";
    // }

    document.querySelector(".collapse-bot").classList.remove("active");
    document.querySelector("#closeIconButton").classList.add("fa-comment-alt");
    document.querySelector("#closeIconButton").classList.remove("fa-times");

    window.parent.postMessage(JSON.stringify({ type: "CLOSE_IFRAME" }), "*");
  } else {
    window.parent.postMessage(JSON.stringify({ type: "OPEN_IFRAME" }), "*");
    document.querySelector(".collapse-bot").style.display = "block";
    document
      .querySelector("#closeIconButton")
      .classList.remove("fa-comment-alt");
    document.querySelector("#closeIconButton").classList.add("fa-times");

    document.querySelector(".collapse-bot").style.opacity = 1;
    document.querySelector(".collapse-bot").style.transform =
      " translateY(0px)";
    // if (window.innerWidth <= 600) {
    //   BurgerBtn.style.display = "none";
    // }
    document.querySelector(".collapse-bot").classList.add("active");
  }
  ToggleBurgerBtn(innerSize);
};

export const ToggleBurgerBtn = (innerSize) => {
  const Bot = document.querySelector(".collapse-bot");
  const BurgerBtn = document.querySelector("#burgerButton");

  if (Bot && BurgerBtn) {
    if (innerSize.width <= 600) {
      if (Bot.classList.contains("active")) {
        BurgerBtn.style.display = "none";
      } else {
        BurgerBtn.style.display = "block";
      }
    } else {
      BurgerBtn.style.display = "block";
    }
  }
};

export const HandleCovertingScreen = (e) => {
  e.preventDefault();
  document.querySelector("#introductionWidget").style.display = "none";
  document.querySelector("#prechat").style.display = "block";
};
export const HandleCovertingScreenReverse = (e) => {
  e.preventDefault();
  document.querySelector("#introductionWidget").style.display = "block";
  document.querySelector("#prechat").style.display = "none";
};

export const ShowMessageContainer = () => {
  if (document.querySelector("#MessageArea"))
    document.querySelector("#MessageArea").style.display = "block";
};
