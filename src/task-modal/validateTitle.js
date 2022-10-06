export function isValidTitle() {
	const title = document.querySelector("#title");
	return title.checkValidity();
}
