//change header transparancy while scrolling
const header = document.querySelector(".header-container");
const handleScroll = () => {
  window.scrollY > 84
    ? header.classList.add("transparent")
    : header.classList.remove("transparent");
};
window.addEventListener("scroll", handleScroll);
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
};
burgerMenu.addEventListener("click", toggleMenu);
// close aside menu bar
window.addEventListener("click", (e) => {
  if (
    isMenuOpen &&
    e.target !== aside &&
    !aside.contains(e.target) &&
    e.target !== asideOverlay &&
    !asideOverlay.contains(e.target)
  ) {
    toggleMenu();
  }
});

// aside section height
window.onload = () => {
  const bodyHeight = document.body.scrollHeight;
  asideOverlay.style.height = bodyHeight - header.style.height + "px";
};
// Burger Menu disappears while resizing
const handleResize = () => {
  const windowWidth = window.innerWidth;
  windowWidth > 850 && isMenuOpen
    ? toggleMenu()
    : (burgerMenu.style.display = "flex");
};

window.addEventListener("resize", handleResize);

// partners slider
const rightArrow = document.getElementById("rightArrow");
const leftArrow = document.getElementById("leftArrow");
const partnersLists = document.querySelectorAll(".partners-list-wrapper");
const dotSlider = document.querySelectorAll(".dot");
let currentIndex = 0;

const showCurrentList = () => {
  partnersLists.forEach((el, index) => {
    if (index === currentIndex) {
      el.classList.remove("d-none");
      if (dotSlider[index]) {
        dotSlider[index].classList.add("dot-selected");
      }
    } else {
      el.classList.add("d-none");
      if (dotSlider[index]) {
        dotSlider[index].classList.remove("dot-selected");
      }
    }
  });
};
// dot slider
const dotContainer = document.querySelector(".slider-dots-container");

const handleDotSlider = (e) => {
  const currentDot = e.target.closest("li");
  if (!currentDot) return;
  dotSlider.forEach((slider, index) => {
    if (slider === currentDot) {
      if (partnersLists[index].classList.contains("d-none"))
        partnersLists[index].classList.remove("d-none");
      currentDot.classList.add("dot-selected");
    } else {
      partnersLists[index].classList.add("d-none");
      slider.classList.remove("dot-selected");
    }
  });
};
dotContainer.addEventListener("click", handleDotSlider);
// rightArrow
const handleRightArrow = () => {
  currentIndex = (currentIndex + 1) % partnersLists.length;
  showCurrentList();
};
rightArrow.addEventListener("click", handleRightArrow);
// automatic scroll
let intervalId = setInterval(handleRightArrow, 5000);
rightArrow.addEventListener("mouseenter", () => clearInterval(intervalId));
rightArrow.addEventListener(
  "mouseleave",
  () => (intervalId = setInterval(handleRightArrow, 5000))
);

leftArrow.addEventListener("mouseenter", () => clearInterval(intervalId));
leftArrow.addEventListener(
  "mouseleave",
  () => (intervalId = setInterval(handleRightArrow, 5000))
);

// leftArrow
const handleLeftArrow = () => {
  currentIndex =
    (currentIndex - 1 + partnersLists.length) % partnersLists.length;
  showCurrentList();
};
leftArrow.addEventListener("click", handleLeftArrow);

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
