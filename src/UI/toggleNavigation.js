const nav = document.querySelector("nav");
export const toggleNavigationBar = () => {
	nav.classList.toggle("hide");
	mainHamburgerMenu.classList.toggle("hide");
};

const navHamburgerMenu = document.querySelector("#nav-hamburger-menu");
navHamburgerMenu.addEventListener("click", toggleNavigationBar);

const mainHamburgerMenu = document.querySelector("#main-hamburger-menu");
mainHamburgerMenu.addEventListener("click", toggleNavigationBar);
