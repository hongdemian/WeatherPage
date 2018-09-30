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
let forecastValidTime;
let alertsUrl;
let alertElement;
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
let lat = 0;
let long = 0;

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
function timeToStandard(time) {
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
// Hours part from the timestamp
	let hours = time.getHours();
	let abr = "AM";
	if (hours > 12) {
		hours -= 12;
		abr = "PM";
	}
// Minutes part from the timestamp
	const minutes = "0" + time.getMinutes();
// Seconds part from the timestamp
	const seconds = "0" + time.getSeconds();

// Will display time in 10:30:23 format
	return hours + ':' + minutes.substr(-2) + " " + abr;
}
function celsiusToFarenheit(k) {
	return Math.round(k * 9 / 5) + 32;
}
function humidityPercentage(h) {
	return Math.round(h * 100);
}
function degreesToDirection(degrees) {
	let range = 360 / 16;
	let low = 360 - range / 2;
	let high = (low + range) % 360;
	let angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
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
	"clear-day": "icons/Sun.svg",
	"clear-night": "icons/Moon.svg",
	"rain": "icons/Cloud-Rain.svg",
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
let getWeather = function () {
	lat = 51.0253;
	long = -114.0499;
	console.log(`Lat: ${lat}, Long: ${long}`);
	// if (false) {
	// 	navigator.geolocation.getCurrentPosition(showPosition);
	// }
	//	document.getElementById("location").innerHTML = "Geolocation is not supported by this browser." + "<br>Showing results for Calgary!";

	let url = `http://api.wunderground.com/api/16826fdab5598c54/forecast/forecast10day/hourly/astronomy/alerts/conditions/q/pws:IABCALGA34.json?callback=displayWeatherWU`;
	let script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
};

function displayWeatherWU(object) {
	weather = object;
	weatherIcon.src = weather.current_observation.icon_url;
	WUCurrentConditions = object.current_observation;
	WUForecast = object.forecast;
	WUHourlyForecast = object.hourly_forecast;
	WUMoonPhase = object.moon_phase;
	WUSunPhase = object.sun_phase;
	WUDailyForecast = object.forecast.simpleforecast.forecastday;
	WUDailyForecastSum = object.forecast.txt_forecast.forecastday;
	WUDailyForecastTime = object.forecast.txt_forecast.date;
	WUAlert = object.alert;
	url = `https://api.darksky.net/forecast/459d95a8fbfada306d82991efda5b383/${lat},${long}` + `?format=jsonp&callback=displayWeather&units=si`;
	script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}

function displayWeather(object) {
	console.log(`Forecast last updated: ${WUDailyForecastTime}`);
	humidity.innerHTML = "Humidity: " + humidityPercentage(object.currently.humidity) + "%";
	uvIndex.innerHTML = "uvIndex: " + object.currently.uvIndex;
	temperature.innerHTML = Math.round(object.currently.temperature) + " C";//+ " / " + celsiusToFarenheit(object.currently.temperature) + " F";
	feelsLike.innerHTML = "Feels Like: " + Math.round(object.currently.apparentTemperature) + " C";
	if (object.currently.precipType !== undefined) {
		precipType = object.currently.precipType.toUpperCase();
	} else {
		precipType = "Precipitation";
	}
	precipPossible.innerHTML = "Chance of " + precipType + ": " + ((WUForecast["simpleforecast"]['forecastday'][0]['pop'])) + "%";
	windSpeed.innerHTML = "Wind Speed: " + knotsToKilometres(object.currently.windSpeed) + " km/h";
	windGust.innerHTML = "Wind Gusts: " + knotsToKilometres(object.currently.windGust) + " km/h";
	cloudCover.innerHTML = "Cloud Cover: " + humidityPercentage(object.currently.cloudCover) + "%";
	document.getElementById("current-location").innerHTML = object.timezone;
	document.getElementById("weather-summary").innerHTML =  object.currently.summary;
	document.getElementById(("weather-forecast-summary")).innerHTML = weather['forecast']['txt_forecast']['forecastday'][0]['fcttext_metric'];
	document.getElementById("weather-forecast-second").innerHTML = weather['forecast']['txt_forecast']['forecastday'][1]['fcttext_metric'];
	weekForecast.innerHTML = object.daily.summary;
	forecastValidTime = new Date(object.currently.time * 1000);
	let gustWindTime = new Date(object.daily.data[0].windGustTime * 1000);
	windGustForecast.innerHTML = "Wind Peak: </br>" + knotsToKilometres(object.daily.data[0].windGust) + " km/h at: " + timeToStandard(gustWindTime) + "</br>";
	console.log("Storm: " + object.currently.nearestStormDistance);
	document.getElementById("weatherunderground-about").innerHTML = weather.current_observation.image.title;
	document.getElementById("weatherunderground-about").setAttribute("href", weather.current_observation.image.link);
    addFormatting(object);
}
let timeConvertShort = function (d) {
	return datestring = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
};
window.onload = function () {
	showResults();
	getWeather();
};
let addFormatting = (object) => {
	if (object.alerts !== undefined) {
		alertsTitle = object.alerts[0].title;
		alertsSummary = object.alerts[1].description;
		alertsTimeIssued = new Date(object.alerts[0].time* 1000);
		alertsSeverity = object.alerts[0].severity;
		alertsExpires = new Date(object.alerts[0].expires * 1000);
		alertsUrl = object.alerts[0].uri;
		alertInEffect();
	} else {
		alertsTitle = "";
	}
	if (object.currently.windSpeed >= 20) {
		windSpeed.classList.add('alerts');
	}
	if (object.currently.windGust >= 30) {
		windGust.classList.add('alerts');
	}
	if (object.currently.uvIndex > 5) {
		document.getElementById("current-uvIndex").classList.add('alerts');
	} else {
		if (object.currently.uvIndex < 6 && object.currently.uvIndex > 3) {
			document.getElementById("current-uvIndex").style.color = "dark-green";
		}
	}
	if (object.currently.precipProbability > .7) {
		document.getElementById('current-precip-type').classList.add('alerts');
	}
	if (typeof object.currently.windBearing === "undefined") {
		windBearing.innerHTML = "Wind Direction: Calm";
	} else {
		windBearing.innerHTML = "Wind Direction: " + degreesToDirection(object.currently.windBearing);
	}
	if (!alertsTitle) {
		alerts.innerHTML = "No Alerts as of " + timeConvertShort(forecastValidTime);
		document.getElementById('alerts').style.display = "none";
	}
};
let alertInEffect = () => {
	window.alert("Weather Alert In Effect!\n" + alertsTitle + " Issued at: " + timeConvertShort(alertsTimeIssued) + ".\n" + "Expires at: " + timeConvertShort(alertsExpires) + ".\n" + alertsSummary);
	alerts.innerHTML =  alertsSeverity.toUpperCase() + ", " + alertsTitle.toUpperCase() +  "! Issued at: " + timeToStandard(alertsTimeIssued) + " Vaild through: " + timeToStandard(alertsExpires);
	alertElement = document.getElementById('alerts');
	alertElement.style.visibility = "visible";
	alertElement.setAttribute("href", alertsUrl);
};

