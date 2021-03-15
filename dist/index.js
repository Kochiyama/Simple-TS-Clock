"use strict";
exports.__esModule = true;
var themes = {
    latenight: {
        backgroundColor: '#120136',
        textColor: '#ffffff',
        clockColor: '#40bad5'
    },
    morning: {
        backgroundColor: '#95F0EE',
        textColor: '#BFBFBF',
        clockColor: '#eca0b6'
    },
    evening: {
        backgroundColor: '#511845',
        textColor: '#ff5733',
        clockColor: '#c70039'
    },
    night: {
        backgroundColor: '#1f4068',
        textColor: '#ffffff',
        clockColor: '#e43f5a'
    }
};
var setTheme = function (page, theme) {
    page.body.style.backgroundColor = theme.backgroundColor;
    page.header.style.color = theme.textColor;
    page.footer.style.color = theme.textColor;
    page.clockContainer.style.color = theme.clockColor;
};
var setThemeBasedOnDayHours = function (hour, page) {
    //verify hour to change the theme
    if (hour >= 0 && hour <= 4) {
        setTheme(page, themes.latenight);
    }
    else if (hour <= 11) {
        setTheme(page, themes.morning);
    }
    else if (hour <= 18) {
        setTheme(page, themes.evening);
    }
    else {
        setTheme(page, themes.night);
    }
};
var weekdayDictionary = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
var convertWeekdayNumberToName = function (weekdayNumber) {
    return weekdayDictionary[weekdayNumber];
};
var page = {
    clock: document.querySelector('.clock'),
    weekday: document.querySelector('.weekday'),
    body: document.querySelector('body'),
    header: document.querySelector('.title_container'),
    footer: document.querySelector('.footer'),
    clockContainer: document.querySelector('.clock_container')
};
function updateClock() {
    var actualDate = new Date();
    var weekday = convertWeekdayNumberToName(actualDate.getDay());
    var timeString = actualDate.toTimeString().slice(0, 8);
    setThemeBasedOnDayHours(actualDate.getHours(), page);
    // update if isn't the same
    if (page.weekday.innerHTML != weekday) {
        page.weekday.innerHTML = weekday;
    }
    //update the clock time
    page.clock.innerHTML = timeString;
}
//remove 1 second delay to first update of clock
updateClock();
//infinite loop that executes the updateClock function every second(declarated as a const at the top)
setInterval(updateClock, 1000);
