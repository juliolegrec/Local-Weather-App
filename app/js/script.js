var currentLatitude,
		currentLongitude,
		KelvinTemp;

var myRequest = new XMLHttpRequest();

navigator.geolocation.getCurrentPosition(function(position) {
   currentLatitude = position.coords.latitude;
   currentLongitude = position.coords.longitude;
   makeRequest(); 
});

function makeRequest() {
	var method = "GET",
			url = `http://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&APPID=5e54985f3712fd90887ced9539d73345`;
	myRequest.open(method, url, true);
	myRequest.onreadystatechange = displayInfo;
	myRequest.send();
}

function displayInfo() {
	if (myRequest.readyState === XMLHttpRequest.DONE && myRequest.status === 200) {
		var myResponseText = JSON.parse(myRequest.responseText);
		console.log(myResponseText);
		KelvinTemp = myResponseText.main.temp;
		// document.querySelector('.weather-icon').style.background = `url('${iconUrl}')`; 
		document.querySelector('.location').innerHTML = `Location: ${myResponseText.name}`;
		document.querySelector('.temp').innerHTML = `${KelvinTemp - 273.15}&deg;C`;
		document.querySelector('.weather-description').innerHTML = myResponseText.weather[0].description;
		if (myResponseText.weather[0].main === "rain") {
			console.log(myResponseText.weather[0].main);
		}
	}
}

// function getIconUrl() {
// 	var iconUrl;

// 	if (myResponseText.weather[0].main === "clear sky") {
// 		iconUrl = "../images/clear.svg";
// 	} else if (myResponseText.weather[0].main === "rain") {
// 		iconUrl = "../images/ModRainSwrsDay.svg";
// 	} else {
// 		console.log("something's not working");
// 	}
// 	return iconUrl;
// }
