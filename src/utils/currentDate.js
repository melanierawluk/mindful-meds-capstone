const today = new Date();

const month = today.getMonth();
export const day = today.getDate();
const dayOfWeek = today.getDay();

export const dayArr = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

const monthArr = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

export const currentDate = `${monthArr[month]} ${day}`

export const currentDay = dayArr[dayOfWeek];