let humidity;
let weatherIcon;
let pressure;
let uvIndex;
let temperature;
let temperatureIcon;
let windBearing;
let windSpeed;
let weatherSummary;
let alertsTitle;
let summary;
let forecastValidTime;
let alertsUrl;
let alertsExpires;
let alertsTimeIssued;
let alertsSummary;
let windGust;
let cloudCover;
let windGustForecast;
let windGustTime;
let feelsLike;
let precipPossible;
let precipType;
let weekForecast;
let weather = [];
let WUCurrentConditions = [];
let WUHourlyForecast = [];
let WUMoonPhase = [];
let WUSunPhase = [];
let WUDailyForecast = [];
let WUDailyForecastSum = [];
let WUDailyForecastTime = "";
let WUAlert = [];


let showResults = function () {
	humidity = document.getElementById("current-humidity");
	weatherIcon = document.getElementById("current-icon");
	pressure = document.getElementById("current-pressure");
	uvIndex = document.getElementById("current-uvIndex");
	temperature = document.getElementById("current-temperature");
	temperatureIcon = document.getElementById("temperature-icon");
	windBearing = document.getElementById("current-wind-bearing");
	windSpeed = document.getElementById("current-wind-speed");
	windGust = document.getElementById("current-wind-gust");
	cloudCover = document.getElementById("current-cloud-cover");
	windGustForecast = document.getElementById("wind-gust-forecast");
	windGustTime = document.getElementById("wind-gust-time");
	weatherSummary = document.getElementById("weatherSummary");
	alertsTitle = document.getElementById("alerts");
	feelsLike = document.getElementById("current-temperature-feels");
	precipPossible = document.getElementById("current-precip-possible");
	precipType = document.getElementById("current-precip-type");
	weekForecast = document.getElementById("week-forecast");
};
/*function timeToStandard(time) {
	console.log(time);
	let forecastTime = new Date(time * 1000);
	let forecastHours = forecastTime.getHours();
	let forecastMinutes = forecastTime.getMinutes();
	return (forecastHours + ":" + forecastMinutes);
}*/
function timeToStandard(time) {
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
// Hours part from the timestamp
	const hours = forecastValidTime.getHours();
// Minutes part from the timestamp
	const minutes = "0" + forecastValidTime.getMinutes();
// Seconds part from the timestamp
	const seconds = "0" + forecastValidTime.getSeconds();

// Will display time in 10:30:23 format
	return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}
function celsiusToFarenheit(k) {
	return Math.round(k * 9 / 5) + 32;
}
function humidityPercentage(h) {
	return Math.round(h * 100);
}
function degreesToDirection(degrees) {
	var range = 360 / 16;
	var low = 360 - range / 2;
	var high = (low + range) % 360;
	var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
	if (!degrees) {
		return "Calm"
	}
	for (i in angles) {

		if (degrees >= low && degrees < high)
			return angles[i];

		low = (low + range) % 360;
		high = (high + range) % 360;
	}
}
function knotsToKilometres(knot) {
	return Math.round(knot * 1.852);
}
let weatherImages = {
	"clear-day": "./icons/sun.svg",
	"clear-night": "./icons/Moon.svg",
	"rain": "./icons/Cloud-Rain.svg",
	"snow": "./icons/Cloud-Snow.svg",
	"sleet": "./icons/Cloud-Hail-Alt.svg",
	"wind": "./icons/Wind.svg",
	"fog": "./icons/Cloud-Fog.svg",
	"cloudy": "./icons/Cloud.svg",
	"partly-cloudy-day": "./icons/Cloud-Sun.svg",
	"partly-cloudy-night": "./icons/Cloud-Wind-Moon.svg",
	"hail": "./icons/Cloud-Hail.svg",
	"thunderstorm": "./icons/Cloud-Lightning.svg",
	"tornado": "./icons/Tornado.svg"
};
/*let weatherIcons = {
	"clear-day": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Sun_icon.svg/252px-Sun_icon.svg.png",
	"clear-night": "http://www.clker.com/cliparts/f/S/2/p/7/u/gold-matte-moon.svg",
	"rain": "https://cdn3.iconfinder.com/data/icons/weather-16/256/Rainy_Day-512.png",
	"snow": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Nuvola_weather_snow.svg/1000px-Nuvola_weather_snow.svg.png",
	"sleet": "http://www.clker.com/cliparts/f/6/7/4/1206565674431593790Anonymous_simple_weather_symbols_10.svg.hi.png",
	"wind": "http://www.haotu.net/up/4233/128/216-wind.png",
	"fog": "http://www.iconninja.com/files/81/344/943/fog-cloud-hiding-the-sun-weather-interface-symbol-icon.svg",
	"cloudy": "http://camera.thietbianninh.com/images/icon-2.png",
	"partly-cloudy-day": "http://meteo.cw/images_www/weather_icons1/weather_icon_03.png",
	"partly-cloudy-night": "http://icon-park.com/imagefiles/simple_weather_icons_cloudy_night.png",
	"hail": "http://icons.iconarchive.com/icons/icons8/ios7/256/Weather-Hail-icon.png",
	"thunderstorm": "http://findicons.com/files/icons/2613/android_weather_extended/480/thunderstorms.png",
	"tornado": "http://hddfhm.com/images/clipart-of-a-tornado-11.png"
};*/
let getWeather = function () {
	let lat = 0;
	let long = 0;
	lat = 51.0253;
	long = -114.0499;
	//document.getElementById("location").style.visibility = "visible";
	alertScr = "";
	/*let showPosition = position => {
		lat = position.coords.latitude;
		long = position.coords.longitude;
	};*/
	console.log(`Lat: ${lat}, Long: ${long}`);
	if (false) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		//	document.getElementById("location").innerHTML = "Geolocation is not supported by this browser." + "<br>Showing results for Calgary!";
	}
	showWeather(lat, long);
};

