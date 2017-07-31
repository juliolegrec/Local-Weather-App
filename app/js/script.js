var currentLatitude,
		currentLongitude,
		KelvinTemp;

var timeNow = Math.floor((new Date()).getTime() / 1000);

var myRequest = new XMLHttpRequest();

navigator.geolocation.getCurrentPosition(function(position) {
   currentLatitude = position.coords.latitude;
	 currentLongitude = position.coords.longitude;
   makeRequest(); 
});

function makeRequest() {
	var method = "GET",
			url = `http://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&APPID=5e54985f3712fd90887ced9539d73345`;
			// url = `http://api.openweathermap.org/data/2.5/weather?lat=-20.16&lon=57.5&APPID=5e54985f3712fd90887ced9539d73345`;
	myRequest.open(method, url, true);
	myRequest.onreadystatechange = displayInfo;
	myRequest.send();
}

function displayInfo() {
	if (myRequest.readyState === XMLHttpRequest.DONE && myRequest.status === 200) {
		var myResponseText = JSON.parse(myRequest.responseText);
		console.log(myResponseText);
		KelvinTemp = myResponseText.main.temp;
		document.querySelector('.temp').innerHTML = `${Math.round(KelvinTemp - 273.15)}&deg;C`;
		document.querySelector('.location').innerHTML = `Location: ${myResponseText.name}, ${myResponseText.sys.country}`;
		document.querySelector('.weather-description').innerHTML = myResponseText.weather[0].description;

		// Change weather icon...
		var mainWeather = myResponseText.weather[0].main,
				weatherIcon = document.querySelector('.weather-icon');
			if (mainWeather === "Clear") {
				if (timeNow >= myResponseText.sys.sunrise && timeNow <= myResponseText.sys.sunset) {
					weatherIcon.src = "images/sunny.svg";
				} else {
					weatherIcon.src = "images/clear.svg";
				}
			} else if (mainWeather === "Rain") {
				if (timeNow >= myResponseText.sys.sunrise && timeNow <= myResponseText.sys.sunset) {
					weatherIcon.src = "images/ModRainSwrsDay.svg";
				} else {
					weatherIcon.src = "images/ModRainSwrsNight.svg";
				}
			} else {
				console.log("something's not working");
			}
	}
}