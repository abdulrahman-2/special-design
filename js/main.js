// nav bar toggle icon
const toggleBtnIcon = document.querySelector(".drop-nav i");
const dropDownMenu = document.querySelector(".drop-nav-menu");

toggleBtnIcon.onclick = function () {
  dropDownMenu.classList.toggle("open");
  const isOpen = dropDownMenu.classList.contains("open");
  toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtnIcon && e.target !== dropDownMenu) {
    if (dropDownMenu.classList.contains("open")) {
      dropDownMenu.classList.toggle("open");
      const isOpen = dropDownMenu.classList.contains("open");
      toggleBtnIcon.classList = isOpen
        ? "fa-solid fa-xmark"
        : "fa-solid fa-bars";
    }
  }
});

// check if localStorage is not empty
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  const colorsList = document.querySelectorAll(".color-list li");
  // Remove "active" class from all lis
  colorsList.forEach((element) => {
    element.classList.remove("active");

    // Add "active" class to the clicked li with data color === localstorage item
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

// background option
let backgroundOption = true;
// variable to control the interval
let backgroundInterval;

// check if random background localStorage is not empty
let backLocalItem = localStorage.getItem("background_option");
if (backLocalItem !== null) {
  if (backLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  const randomBackEl = document.querySelectorAll(".random-backgrounds button");
  // Remove "active" class from all lis
  randomBackEl.forEach((element) => {
    element.classList.remove("active");

    // Add "active" class to the clicked li with data color === localstorage item
    if (backLocalItem === "true") {
      document.querySelector(".yes").classList.add("active");
    } else {
      document.querySelector(".no").classList.add("active");
    }
  });
}

// settings box
const settingBtnIcon = document.querySelector(".settings-box i");
const settingBox = document.querySelector(".settings-box");

settingBtnIcon.onclick = function () {
  settingBox.classList.toggle("open");
  settingBtnIcon.classList.toggle("fa-spin");
};

// switch color in setting box
const colorsList = document.querySelectorAll(".color-list li");
colorsList.forEach((li) => {
  li.addEventListener("click", (e) => {
    // Remove "active" class from all lis
    colorsList.forEach((element) => {
      element.classList.remove("active");
    });
    // set color in root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // set color in localStorage
    localStorage.setItem("color_option", e.target.dataset.color);

    // Add "active" class to the clicked li
    li.classList.add("active");
  });
});

// get landing page element
let landingPage = document.querySelector(".landing");
// get array of images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"];

randomizeBackground();
function randomizeBackground() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // get random number
      let rundomNumber = Math.floor(Math.random() * imgsArray.length);
      // change background image
      landingPage.style.backgroundImage = `url("media/image/0${rundomNumber}.jpg")`;
    }, 10000);
  }
}

// control random background
// switch random background
const randomBackEl = document.querySelectorAll(".random-backgrounds button");
randomBackEl.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Remove "active" class from all lis
    randomBackEl.forEach((e) => {
      e.classList.remove("active");
    });
    // Add "active" class to the clicked li
    btn.classList.add("active");

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeBackground();
      localStorage.setItem("background_option", backgroundOption);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", backgroundOption);
    }
  });
});

// Selecting the DOM element only once to improve performance
const aboutImage = document.querySelector(".about-img");

// Image URLs mapped to color codes
const colorImageMap = {
  "#ff9800": "media/image/ff9800.png",
  "#e91e63": "media/image/e91e63.png",
  "#009688": "media/image/009688.png",
  "#03a9f4": "media/image/03a9f4.png",
  "#4caf50": "media/image/4caf50.png",
  default: "media/image/ff9800.png",
};

// Retrieve selected image from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
  const storedImage =
    localStorage.getItem("selectedImage") || colorImageMap["default"];
  aboutImage.src = storedImage;
});

// Event delegation for better performance
colorsList.forEach((li) => {
  li.addEventListener("click", (e) => {
    const targetColor = e.target.dataset.color;
    if (targetColor) {
      const selectedImage =
        colorImageMap[targetColor] || colorImageMap["default"];

      // Set image source
      aboutImage.src = selectedImage;

      // Save selected image in local storage
      localStorage.setItem("selectedImage", selectedImage);
    }
  });
});

// way 2 to Retrieve selected image from local storage on page load

// check if image color in localStorage is not empty
// let imagelocalColor = localStorage.getItem("selectedImage");
// if (imagelocalColor !== null) {
//   aboutImage.src = imagelocalColor;
// }
// console.log(imagelocalColor);

let ourSkills = document.querySelector(".our-skills");

window.onscroll = () => {
  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;
  // skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // window height
  let windowHeight = window.innerHeight;
  // window scrollTop
  let windowScrollTop = window.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    // select progress span
    let spanProgress = document.querySelectorAll(".the-progress span");
    spanProgress.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// create gallery popup
let ourGallery = document.querySelectorAll(".our-gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay
    let overLay = document.createElement("div");
    overLay.classList.add("img-overlay");
    document.body.appendChild(overLay);

    // Create the main container div
    const popupBox = document.createElement("div");
    popupBox.classList.add("popup-box");

    // Check if img.alt is not empty
    if (img.alt !== "") {
      // Create h4 element with img.alt content
      const heading = document.createElement("h4");
      heading.textContent = img.alt;
      // Append h4 to popupBox
      popupBox.appendChild(heading);
    }

    // Create i element for the xmark
    const xmarkIcon = document.createElement("i");
    xmarkIcon.classList.add("fa-solid", "fa-xmark", "xmarkIcon");
    // Append xmarkIcon to popupBox
    popupBox.appendChild(xmarkIcon);

    // Create img element
    const image = document.createElement("img");
    image.src = img.src;
    image.alt = "";
    // Append img to popupBox
    popupBox.appendChild(image);

    // Append the popupBox to the body
    document.body.appendChild(popupBox);
  });
});

document.addEventListener("click", (e) => {
  // Check if the clicked element has the "fa-xmark" class
  if (e.target.classList.contains("xmarkIcon")) {
    // Remove the parent node of the clicked element
    e.target.parentNode.remove();
    // Remove the element with the class "img-overlay"
    document.querySelector(".img-overlay").remove();
  }
});

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// // handle active state
// function handleActive(ev) {
//   // Remove "active" class from all lis
//   randomBackEl.forEach((ev) => {
//     ev.classList.remove("active");
//   });
//   // Add "active" class to the clicked li
//   btn.classList.add("active");
// }

let bulletsSpan = document.querySelectorAll(".bullets-option button");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsLocal = localStorage.getItem("bullets-option");

if (bulletsLocal !== null) {
  // Remove "active" class from all button
  bulletsSpan.forEach((e) => {
    e.classList.remove("active");
  });

  if (bulletsLocal === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    if (bullet.dataset.background === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
    // Remove "active" class from all button
    bulletsSpan.forEach((e) => {
      e.classList.remove("active");
    });
    // Add "active" class to the clicked button
    bullet.classList.add("active");
  });
});

// reset option button
document.querySelector(".reset-option").onclick = function () {
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("selectedImage");
  localStorage.removeItem("bullets-option");
  location.reload();
};
