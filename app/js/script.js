// Script to test Geoloation; Got the current location in the end.

var x = document.querySelector('.demo');
var btn = document.querySelector('.getLocationBtn');

x.innerHTML = "It works!";

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showPosition(position) {
	x.innerHTML = "Latitude: " + position.coords.latitude + 
	"<br>Longitude: " + position.coords.longitude; 
}

btn.addEventListener('click', function(){
	getLocation();
})

