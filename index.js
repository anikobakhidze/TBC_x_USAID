import { toggleClass } from "./utils/toggleClass.js";
//change header transparancy while scrolling
const header = document.querySelector(".site-header");
const thresholdY = 84;
const handleScroll = () => {
  toggleClass(header, "transparent", window.scrollY > thresholdY);
};
window.addEventListener("scroll", handleScroll);

// partners slider
const rightArrow = document.getElementById("rightArrow");
const leftArrow = document.getElementById("leftArrow");
const partnersLists = document.querySelectorAll(".partner-logos");
const indicatorSlider = document.querySelectorAll(".indicator");
let currentIndex = 0;

const showCurrentList = () => {
  partnersLists.forEach((partnerList, index) => {
    const isSelected = index === currentIndex;
    toggleClass(partnerList, "d-none", !isSelected);
    if (indicatorSlider[index]) {
      toggleClass(indicatorSlider[index], "indicator-selected", isSelected);
    }
  });
};

const handleArrow = (direction) => {
  const arrowDirection = direction === "right";
  currentIndex =
    (arrowDirection
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

// indicator slider logic
const indicatorContainer = document.querySelector(".slider-indicators");

const handleindicatorSlider = (e) => {
  const currentindicator = e.target.closest("li");
  if (!currentindicator) return;
  indicatorSlider.forEach((slider, index) => {
    const isCurrent = slider === currentindicator;
    toggleClass(partnersLists[index], "d-none", !isCurrent);
    toggleClass(slider, "indicator-selected", isCurrent);
  });
};
indicatorContainer.addEventListener("click", handleindicatorSlider);

// Accordion card

const accordionWrapper = document.querySelector(".accordion-content-wrapper");
const accordionCards = document.querySelectorAll(".accordion-card-li");

const handleClick = (e) => {
  const closestAccordionCard = e.target.closest(".accordion-card-li");

  accordionCards.forEach((accordionCard) => {
    const isActive = accordionCard === closestAccordionCard;
    const downArrow = accordionCard.querySelector(".down-arrow");
    const upArrow = accordionCard.querySelector(".up-arrow");
    const accordionAnswers = accordionCard.querySelector(
      ".query-accordion-answer"
    );

    if (isActive && !accordionAnswers.classList.contains("d-none")) {
      toggleClass(downArrow, "d-none", false);
      toggleClass(upArrow, "d-none", true);
      toggleClass(accordionAnswers, "d-none", true);
    } else {
      toggleClass(downArrow, "d-none", isActive);
      toggleClass(upArrow, "d-none", !isActive);
      toggleClass(accordionAnswers, "d-none", !isActive);
    }
  });
};

accordionWrapper.addEventListener("click", handleClick);
// burger menu appear/disappear while clicking on burger button
const burgerMenu = document.querySelector(".burger-menu-icon");
const menuAside = document.querySelector(".sidebar-menu");
const menuOverlay = document.querySelector(".menu-bar-overlay");
const navContainer = document.getElementById("headerNavContainer");
const navContentWrapper = document.querySelector(".nav-content-wrapper");

let isBurgerMenuOpen = false;
const toggleMenu = () => {
  isBurgerMenuOpen = !isBurgerMenuOpen;

  const burgerMenuChildren = burgerMenu.children;
  const classesToAdd = [
    "burger-menu-1line",
    "burger-menu-2line",
    "burger-menu-3line",
  ];
  for (let i = 0; i < burgerMenuChildren.length; i++) {
    toggleClass(burgerMenuChildren[i], classesToAdd[i], isBurgerMenuOpen);
  }
  toggleClass(document.body, "no-scroll", isBurgerMenuOpen);
  toggleClass(menuAside, "d-none", !isBurgerMenuOpen);
  menuAside.style.backgroundColor = isBurgerMenuOpen ? "rgb(43, 43, 43)" : "";
  toggleClass(menuOverlay, "d-none", !isBurgerMenuOpen);
  navContainer.style.display = isBurgerMenuOpen ? "flex" : "";
  toggleClass(navContainer, "burger-activated-nav", isBurgerMenuOpen);
  toggleClass(navContentWrapper, "burger-nav-content", isBurgerMenuOpen);
  toggleClass(navContentWrapper, "nav-content-wrapper", !isBurgerMenuOpen);
  isBurgerMenuOpen
    ? clearInterval(intervalId)
    : (intervalId = setInterval(() => handleArrow("right"), 5000));
};
burgerMenu.addEventListener("click", toggleMenu);
// close burger menu bar
const closeBurgerMenuBar = (e) => {
  if (
    isBurgerMenuOpen &&
    e.target !== menuAside &&
    !menuAside.contains(e.target) &&
    e.target !== menuOverlay &&
    !menuOverlay.contains(e.target)
  ) {
    toggleMenu();
  }
};
window.addEventListener("click", closeBurgerMenuBar);

// burger menu bar section height
const updateOverlayHeight = () => {
  const bodyHeight = document.body.scrollHeight;
  const asideHeight = menuAside.offsetHeight;
  menuOverlay.style.height = bodyHeight - asideHeight + "px";
};

window.onload = () => {
  updateOverlayHeight();
  // Update overlay height on window scroll
  window.addEventListener("scroll", updateOverlayHeight);
};

// Burger Menu disappears while resizing
const handleResize = () => {
  const windowWidth = window.innerWidth;
  const windowWidthSize = 850;
  windowWidth > windowWidthSize && isBurgerMenuOpen
    ? toggleMenu()
    : (burgerMenu.style.display = "flex");
};

window.addEventListener("resize", handleResize);
