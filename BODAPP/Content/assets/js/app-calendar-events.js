"use strict";
let date = new Date(),
    nextDay = new Date(new Date().getTime() + 864e5),
    nextMonth = 11 === date.getMonth() ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1),
    prevMonth = 11 === date.getMonth() ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1);
console.log(JSON.parse(localStorage.getItem('calender')));

window.events = JSON.parse(localStorage.getItem('calender'));
//    [
//    { id: 1, url: "", title: "Design Review", start: date, end: nextDay, allDay: !1, groupId:"Multiple" } ,
//    { id: 2, url: "", title: "Meeting With Client", start: new Date(date.getFullYear(), date.getMonth() + 1, -11), end: new Date(date.getFullYear(), date.getMonth() + 1, -10), allDay: !0, groupId:"Multiple" } ,
//    { id: 3, url: "", title: "Family Trip", allDay: !0, start: new Date(date.getFullYear(), date.getMonth() + 1, -9), end: new Date(date.getFullYear(), date.getMonth() + 1, -7), groupId:"Maintenance" } ,
//    { id: 4, url: "", title: "Doctor's Appointment", start: new Date(date.getFullYear(), date.getMonth() + 1, -11), end: new Date(date.getFullYear(), date.getMonth() + 1, -10), groupId:"Single" } ,
//    { id: 5, url: "", title: "Dart Game?", start: new Date(date.getFullYear(), date.getMonth() + 1, -13), end: new Date(date.getFullYear(), date.getMonth() + 1, -12), allDay: !0, groupId:"Multiple" } ,
//    { id: 6, url: "", title: "Meditation", start: new Date(date.getFullYear(), date.getMonth() + 1, -13), end: new Date(date.getFullYear(), date.getMonth() + 1, -12), allDay: !0, groupId:"Single" } ,
//    { id: 7, url: "", title: "Dinner", start: new Date(date.getFullYear(), date.getMonth() + 1, -13), end: new Date(date.getFullYear(), date.getMonth() + 1, -12), groupId:"Maintenance" } ,
//    { id: 8, url: "", title: "Product Review", start: new Date(date.getFullYear(), date.getMonth() + 1, -13), end: new Date(date.getFullYear(), date.getMonth() + 1, -12), allDay: !0, groupId:"Multiple" } ,
//    { id: 9, url: "", title: "Monthly Meeting", start: nextMonth, end: nextMonth, allDay: !0, groupId:"Multiple" } ,
//    { id: 10, url: "", title: "Monthly Checkup", start: prevMonth, end: prevMonth, allDay: !0, groupId:"Single" } ,
//];
