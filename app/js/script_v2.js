window.onload = () => {

	function getLocation() {

		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition((position) => {
				let lat = position.coords.latitude;
				let lon = position.coords.longitude;
				
				return [lat, lon];
			});
		});

	}

	let promise = getLocation();

	promise.then(() => {
		console.log('5');
	});
}