import { pubSub } from "./pubSub";

export const task = (function () {
	let name = "John";
	const taskProps = () => {
		pubSub.subscribe("task-created", () => console.log(name));
	};
	return { taskProps };
})();
