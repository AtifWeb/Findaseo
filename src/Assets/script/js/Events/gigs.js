export const GigEvents = () => {
  let SliderContainer = document.querySelector(".profile-slider");
  let ProfileShadder = document.querySelector(".profile-siider-front-shade");
  let FrontArrow = document.querySelector(".forward-arrow");
  let BackArrow = document.querySelector(".back-arrow");
  console.log(SliderContainer);
  console.log(BackArrow);

  const HandleGigProfileHoverIn = (e) => {
    ProfileShadder.style.opacity = 1;
    FrontArrow.style.opacity = 1;
    BackArrow.style.opacity = 1;
  };
  const HandleGigProfileHoverout = (e) => {
    ProfileShadder.style.opacity = 0;
    FrontArrow.style.opacity = 0;
    BackArrow.style.opacity = 0;
  };
};
