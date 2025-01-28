// Animations
let header = document.querySelector("header");
let searchIcon = document.getElementById("search");

gsap.from(header, {
  y: -100,
  opacity: 0,
  duration: 0.7,
});
gsap.to(header, {
  y: 0,
  opacity: 1,
  duration: 0.7,
  delay: 0.5,
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

searchIcon.addEventListener("click", () => {
  let searchBox = document.createElement("div");
  searchBox.className = "searchBox";

  let input = document.createElement("input");
  input.type = "text";
  input.id = "searchBar";
  input.placeholder = "Search in our store";

  let searchBtn = document.createElement("i");
  searchBtn.className = "fa-solid fa-magnifying-glass";
  searchBtn.id = "searchBtn";

  searchBox.appendChild(searchBtn);
  searchBox.appendChild(input);

  document.body.appendChild(searchBox);

  console.log("SearchBox created and added to the DOM:", searchBox);
});
