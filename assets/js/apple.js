const newsletter = document.querySelector(".newsletter"),
  newsletterEmailInput = document.querySelector("#input--email"),
  closeNewsletterBtn = document.querySelector("#close-newsletter"),
  sendNewsletterBtn = document.querySelector("#send-email"),
  sendNewsletterBtnValue = sendNewsletterBtn.querySelector(".action"),
  plane = document.querySelector(".plane"),
  background = document.querySelector(".background"),
  animationSpeed = 400;

const removeSlideInClass = () => {
  setTimeout(() => {
    newsletter.classList.remove("slideIn");
  }, animationSpeed);
};

removeSlideInClass();

const resetPopUp = () => {
  sendNewsletterBtnValue.textContent = "submit";
  sendNewsletterBtn.disabled = false;
  newsletterEmailInput.disabled = false;
  newsletterEmailInput.value = "";
  newsletterEmailInput.classList.remove("input--invalid");
  newsletterEmailInput.classList.remove("input--valid");
  sendNewsletterBtn.classList.remove("btn--valid");
  plane.style = "";
};

const toggleAnimation = () => {
  if (!newsletter.classList.contains("slideOut")) {
    newsletter.classList.remove("slideIn");
    newsletter.classList.add("slideOut");
    background.classList.remove("darken");
  } else {
    newsletter.classList.remove("slideOut");
    newsletter.classList.add("slideIn");
    removeSlideInClass(animationSpeed);
    background.classList.add("darken");
  }
};

closeNewsletterBtn.addEventListener("click", function () {
  window.open("./lottery.html", "_self");
});

sendNewsletterBtn.addEventListener("click", function () {
  window.open("./lottery.html", "_self");
});
newsletterEmailInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    handleEmail();
  }
});
