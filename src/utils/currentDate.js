const today = new Date();

const month = today.getMonth();
const day = today.getDate();

const monthArr = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const currentDate = `${monthArr[month]} ${day}`

export default currentDate;
