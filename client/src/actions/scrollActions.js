import { Observer } from "../helper/Observer";

export const scrolling = (action) => () => {
  let target = document.querySelector(".dummy");
  let options = {
    root: document.querySelector(".pageBox"),
    rootMargin: "0px",
    threshold: 0,
  };
  Observer.unobserve(target);
  Observer.observe(action, options, target);
};
