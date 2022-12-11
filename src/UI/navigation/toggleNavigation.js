const gridLayout = document.querySelector("#grid-layout");
const nav = document.querySelector("nav");

export const toggleNavigationBar = () => {
	nav.classList.toggle("hide");
	setNavValue();
};

const setNavValue = () => {
	let { navOpened } = gridLayout.dataset;
	navOpened = navOpened === "true" ? "false" : "true";
};

const navHamburgerMenu = document.querySelector("#nav-hamburger-menu");
navHamburgerMenu.addEventListener("click", toggleNavigationBar);

const headerHamburgerMenu = document.querySelector("#header-hamburger-menu");
headerHamburgerMenu.addEventListener("click", toggleNavigationBar);
