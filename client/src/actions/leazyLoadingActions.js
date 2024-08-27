export const leazyLoading = () => () => {
  let options = {
    root: document.querySelector(".pageBox"),
    rootMargin: "0px",
    threshold: 0,
  };

  let targets = document.querySelectorAll(".thump-img");
  if (targets.length <= 0) return;
  targets.forEach((img) => imgObserver(img));

  function imgObserver(img) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentImg = entry.target;
          currentImg.src = currentImg.dataset.src;
          observer.unobserve(img);
        }
      });
    }, options);
    observer.observe(img);
  }
};
