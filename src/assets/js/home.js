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

// - Products System
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filterBtn");
  const allProductsBtn = document.querySelector(".allProductsBtn");
  const submenu = document.querySelector(".submenu");
  const products = document.querySelectorAll(".product");

  const itemsPerPage = 6;
  let currentPage = 1;
  let totalPages = 1;
  let activeProducts = [...products];

  const paginationElements = {
    prevButton: document.querySelector(".prev"),
    nextButton: document.querySelector(".next"),
    pageNumber: document.querySelector(".page-number"),
  };

  let activeCategory = "all";

  const filterProducts = (category) => {
    activeCategory = category;

    activeProducts = [...products].filter((product) => {
      return category === "all" || product.dataset.category === category;
    });

    products.forEach((product) => {
      const isVisible = activeProducts.includes(product);
      const targetOpacity = isVisible ? 1 : 0;

      gsap.to(product, {
        opacity: targetOpacity,
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20,
        duration: 0.5,
        ease: "power3.out",
        onStart: () => {
          if (isVisible) product.style.display = "block";
        },
        onComplete: () => {
          if (!isVisible) product.style.display = "none";
        },
      });
    });

    currentPage = 1;
    updatePaginationSystem();
  };

  const updatePaginationSystem = () => {
    assignPageToProducts();
    totalPages = Math.ceil(activeProducts.length / itemsPerPage);

    paginationElements.prevButton.disabled = currentPage === 1;
    paginationElements.nextButton.disabled = currentPage === totalPages;
    paginationElements.pageNumber.textContent = currentPage;

    activeProducts.forEach((product, index) => {
      const page = Math.floor(index / itemsPerPage) + 1;
      product.style.display = page === currentPage ? "block" : "none";
    });

    products.forEach((product) => {
      if (!activeProducts.includes(product)) {
        product.style.display = "none";
      }
    });
  };

  const assignPageToProducts = () => {
    activeProducts.forEach((product, index) => {
      const page = Math.floor(index / itemsPerPage) + 1;
      product.dataset.page = page;
    });
  };

  paginationElements.prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updatePaginationSystem();
      scrollToFirstProduct();
    }
  });

  paginationElements.nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      updatePaginationSystem();
      scrollToFirstProduct();
    }
  });

  allProductsBtn.addEventListener("click", () => {
    submenu.classList.toggle("active");
    filterProducts("all");
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => {
        btn.parentNode.classList.remove("active");
        submenu.classList.remove("active");
      });
      button.parentNode.classList.toggle("active");
      filterProducts(button.dataset.category);
    });
  });

  const scrollToFirstProduct = () => {
    const firstVisible = activeProducts.find(
      (p) => p.dataset.page == currentPage
    );
    if (firstVisible) {
      firstVisible.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  filterProducts("all");
});

// Recomendations Sections

const recomendSwiper = new Swiper(".swiper-container", {
  slidesPerView: 3,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 2,
    },
  },
});
