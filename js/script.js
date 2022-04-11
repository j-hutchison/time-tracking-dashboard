// DOM ELEMENTS
const filterMenu = document.querySelector(".duration-filter");
const filterMenuLinks = document.querySelectorAll(".filter-link");

const tileWorkCurrentValue = document.querySelector(".work-current");
const tileWorkPreviousValue = document.querySelector(".work-previous");
const tilePlayCurrentValue = document.querySelector(".play-current");
const tilePlayPreviousValue = document.querySelector(".play-previous");
const tileStudyCurrentValue = document.querySelector(".study-current");
const tileStudyPreviousValue = document.querySelector(".study-previous");
const tileExerciseCurrentValue = document.querySelector(".exercise-current");
const tileExercisePreviousValue = document.querySelector(".exercise-previous");
const tileSocialCurrentValue = document.querySelector(".social-current");
const tileSocialPreviousValue = document.querySelector(".social-previous");
const tileSelfcareCurrentValue = document.querySelector(".selfcare-current");
const tileSelfcarePreviousValue = document.querySelector(".selfcare-previous");

// Class definitions
class Activity {
	constructor(name, duration, day, week, month = 0) {
		this.name = name;
		this.duration = duration;
		this.day = day;
		this.week = week;
		this.month = month;
	}
}

class DashboardTile {
	#activity;
	#current;
	#previous;

	constructor(activity, current, previous) {
		this.#activity = activity;
		this.#current = current;
		this.#previous = previous;
	}

	get getActivity() {
		return this.#activity;
	}

	get getCurrent() {
		return this.#current;
	}

	get getPrevious() {
		return this.#previous;
	}

	incrementCurrent(val) {
		this.#current += val;
	}

	incrementPrevious(val) {
		this.#previous += val;
	}
}

class Dashboard {
	#activities = [];
	#tiles = [];

	constructor(activities) {
		this.setActivities(activities);
	}

	getDashboard(type) {
		const thisWeek = 2;
		const today = 2;

		this.#tiles = [];
		this.#activities.forEach((activity) => {
			let currentTileIndex = this.#tiles.findIndex(
				(tile) => tile.getActivity === activity.name
			);
			console.log(`currentTileIndex ${currentTileIndex}`);
			console.log(`activity.duration ${activity.duration}`);

			if (type === "daily") {
				if (activity.day === today && activity.week === thisWeek) {
					if (currentTileIndex > -1) {
						this.#tiles[currentTileIndex].incrementCurrent(activity.duration);
					} else {
						console.log(`${activity.name}`);
						this.#tiles.push(
							new DashboardTile(activity.name, activity.duration, 0)
						);
					}
				} else if (activity.day === today - 1 && activity.week === thisWeek) {
					if (currentTileIndex > -1) {
						this.#tiles[currentTileIndex].incrementPrevious(activity.duration);
					} else {
						console.log(`${activity.name}`);
						this.#tiles.push(
							new DashboardTile(activity.name, 0, activity.duration)
						);
					}
				}
			} else if (type === "weekly") {
				if (activity.week === thisWeek) {
					if (currentTileIndex > -1) {
						this.#tiles[currentTileIndex].incrementCurrent(activity.duration);
					} else {
						this.#tiles.push(
							new DashboardTile(activity.name, activity.duration, 0)
						);
					}
				} else if (activity.week === thisWeek - 1) {
					if (currentTileIndex > -1) {
						this.#tiles[currentTileIndex].incrementPrevious(activity.duration);
					} else {
						this.#tiles.push(
							new DashboardTile(activity.name, 0, activity.duration)
						);
					}
				}
			}
			console.log(this.#tiles);
		});
	}
	renderDashboard() {
		this.#tiles.forEach((tile) => {
			document.querySelector(
				`.${tile.getActivity.toLowerCase()}-current`
			).innerHTML = `${tile.getCurrent}hrs`;

			document.querySelector(
				`.${tile.getActivity.toLowerCase()}-previous`
			).innerHTML = `Last Week - ${tile.getPrevious}hrs`;
		});
	}
	setActivities(activities) {
		activities.forEach((activity) => this.#activities.push(activity));
	}
	getActivity(name) {
		return this.#activities.find((activity) => activity.name === name);
	}
}

class App {
	// variables to store the activities on the db
	#w1d1work;
	#w1d2work;
	#w1d1play;
	#w1d2play;
	#w1d1study;
	#w1d2study;
	#w1d1exercise;
	#w1d2exercise;
	#w1d1social;
	#w1d2social;
	#w1d1selfCare;
	#w1d2selfCare;
	#w2d1work;
	#w2d2work;
	#w2d1play;
	#w2d2play;
	#w2d1study;
	#w2d2study;
	#w2d1exercise;
	#w2d2exercise;
	#w2d1social;
	#w2d2social;
	#w2d1selfCare;
	#w2d2selfCare;

	// variable to store the current dashboard
	dashboard;

