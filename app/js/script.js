let currentLatitude,
		currentLongitude;

const timeNow = Math.floor((new Date()).getTime() / 1000);

let myRequest = new XMLHttpRequest();

navigator.geolocation.getCurrentPosition(success, error, options);

function success(position) {
	currentLatitude = position.coords.latitude;
	currentLongitude = position.coords.longitude;
  makeRequest(); 
}

function error(err) {
	console.warn(`ERROR(${err.code}): ${err.message}`);
}

var options = {
	enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

function makeRequest() {
	let method = "GET",
			url = `https://fcc-weather-api.glitch.me/api/current?lat=${currentLatitude}&lon=${currentLongitude}`;
			// url = `http://api.openweathermap.org/data/2.5/weather?lat=-20.252772&lon=57.461844&APPID=5e54985f3712fd90887ced9539d73345`;
			// -20.252772, 57.461844
	myRequest.open(method, url, true);
	myRequest.onreadystatechange = displayInfo;
	myRequest.send();
}

function displayInfo() {
	let tempDisplay = document.querySelector('.temp'),
			locationDisplay = document.querySelector('.location'),
			weatherDesc = document.querySelector('.weather-description');


	if (myRequest.readyState === XMLHttpRequest.DONE && myRequest.status === 200) {
		let myResponseText = JSON.parse(myRequest.responseText);

		console.log(myResponseText);

		let temperature = myResponseText.main.temp;

		tempDisplay.innerHTML = `${Math.round(temperature)}&deg;C`;

		document.querySelector('.fahrenheit').addEventListener('click', () => {
			tempDisplay.innerHTML = `${Math.round(((9 *temperature)/5)+32)}&deg;F`;
		})

		document.querySelector('.celsius').addEventListener('click', () => {
			tempDisplay.innerHTML = `${Math.round(temperature)}&deg;C`;
		})

		locationDisplay.innerHTML = `Location: ${myResponseText.name}, ${myResponseText.sys.country}`;
		weatherDesc.innerHTML = myResponseText.weather[0].description;

		// Change weather icon...
		let mainWeather = myResponseText.weather[0].main,
				weatherIcon = document.querySelector('.weather-icon');

		if (mainWeather === "Clear") {
			if (timeNow >= myResponseText.sys.sunrise && timeNow <= myResponseText.sys.sunset) {
				weatherIcon.src = "https://www.dropbox.com/s/3wj9udc7ec0p88o/Sunny.svg?dl=1";
			} else {
				weatherIcon.src = "https://www.dropbox.com/s/ewwoa0h4htlc9qj/Clear.svg?dl=1";
			}
		} else if (mainWeather === "Rain") {
			if (timeNow >= myResponseText.sys.sunrise && timeNow <= myResponseText.sys.sunset) {
				weatherIcon.src = "https://www.dropbox.com/s/e4s1o92z3fbjafz/ModRainSwrsDay.svg?dl=1";
			} else {
				weatherIcon.src = "https://www.dropbox.com/s/za8xjzyvrn33ay1/ModRainSwrsNight.svg?dl=1";
			}
		}	else if (mainWeather === "Thunderstorm") { 
			weatherIcon.src = "https://www.dropbox.com/s/ky3xfhtlvg3g50v/CloudRainThunder.svg?dl=1";
		}	else if (mainWeather === "Snow") {
			weatherIcon.src = "https://www.dropbox.com/s/jfq2bdnot2c9h5h/ModSnow.svg?dl=1";
		}	else if (mainWeather === "Atmosphere") {
			weatherIcon.src = "https://www.dropbox.com/s/zovbvo8njzoghes/Mist.svg?dl=1";
		}	else if (mainWeather === "Clouds") {
			if (timeNow >= myResponseText.sys.sunrise && timeNow <= myResponseText.sys.sunset) {
				weatherIcon.src = "https://www.dropbox.com/s/slbxm2rcwn7qc8x/PartlyCloudyDay.svg?dl=1";
			} else {
				weatherIcon.src = "https://www.dropbox.com/s/gsu177zpqprdkun/PartlyCloudyNight.svg?dl=1";
			}
		} else {
				console.log("No Icon");
		}
	}
}