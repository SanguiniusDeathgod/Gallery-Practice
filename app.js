const images = [
  {
    image: `images/Titan-Legions-2.jpg`,
    Mini: `images/Titan-Legions-2.jpg`,
    alt: `This illustration by Geoff Taylor, was originally used on White Dwarf 179 &181 Titan Legions`,
  },
  {
    image: `images/Banelord-Titan-of-Khorne.jpg`,
    Mini: `images/Banelord-Titan-of-Khorne.jpg`,
    alt: `Banelord Titan of Khorne`,
  },
  {
    image: `images/Eldar-Warlock-Titan.jpg`,
    Mini: `images/Eldar-Warlock-Titan.jpg`,
    alt: `Eldar Warlock Titan`,
  },
  {
    image: `images/Mekboy-Gargant.jpg`,
    Mini: `images/Mekboy-Gargant.jpg`,
    alt: `Mekboy Gargant`,
  },
  {
    image: `images/Reaver-Titan.jpg`,
    Mini: `images/Reaver-Titan.jpg`,
    alt: `Reaver Titan`,
  },
  {
    image: "images/Warhound-Titan.jpg",
    Mini: "images/Warhound-Titan.jpg",
    alt: "Warhound Titan",
  },
];

let MiniGallery = document.getElementById("MiniGallery");
let currentImageIndex = 0;
const displayElem = document.getElementById("display");

// async
function init() {
  // await fetchImages()
  console.log(images);
  updateDisplayImage(images[currentImageIndex]);
  createMinis();
}

function createMinis() {
  for (let image of images) {
    let MiniImg = document.createElement("img");

    MiniImg.setAttribute("src", image.image);
    MiniImg.setAttribute("alt", image.alt);
    MiniImg.setAttribute("tabindex", "0");
    MiniImg.classList.add("Mini-image");
    MiniGallery.appendChild(MiniImg);
    MiniImg.addEventListener("click", function () {
      updateDisplayImage(image);
      document.getElementById("announcer").textContent = image.alt;
    });
    MiniImg.addEventListener("keydown", function (event) {
      document.getElementById("announcer").textContent = image.alt;
      if (event.key === "Enter") updateDisplayImage(image);
    });
  }
}

function updateScrollBar(currentImage) {
  let Minis = MiniGallery.querySelectorAll(".Mini-image");
  let activeMini;
  Minis.forEach(function (Mini) {
    if (Mini.getAttribute("src") === currentImage.Mini) {
      activeMini = Mini;
    }
  });

  if (activeMini) {
    const MiniRect = activeMini.getBoundingClientRect();
    const containerRect = MiniGallery.getBoundingClientRect();

    let scrollLeftPos =
      activeMini.offsetLeft + MiniRect.width / 2 - containerRect.width / 2;

    MiniGallery.scrollTo({
      left: scrollLeftPos,
      behavior: "smooth",
    });
  }
}

function updateDisplayImage(image) {
  let currentDisplayImage = displayElem.firstChild;

  if (!currentDisplayImage) {
    currentDisplayImage = document.createElement("img");
    displayElem.appendChild(currentDisplayImage);
  }

  currentDisplayImage.setAttribute("src", image.image);
  currentDisplayImage.setAttribute("alt", image.alt);
  updateScrollBar(image);
  document.getElementById("announcer").textContent = image.alt;
}

next.addEventListener("click", function () {
  selectNextImage(1);
});
prev.addEventListener("click", function () {
  selectNextImage(-1);
});

MiniContainerHideButton.addEventListener("click", function () {
  MiniGallery.classList.toggle("hidden");
  if (MiniGallery.classList.contains("hidden")) {
    MiniContainerHideButton.classList.add(
      "MiniContainerHideButton-MinisHidden"
    );
  } else {
    MiniContainerHideButton.classList.remove(
      "MiniContainerHideButton-MinisHidden"
    );
  }
});

function selectNextImage(index) {
  currentImageIndex += index;

  if (currentImageIndex >= images.length) currentImageIndex = 0;
  if (currentImageIndex < 0) currentImageIndex = images.length - 1;
  console.log(currentImageIndex);
  updateDisplayImage(images[currentImageIndex]);
}

window.onload = init;

// update our image depending on button press
// we have an array of indexes. We could say, something like
// if there isn't a current Image yet (like onload) intitalize one (0).
// if they press the next button, change the current image to index+1
// if they press the prev button, change the current image to index-1
// if the imageindex+1 would be greater then the length of the array, return 0 instead (so it goes back to the start of the images array)

window.addEventListener("keydown", handleArrowKeyPress);

function handleArrowKeyPress(event) {
  if (event.key === "ArrowRight") {
    selectNextImage(1);
  } else if (event.key === "ArrowLeft") {
    selectNextImage(-1);
  }
}
