const gallery = document.getElementById("gallery-list")
const photoLink = document.getElementById("photos")
const guestNameField = document.getElementById("guestName");
const guestMax = document.getElementById('guestAmt');
const submitButton = document.getElementById("submitBtn");
const guests = [
    ["Mom, Dad & Kolbe", 3],
    ["Mamliz", 1],
    ["Mr. Brickshane Tucker", 1],
    ["Granny, Ampa & Shawn", 3],
    ["Debbie, Kim & Michael", 3],
    ["Tia Gina & Ray", 2],
    ["Tia Modie, Tio Robert, Sanya & Tawny", 4],
    ["Robert & Chris", 2],
    ["Giselle & Adam", 2],
    ["Mrs. Anna Badillo", 2],
    ["Jose and Lela Riveroll", 2],
    ["Betty and Jose Moreno", 2],
    ["Ms. Nicolette Bautista", 1],
    ["Ms. Nina Chen", 1],
    ["Mr. Henry and Tammy Ramany", 2],
    ["Chris and Robert Garcia", 2],
    ["Ms. Celia Wallen", 1],
    ["Matthew Hulse", 2],
    ["Fr. Andres", 1],
    ["Mom and Dad", 2],
    ["Robby and Jay", 2],
    ["Grandma Ester", 1],
    ["Abuelita", 1],
    ["Tio Eric and Tia Peggy", 2],
    ["Tio Raf & Tia Dorita", 2],
    ["Rory & Seleny", 2],
    ["Tia Mutsi & JC", 2],
    ["Tia Maria", 1],
    ["Tia Melvi and Tio Trudes", 2],
    ["Tio Joe & Tia Carla", 2],
    ["Ms. Teann Marin", 1],
    ["Ms. Saskia Marin", 1],
    ["Tio Luigi and Andrea", 2],
    ["Mr. Moshea Smith", 1],
    ["Mr. Fallet Flowers", 1],
    ["Ms. Jiselle Vega", 1],
    ["Mr. Keenan Bernard", 2],
    ["Ms. Ritisha Hohenkirk", 1],
    ["Ms. Marissa Elrington", 1],
    ["Ms. Jennifer Cairns", 1],
    ["Irela & Luis Pastor", 2],
];
const scriptURL = 'https://script.google.com/macros/s/AKfycbytJOC8hYHkmTJESBCGVGdaarHE-LDrXlX1t0Fz9n-lV_4DiCKdzuZ46a1GdcozSqRMBQ/exec'
const form = document.forms['submit-to-google-sheet']
var fs = require('fs');
var files = fs.readdirSync('img/collage/');

//submit form data to google sheets
form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message))

    document.getElementById('form-wrapper').innerHTML = "<label class='formbold-form-label-2'>RSVP Submitted. <br><br> See you at the Wedding!</label>"
})

//start page with disabled button
submitButton.disabled = true;

/* repeat img in div for each img in /img */
files.foreach(loadGallery(currentValue, index));
function loadGallery(currentValue, index) {
    gallery.innerHTML += "<div class=\"col-sm-12 col-md-8\"><a class=\"lightbox\" href=\"img/collage/" + currentValue + "\"><img src=\"img/collage/href=\"img/collage/" + currentValue + " alt=\"\"></a></div>\n"
};

//adjust attendee/guest amount field and enable button only when a valid name is inputted
guestNameField.addEventListener("input", (e) => {
    guestMax.setAttribute('max', '0');
    guestMax.value = 0;
    submitButton.disabled = true;
    const selectedGuest = guests.filter(guest => guest[0].toLowerCase() === e.target.value.toLowerCase());
    guestMax.value = selectedGuest[0][1];
    guestMax.setAttribute("max", selectedGuest[0][1])
    submitButton.disabled = false;
});

var countDownDate = new Date("Jan 7, 2023 15:00:00").getTime();
const countdownValue = document.getElementById("days");

setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the countdown date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    if (days > 0) {
        countdownValue.innerHTML = days + " days left";
    } else if (hours > 0) {
        countdownValue.innerHTML = hours + " hours left";
    } else if (minutes > 0) {
        countdownValue.innerHTML = minutes + " minutes left";
    } else if (seconds > 0) {
        countdownValue.innerHTML = seconds + " seconds left";
    } else {
        countdownValue.innerHTML = "Marriage in progress";
    }

}, 1000);