export const HandleHomeEvents = (e) => {
  let ServiceLeftArrows = document.querySelector(".service-left-arrow");
  let ProviderLeftArrows = document.querySelector(".provider-left-arrow");
  let ServiceMovement = 0;
  let PopularMovement = 0;
  const HandleLeftServiceArrowMovement = () => {
    ServiceMovement = ServiceMovement + 300;
    document.querySelector(
      ".services-reel"
    ).style.transform = `translateX(-${ServiceMovement}px)`;
  };

  const HandleLeftPopularArrowMovement = (Reel) => {
    PopularMovement = PopularMovement + 300;
    document.querySelector(
      ".popular-reel"
    ).style.transform = `translateX(-${ServiceMovement}px)`;
  };

  ServiceLeftArrows.addEventListener("click", (e) =>
    HandleLeftServiceArrowMovement(".services-reel", 300)
  );

  ProviderLeftArrows.addEventListener("click", (e) =>
    HandleLeftPopularArrowMovement(".popular-reel", 300)
  );
};
