const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");

document.querySelector(".nav-icon").addEventListener("click", function() {
  cartOverlay.classList.add("transparentBcg");
  cartDOM.classList.add("showCart");
});

document.querySelector(".close-cart").addEventListener("click", function() {
  hideCart();
});

hideCart = function() {
  cartOverlay.classList.remove("transparentBcg");
  cartDOM.classList.remove("showCart");
};

document.querySelector(".getPDF").addEventListener("click", function() {
  downloadpdf();
});

downloadpdf = function() {
  window.open("Harvard_referencing.pdf");
};
