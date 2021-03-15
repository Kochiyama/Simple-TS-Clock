export interface PageInterface {
	clock: HTMLDivElement;
	weekday: HTMLDivElement;
	body: HTMLBodyElement;
	header: HTMLElement;
	footer: HTMLElement;
	clockContainer: HTMLDivElement;
}

export interface ThemeInterface {
	backgroundColor: string;
	textColor: string;
	clockColor: string;
}

export interface ThemesInterface {
	latenight: ThemeInterface;
	morning: ThemeInterface;
	evening: ThemeInterface;
	night: ThemeInterface;
}

const themes: ThemesInterface = {
	latenight: {
		backgroundColor: '#120136',
		textColor: '#ffffff',
		clockColor: '#40bad5',
	},

	morning: {
		backgroundColor: '#95F0EE',
		textColor: '#BFBFBF',
		clockColor: '#eca0b6',
	},

	evening: {
		backgroundColor: '#511845',
		textColor: '#ff5733',
		clockColor: '#c70039',
	},

	night: {
		backgroundColor: '#1f4068',
		textColor: '#ffffff',
		clockColor: '#e43f5a',
	},
};

const setTheme = (page: PageInterface, theme: ThemeInterface): void => {
	page.body.style.backgroundColor = theme.backgroundColor;
	page.header.style.color = theme.textColor;
	page.footer.style.color = theme.textColor;
	page.clockContainer.style.color = theme.clockColor;
};

const setThemeBasedOnDayHours = (hour: number, page: PageInterface): void => {
	//verify hour to change the theme
	if (hour >= 0 && hour <= 4) {
		setTheme(page, themes.latenight);
	} else if (hour <= 11) {
		setTheme(page, themes.morning);
	} else if (hour <= 18) {
		setTheme(page, themes.evening);
	} else {
		setTheme(page, themes.night);
	}
};

const weekdayDictionary: string[] = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

const convertWeekdayNumberToName = (weekdayNumber: number): string => {
	return weekdayDictionary[weekdayNumber];
};

const page: PageInterface = {
	clock: document.querySelector('.clock'),
	weekday: document.querySelector('.weekday'),
	body: document.querySelector('body'),
	header: document.querySelector('.title_container'),
	footer: document.querySelector('.footer'),
	clockContainer: document.querySelector('.clock_container'),
};

const updateClock = () => {
	const actualDate: Date = new Date();
	const weekday: string = convertWeekdayNumberToName(actualDate.getDay());
	const timeString: string = actualDate.toTimeString().slice(0, 8);

	setThemeBasedOnDayHours(actualDate.getHours(), page);

	// update if isn't the same
	if (page.weekday.innerHTML != weekday) {
		page.weekday.innerHTML = weekday;
	}

	//update the clock time
	page.clock.innerHTML = timeString;
};

//remove 1 second delay to first update of clock
updateClock();

//infinite loop that executes the updateClock function every second(declarated as a const at the top)
setInterval(updateClock, 1000);
