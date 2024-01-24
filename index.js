// header scroll
const header = document.querySelector(".header-container");
const handleScroll = () => {
  window.scrollY > 0
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
// let intervalId = setInterval(handleRightArrow, 5000);
// rightArrow.addEventListener("mouseenter", () => clearInterval(intervalId));
// rightArrow.addEventListener(
//   "mouseleave",
//   () => (intervalId = setInterval(handleRightArrow, 5000))
// );

// leftArrow.addEventListener("mouseenter", () => clearInterval(intervalId));
// leftArrow.addEventListener(
//   "mouseleave",
//   () => (intervalId = setInterval(handleRightArrow, 5000))
// );

// // leftArrow
// const handleLeftArrow = () => {
//   // clearInterval(intervalId);
//   currentIndex =
//     (currentIndex - 1 + partnersLists.length) % partnersLists.length;
//   showCurrentList();
// };
// leftArrow.addEventListener("click", handleLeftArrow);

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
      downArrow.classList.toggle("d-none");
      upArrow.classList.toggle("d-none");
      accordionAnswers.classList.toggle("d-none");
    } else {
      downArrow.classList.remove("d-none");
      upArrow.classList.add("d-none");
      accordionAnswers.classList.add("d-none");
    }
  });
};

accordionWrapper.addEventListener("click", handleClick);
