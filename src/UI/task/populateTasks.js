import { pubSub } from "../../pubsub";

pubSub.subscribe("today-task-selected", (todayTaskArray) => {
	console.log(todayTaskArray);
});

let joe;
export { joe };
