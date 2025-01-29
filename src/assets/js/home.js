// Animations
let header = document.querySelector("header");
let hugeTitle = document.getElementById("hugeTitle");

function resetAnimations() {
  gsap.killTweensOf(header);
  gsap.killTweensOf(hugeTitle);

  gsap.fromTo(
    header,
    {
      y: -100,
      opacity: 0,
      duration: 0.7,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      delay: 0.5,
    }
  );

  gsap.from(hugeTitle, {
    opacity: 0,
    duration: 1.4,
    delay: 0.5,
  });
  gsap.to(hugeTitle, {
    opacity: 1,
    duration: 1.4,
    delay: 0.5,
  });
}

resetAnimations();

window.addEventListener("resize", function () {
  resetAnimations();
});

// Actions

let menuIcon = document.getElementById("menuIcon");
let menu = document.querySelector("header nav");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("open");
  menu.classList.toggle("open");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    menuIcon.classList.remove("open");
    menu.classList.remove("open");
  }
});

// Search Box

const products = [
  { name: "iPhone 14 Pro", category: "Electronics" },
  { name: "Samsung Galaxy S23", category: "Electronics" },
  { name: "MacBook Air M2", category: "Computers" },
  { name: "Asus Gaming Laptop", category: "Computers" },
  { name: "Nike Running Shoes", category: "Clothing" },
  { name: "Adidas Sneakers", category: "Clothing" },
];
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const suggestionsBox = document.createElement("ul");
suggestionsBox.className = "suggestions";
searchBox.appendChild(suggestionsBox);

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

searchInput.addEventListener(
  "input",
  debounce(function () {
    const query = this.value.toLowerCase().trim();
    suggestionsBox.innerHTML = "";

    if (!query) {
      suggestionsBox.style.display = "none";
      suggestionsBox.style.opacity = "0";
      return;
    }

    const matches = products.filter((p) =>
      p.name.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      suggestionsBox.style.display = "none";
      suggestionsBox.style.opacity = "0";
      return;
    }

    const fragment = document.createDocumentFragment();
    matches.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = product.name;
      li.addEventListener("click", () => {
        searchInput.value = product.name;
        suggestionsBox.innerHTML = "";
        suggestionsBox.style.display = "none";
        suggestionsBox.style.opacity = "0";
      });
      fragment.appendChild(li);
    });

    suggestionsBox.appendChild(fragment);
    suggestionsBox.style.display = "flex";
    suggestionsBox.style.opacity = "1";
  }, 300)
);
