//change header transparancy while scrolling
const header = document.querySelector(".header-container");
const handleScroll = () => {
  window.scrollY > 84
    ? header.classList.add("transparent")
    : header.classList.remove("transparent");
};
window.addEventListener("scroll", handleScroll);

// partners slider
const rightArrow = document.getElementById("rightArrow");
const leftArrow = document.getElementById("leftArrow");
const partnersLists = document.querySelectorAll(".partners-list-wrapper");
const dotSlider = document.querySelectorAll(".dot");
let currentIndex = 0;

const showCurrentList = () => {
  partnersLists.forEach((partnerList, index) => {
    if (index === currentIndex) {
      partnerList.classList.remove("d-none");
      if (dotSlider[index]) {
        dotSlider[index].classList.add("dot-selected");
      }
    } else {
      partnerList.classList.add("d-none");
      if (dotSlider[index]) {
        dotSlider[index].classList.remove("dot-selected");
      }
    }
  });
};

const handleArrow = (direction) => {
  currentIndex =
    (direction === "right"
      ? currentIndex + 1
      : currentIndex - 1 + partnersLists.length) % partnersLists.length;
  showCurrentList();
};

// Arrow event listeners
rightArrow.addEventListener("click", () => handleArrow("right"));
leftArrow.addEventListener("click", () => handleArrow("left"));

// Automatic scroll
let intervalId = setInterval(() => handleArrow("right"), 5000);

// Mouse enter/leave event listeners
const handleMouseEnter = () => clearInterval(intervalId);
const handleMouseLeave = () =>
  (intervalId = setInterval(() => handleArrow("right"), 5000));

rightArrow.addEventListener("mouseenter", handleMouseEnter);
rightArrow.addEventListener("mouseleave", handleMouseLeave);
leftArrow.addEventListener("mouseenter", handleMouseEnter);
leftArrow.addEventListener("mouseleave", handleMouseLeave);

// Dot slider logic
const dotContainer = document.querySelector(".slider-dots-container");

const handleDotSlider = (e) => {
  const currentDot = e.target.closest("li");
  if (!currentDot) return;
  dotSlider.forEach((slider, index) => {
    const isCurrentDot = slider === currentDot;
    partnersLists[index].classList.toggle("d-none", !isCurrentDot);
    currentDot.classList.toggle("dot-selected", isCurrentDot);
    slider.classList.toggle("dot-selected", isCurrentDot);
  });
};

dotContainer.addEventListener("click", handleDotSlider);

// Accordion card

const accordionWrapper = document.querySelector(".accordion-div-wrapper");
const accordionCards = document.querySelectorAll(".accordion-card-li");

const handleClick = (e) => {
  const closestAccordionCard = e.target.closest("li");
  accordionCards.forEach((accordionCard) => {
    const downArrow = accordionCard.querySelector(".down-arrow");
    const upArrow = accordionCard.querySelector(".up-arrow");
    const accordionAnswers = accordionCard.querySelector(
      ".query-accordion-answer"
    );
    if (accordionCard === closestAccordionCard) {
      toogleClasslist(downArrow, "d-none");
      toogleClasslist(upArrow, "d-none");
      toogleClasslist(accordionAnswers, "d-none");
    } else {
      downArrow.classList.remove("d-none");
      upArrow.classList.add("d-none");
      accordionAnswers.classList.add("d-none");
    }
  });
};

accordionWrapper.addEventListener("click", handleClick);
// burger menu appear/disappear while clicking on burger button
const burgerMenu = document.querySelector(".burger-bar-wrapper");
const aside = document.querySelector(".aside");
const asideOverlay = document.querySelector(".aside-overlay");
const headerNavContainer = document.getElementById("headerNavContainer");
const headerNav = document.querySelector(".nav-wrapper");

let isMenuOpen = false;
//  reusable function for toggling classes
const toogleClasslist = (name, classes) => {
  name.classList.toggle(classes);
};
const toggleMenu = () => {
  isMenuOpen = !isMenuOpen;

  const burgerMenuChildren = burgerMenu.children;
  const classesToAdd = [
    "burger-menu-1line",
    "burger-menu-2line",
    "burger-menu-3line",
  ];
  const classesToRemove = ["d-none", "nav-wrapper", "nav-wrapper-clicked"];

  for (let i = 0; i < burgerMenuChildren.length; i++) {
    toogleClasslist(burgerMenuChildren[i], classesToAdd[i]);
    burgerMenuChildren[i].classList.remove(classesToRemove[i]);
  }

  aside.classList.toggle("d-none");
  aside.style.backgroundColor = isMenuOpen ? "rgb(43, 43, 43)" : "";
  toogleClasslist(asideOverlay, "d-none");
  headerNavContainer.style.display = isMenuOpen ? "flex" : "";
  toogleClasslist(headerNavContainer, "nav-container-clicked");
  toogleClasslist(headerNav, "nav-wrapper-clicked");
  toogleClasslist(headerNav, "nav-wrapper");
  isMenuOpen
    ? clearInterval(intervalId)
    : (intervalId = setInterval(() => handleArrow("right"), 5000));
};
burgerMenu.addEventListener("click", toggleMenu);
// close burger menu bar
const closeBurgerMenuBar = (e) => {
  if (
    isMenuOpen &&
    e.target !== aside &&
    !aside.contains(e.target) &&
    e.target !== asideOverlay &&
    !asideOverlay.contains(e.target)
  ) {
    toggleMenu();
  }
};
window.addEventListener("click", closeBurgerMenuBar);

// burger menu bar section height
const updateOverlayHeight = () => {
  const bodyHeight = document.body.scrollHeight;
  const asideHeight = aside.offsetHeight;
  asideOverlay.style.height = bodyHeight - asideHeight + "px";
};

window.onload = () => {
  updateOverlayHeight();
  // Update overlay height on window scroll
  window.addEventListener("scroll", updateOverlayHeight);
};

// Burger Menu disappears while resizing
const handleResize = () => {
  const windowWidth = window.innerWidth;
  windowWidth > 850 && isMenuOpen
    ? toggleMenu()
    : (burgerMenu.style.display = "flex");
};

window.addEventListener("resize", handleResize);
