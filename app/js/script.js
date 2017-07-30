// Getting location from current position
var currentLongitude,
		currentLatitude;

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
				return position;
		});
	} else {
		console.log("Not supported");		
	}

	currentLongitude = position.coords.longitude;
	currentLatitude = position.coords.latitude;

	return [currentLongitude, currentLatitude];

}

var currentPosition = getLocation();

console.log(currentPosition);