function showWeather(lat, long) {
	let url = `http://api.wunderground.com/api/16826fdab5598c54/forecast/forecast10day/hourly/astronomy/alerts/conditions/q/pws:IABCALGA34.json?callback=displayWeatherWU`;
	let script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
	url = `https://api.darksky.net/forecast/459d95a8fbfada306d82991efda5b383/${lat},${long}` + `?format=jsonp&callback=displayWeather&units=si`;
	script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
	//displayWeather(object)
}
function displayWeatherWU(object) {
	weather = object;
	weatherIcon.src = weather.current_observation.icon_url;
	WUCurrentConditions = object.current_observation;
	WUHourlyForecast = object.hourly_forecast;
	WUMoonPhase = object.moon_phase;
	WUSunPhase = object.sun_phase;
	WUDailyForecast = object.forecast.simpleforecast.forecastday;
	WUDailyForecastSum = object.forecast.txt_forecast.forecastday;
	WUDailyForecastTime = object.forecast.txt_forecast.date;
	WUAlert = object.alert;
	console.log(`Current Conditions: ${WUCurrentConditions}`)
}

function displayWeather(object) {
	humidity.innerHTML = "Humidity: " + humidityPercentage(object.currently.humidity) + "%";
	console.log(weather);
	uvIndex.innerHTML = "uvIndex: " + object.currently.uvIndex;
	temperature.innerHTML = Math.round(object.currently.temperature) + " C"; //+ " / " + celsiusToFarenheit(object.currently.temperature) + " F";
	feelsLike.innerHTML = "Feels Like: " + Math.round(object.currently.apparentTemperature, 1) + " C";
	if (object.currently.precipType != undefined) {
		console.log('true');
		precipType = object.currently.precipType.toUpperCase();
	} else {
		precipType = "Precipitation";
	}
	precipPossible.innerHTML = "Chance of " + precipType + ": " + (Math.round(object.currently.precipProbability * 100)) + "%";
	 if (object.currently.precipProbability > .4) {
	 	document.getElementById('precipType').style.visibility = "visible"
	 }
	windBearing.innerHTML = "Wind Direction: " + degreesToDirection(object.currently.windBearing);
	windSpeed.innerHTML = "Wind Speed: " + knotsToKilometres(object.currently.windSpeed) + " km/h";
	windGust.innerHTML = "Wind Gusts: " + knotsToKilometres(object.currently.windGust) + " km/h";
	if (object.currently.windSpeed >= 30) {
		windSpeed.addClass("alerts");
	}
	if (object.currently.windGust >= 30) {
		windGust.addClass("alerts");
	}
	cloudCover.innerHTML = "Cloud Cover: " + humidityPercentage(object.currently.cloudCover) + "%";
	weatherSummary.innerHTML = "<span class='summaryTitles'> Current Location:  </span></br>" + object.timezone + "<br/><span class='summaryTitles'> Weather Summary: </span></br>" + object.currently.summary
		+ "<br/><span class='summaryTitles'>Forecast Summary: </span></br>" + object.hourly.summary;
	weekForecast.innerHTML = object.daily.summary;
	forecastValidTime = new Date(object.currently.time * 1000);
	gustWindTime = new Date(object.daily.data[0].windGustTime * 1000);
	if (object.currently.uvIndex > 5) {
		document.getElementById("current-uvIndex").style.color = "red";
	} else {
		if (object.currently.uvIndex < 6 && object.currently.uvIndex > 3) {
			document.getElementById("current-uvIndex").style.color = "dark-green";
		}
	}
	if (object.alerts != undefined) {
		alertsTitle = object.alerts.title;
		alertsSummary = object.alerts.description;
		alertsTimeIssued = object.alerts.time;
		alertsExpires = object.alerts.expires;
		alertsUrl = object.alerts.uri;
		alertInEffect();
	} else {
		alertsTitle = "";
	}

	<!---forecast section -->
	//console.log(object.currently.summary);
	windGustForecast.innerHTML = "Wind Peak: </br>" + knotsToKilometres(object.daily.data[0].windGust) + " km/h at: " + timeConvertShort(gustWindTime) + "</br>";
	console.log("Storm: " + object.currently.nearestStormDistance);
	console.log("alerts: " + object.alerts);
	if (alertsTitle) {
		alertsTitle = (object.alert.summary);
	} else {
		alerts.innerHTML = "No Alerts as of " + timeConvertShort(forecastValidTime);
	}
	summary = document.getElementById("summary");
	document.getElementById("alerts").style.visibility = "visible";
	//console.log(JSON.stringify(object));
}

let forecastBuild = (object) => {

};

let timeConvert = function (d) {
	return datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
		d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
};
let timeConvertShort = function (d) {
	return datestring = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
};
window.onload = function () {
	showResults();
	getWeather();
};

let alertInEffect = () => {
	window.alert("Weather Alert In Effect!</br>" + alertTitle + " Issued at: " + timeConvertShort(alertsTimeIssued) + ".</br>" + "Expires at: " + timeConvertShort(alertsExpires) + ". </br>" + alertsSummary);
};