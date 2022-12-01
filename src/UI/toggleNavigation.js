const gridLayout = document.querySelector("#grid-layout");
const nav = document.querySelector("nav");

export const toggleNavigationBar = () => {
	nav.classList.toggle("hide");
	mainHamburgerMenu.classList.toggle("hide");
	setNavValue();
};

const setNavValue = () => {
	const isNavOpen = gridLayout.dataset.navOpened === "true";
	if (isNavOpen) gridLayout.dataset.navOpened = "false";
	else gridLayout.dataset.navOpened = "true";
	console.log(gridLayout.dataset.navOpened);
};

const navHamburgerMenu = document.querySelector("#nav-hamburger-menu");
navHamburgerMenu.addEventListener("click", toggleNavigationBar);

const mainHamburgerMenu = document.querySelector("#main-hamburger-menu");
mainHamburgerMenu.addEventListener("click", toggleNavigationBar);
