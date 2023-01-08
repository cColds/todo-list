const taskSection = document.querySelector("#task-section");
const nav = document.querySelector("nav");

function setNavValue() {
	let { navOpened } = taskSection.dataset;
	navOpened = navOpened === "true" ? "false" : "true";
	taskSection.dataset.navOpened = navOpened;
}

function toggleNavigationBar() {
	nav.classList.toggle("hide");
	setNavValue();
}

const navHamburgerMenu = document.querySelector("#nav-hamburger-menu");
const headerHamburgerMenu = document.querySelector("#header-hamburger-menu");

navHamburgerMenu.addEventListener("click", toggleNavigationBar);
headerHamburgerMenu.addEventListener("click", toggleNavigationBar);