	constructor() {
		this.dashboard = new Dashboard(this.#getData());

		filterMenu.addEventListener("click", this.#handleClick.bind(this));
	}

	#getData() {
		// week 1 values
		this.#w1d1work = new Activity("work", 5, 1, 1);
		this.#w1d2work = new Activity("work", 7, 2, 1);
		this.#w1d1play = new Activity("play", 1, 1, 1);
		this.#w1d2play = new Activity("play", 2, 2, 1);
		this.#w1d1study = new Activity("study", 2, 1, 1);
		this.#w1d2study = new Activity("study", 1, 2, 1);
		this.#w1d1exercise = new Activity("exercise", 1, 1, 1);
		this.#w1d2exercise = new Activity("exercise", 2, 2, 1);
		this.#w1d1social = new Activity("social", 1, 1, 1);
		this.#w1d2social = new Activity("social", 1, 2, 1);
		this.#w1d1selfCare = new Activity("selfcare", 0, 1, 1);
		this.#w1d2selfCare = new Activity("selfcare", 1, 2, 1);

		// week 2 values
		this.#w2d1work = new Activity("work", 3, 1, 2);
		this.#w2d2work = new Activity("work", 2, 2, 2);
		this.#w2d1play = new Activity("play", 2, 1, 2);
		this.#w2d2play = new Activity("play", 2, 2, 2);
		this.#w2d1study = new Activity("study", 1, 1, 2);
		this.#w2d2study = new Activity("study", 2, 2, 2);
		this.#w2d1exercise = new Activity("exercise", 1, 1, 2);
		this.#w2d2exercise = new Activity("exercise", 1, 2, 2);
		this.#w2d1social = new Activity("social", 2, 1, 2);
		this.#w2d2social = new Activity("social", 3, 2, 2);
		this.#w2d2selfCare = new Activity("selfcare", 0, 2, 2);
		this.#w2d1selfCare = new Activity("selfcare", 0, 1, 2);

		return [
			this.#w1d1work,
			this.#w1d2work,
			this.#w1d1play,
			this.#w1d2play,
			this.#w1d1study,
			this.#w1d2study,
			this.#w1d1exercise,
			this.#w1d2exercise,
			this.#w1d1social,
			this.#w1d2social,
			this.#w1d2selfCare,
			this.#w1d1selfCare,
			this.#w2d1work,
			this.#w2d2work,
			this.#w2d1play,
			this.#w2d2play,
			this.#w2d1study,
			this.#w2d2study,
			this.#w2d1exercise,
			this.#w2d2exercise,
			this.#w2d1social,
			this.#w2d2social,
			this.#w2d2selfCare,
			this.#w2d1selfCare,
		];
	}

	#handleClick(e) {
		console.log(e.target);
		let type = e.target.innerHTML.toLowerCase();
		console.log(type);

		if (!e.target.classList.contains("filter-link")) return;

		this.dashboard.getDashboard(type);
		// remove active class from links
		filterMenuLinks.forEach((el) => el.classList.remove("filter-link--active"));
		// add active class to clicked link
		e.target.classList.add("filter-link--active");
		this.dashboard.renderDashboard();
	}
}

const app = new App();

// Work 5hrs
// <!-- daily -->
// Previous - 7hrs
// <!-- daily -->
// 32hrs
// <!-- weekly -->
// Previous - 36hrs
// <!-- weekly -->
// 103hrs
// <!-- monthly -->
// Previous - 128hrs
// <!-- monthly -->

// Play 1hr
// <!-- daily -->
// Previous - 2hrs
// <!-- daily -->
// 10hrs
// <!-- weekly -->
// Previous - 8hrs
// <!-- weekly -->
// 23hrs
// <!-- monthly -->
// Previous - 29hrs
// <!-- monthly -->

// Study 0hrs
// <!-- daily -->
// Previous - 1hr
// <!-- daily -->
// 4hrs
// <!-- weekly -->
// Previous - 7hrs
// <!-- weekly -->
// 13hrs
// <!-- monthly -->
// Previous - 19hrs
// <!-- monthly -->

// Exercise 1hr
// <!-- daily -->
// Previous - 1hr
// <!-- daily -->
// 4hrs
// <!-- weekly -->
// Previous - 5hrs
// <!-- weekly -->
// 11hrs
// <!-- monthly -->
// Previous - 18hrs
// <!-- monthly -->

// Social 1hr
// <!-- daily -->
// Previous - 3hrs
// <!-- daily -->
// 5hrs
// <!-- weekly -->
// Previous - 10hrs
// <!-- weekly -->
// 21hrs
// <!-- monthly -->
// Previous - 23hrs
// <!-- monthly -->

// Self Care 0hrs
// <!-- daily -->
// Previous - 1hr
// <!-- daily -->
// 2hrs
// <!-- weekly -->
// Previous - 2hrs
// <!-- weekly -->
// 7hrs
// <!-- monthly -->
// Previous - 11hrs
// <!-- monthly -->
