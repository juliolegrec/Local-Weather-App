var currentLatitude,
		currentLongitude,
		KelvinTemp;

var a = 3;

var myRequest = new XMLHttpRequest();

navigator.geolocation.getCurrentPosition(function(position) {
   currentLatitude = position.coords.latitude;
   currentLongitude = position.coords.longitude;
   makeRequest(); 
});

// [43.3,5.38]

function makeRequest() {
	var method = "GET",
			// url = `http://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&APPID=5e54985f3712fd90887ced9539d73345`;
			url = `http://api.openweathermap.org/data/2.5/weather?lat=43&lon=5&APPID=5e54985f3712fd90887ced9539d73345`;
	myRequest.open(method, url, true);
	myRequest.onreadystatechange = displayInfo;
	myRequest.send();
}

function displayInfo() {
	if (myRequest.readyState === XMLHttpRequest.DONE && myRequest.status === 200) {
		var myResponseText = JSON.parse(myRequest.responseText);
		console.log(myResponseText);
		KelvinTemp = myResponseText.main.temp;
		document.querySelector('.temp').innerHTML = `${KelvinTemp - 273.15}&deg;C`;
		document.querySelector('.location').innerHTML = `Location: ${myResponseText.name}, ${myResponseText.sys.country}`;
		document.querySelector('.weather-description').innerHTML = myResponseText.weather[0].description;

		// Change weather icon...
		var mainWeather = myResponseText.weather[0].main,
				weatherIcon = document.querySelector('.weather-icon');
			if (mainWeather === "Clear Sky") {
				weatherIcon.src = "images/clear.svg";
			} else if (mainWeather === "Rain") {
				weatherIcon.src = "images/ModRainSwrsDay.svg";
			} else {
				console.log("something's not working");
			}
	}
}

// function getIconUrl() {
// 	var iconUrl;

// 	if (myResponseText.weather[0].main === "clear sky") {
// 		iconUrl = "images/clear.svg";
// 	} else if (myResponseText.weather[0].main === "Rain") {
// 		iconUrl = "images/ModRainSwrsDay.svg";
// 	} else {
// 		console.log("something's not working");
// 	}
// 	return iconUrl;
// }
