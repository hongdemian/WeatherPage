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
let statementTitle;
let statementLevel;
let statementSummary;
let statementTime;
let WUForecast;
let aerisWeatherObject = {};

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
	statementTitle = document.getElementById("weather-statement-title");
	statementLevel = document.getElementById("weather-statement-level");
	statementSummary = document.getElementById("weather-statement-summary");
	statementTime = document.getElementById("weather-statement-time");
	precip = document.getElementById("current-precip");
	precipDay = document.getElementById("current-precip-day");
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

	let url = `http://api.wunderground.com/api/16826fdab5598c54/forecast/forecast10day/hourly/astronomy/alerts/conditions/q/pws:IABCALGA34.json?callback=displayWeatherAeris`;
	let script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
};

let displayWeatherAeris = () => {
	// const apiId = 'V0EhyX4bGWXDkmJunrbk0';
	// const apiSec = 'Rn1IRr4nYoNgefL7Y5YZQqX2mPEi4iKIAIlGeOTZ';
	// const reqUrl = 'http://api.aerisapi.com/places/';
	// const calCOC = 'CLC-072400';
	// const params = '';
	// /places/search?query=name:seattle,state:wa
	//
	// const req = `${reqUrl}search?query=p:${calCOC}${params}&client_id=${apiId}$client_secret=${apiSec}`;
	//
	// const sampleREQ = `https://api.aerisapi.com/forecasts/calgary, ab?&format=json&filter=daynight&limit=7&fields=periods.dateTimeISO,loc,periods.maxTempC,periods.minTempC,periods.pop,periods.precipMM,periods.maxHumidity,periods.minHumidity,periods.maxDewpointC,periods.minDewpointC,periods.maxFeelslikeC,periods.minFeelslikeC,periods.windSpeedMaxKPH,periods.windSpeedMinKPH,periods.windDirMax,periods.weather&client_id=${apiId}&client_secret=${apiSec}`;
	// script = document.createElement(tagName: "script");
	// script.type = "text/javascript";
	// script.src = sampleREQ;
	// document.getElementsByTagName(qualifiedName: 'head')[0].appendChild(script);

	const url2 = 'https://api.aerisapi.com/observations/calgary, ab?&format=json&CALLBACK=displayWeatherAeris2&filter=mesonet&limit=3&fields=id,ob.dateTimeISO,ob.tempC,ob.dewpointC,ob.humidity,ob.windSpeedKPH,ob.windDir,ob.weather,ob.heatindexC,ob.windchillC,ob.feelslikeC&client_id=V0EhyX4bGWXDkmJunrbk0&client_secret=Rn1IRr4nYoNgefL7Y5YZQqX2mPEi4iKIAIlGeOTZ';

	fetch(url2)
		.then(function (response) {
			return response.json();
		})
		.then(function (json) {
			if (!json.success) {
				console.log('Oh no!')
			} else {
				console.log("current: " + json)
			}
		});
};
let displayWeatherAeris2 = () => {


	const url = 'https://api.aerisapi.com/forecasts/calgary, ab?&format=json&CALLBACK=displayWeatherWU&filter=1hr&limit=18&fields=periods.dateTimeISO,loc,periods.maxTempC,periods.minTempC,periods.pop,periods.precipMM,periods.maxHumidity,periods.minHumidity,periods.maxDewpointC,periods.minDewpointC,periods.maxFeelslikeC,periods.minFeelslikeC,periods.windSpeedMaxKPH,periods.windSpeedMinKPH,periods.windDirMax,periods.weather&client_id=V0EhyX4bGWXDkmJunrbk0&client_secret=Rn1IRr4nYoNgefL7Y5YZQqX2mPEi4iKIAIlGeOTZ';

	fetch(url)
		.then(function (response) {
			return response.json();
		})
		.then(function (json) {
			if (!json.success) {
				console.log('Oh no!')
			} else {
				console.log("forecast: " + JSON.stringify(json));
				aerisWeatherObject = json;
			}
		});
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
	console.log("Weather Aeris: " + JSON.stringify(aerisWeatherObject));
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
	precip.innerHTML = precipType + " next hour: " + WUCurrentConditions.precip_1hr_metric;
	precipDay.innerHTML = precipType + " next 24hr: " + WUCurrentConditions.precip_today_metric;
	windSpeed.innerHTML = "Wind Speed: " + knotsToKilometres(object.currently.windSpeed) + " km/h";
	windGust.innerHTML = "Wind Gusts: " + knotsToKilometres(object.currently.windGust) + " km/h";
	cloudCover.innerHTML = "Cloud Cover: " + humidityPercentage(object.currently.cloudCover) + "%";
	//document.getElementById("current-location").innerHTML = object.timezone;
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
	hourlyForecast();
	dailyForecast();
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
	document.getElementById("alert-icon").style.display = "initial";
	window.alert("Weather Alert In Effect!\n" + alertsTitle + " Issued at: " + timeConvertShort(alertsTimeIssued) + ".\n" + "Expires at: " + timeConvertShort(alertsExpires) + ".\n" + alertsSummary);
	alerts.innerHTML =  alertsSeverity.toUpperCase() + ", " + alertsTitle.toUpperCase() +  "! Issued at: " + timeToStandard(alertsTimeIssued) + " Vaild through: " + timeToStandard(alertsExpires);
	alertElement = document.getElementById('alerts');
	alertElement.style.display = "none";
	alertElement.setAttribute("href", alertsUrl);
    document.getElementById("weather-statement-card").style.display = "initial";
    statementTitle.innerHTML = alertsTitle;
    statementLevel.innerHTML = alertsSeverity.toUpperCase();
    statementSummary.innerHTML = alertsSummary;
    statementTime.innerHTML = "Issued : " + timeToStandard(alertsTimeIssued) + ", Valid until: " + timeToStandard(alertsExpires);
};
let hourlyForecast = () => {
	let hourlyTable = document.getElementById("hourly-forecast-table");
	//console.log(WUHourlyForecast[0].FCTTIME["civil"]);
	for (index=0; index < WUHourlyForecast.length; index++) {
		arr = WUHourlyForecast[index];
		time = arr.FCTTIME["civil"];
		temp = arr.temp.metric;
		dewpoint = arr.dewpoint.metric;
		condition = arr.condition;
		hourlyWind = arr.wspd.metric;
		hourlyWindDir = arr['wdir']['dir'];
		hourlywindchill = arr['windchill']['metric'];
		if (hourlywindchill == -9999) {hourlywindchill = ""}
		hourlyFeelsLike = arr['feelslike']['metric'];
		hourlyPrecip = arr['pop'];
		hourlySnow = arr.snow.metric;
		cloud = arr.sky;
		row = hourlyTable.insertRow();
		cell1 = row.insertCell(0);
		cell2 = row.insertCell(1);
		cell3 = row.insertCell(2);
		cell4 = row.insertCell(3);
		cell5 = row.insertCell(4);
		cell6 = row.insertCell(5);
		cell7 = row.insertCell(6);
		cell8 = row.insertCell(7);
		cell9 = row.insertCell(8);
		cell10 = row.insertCell(9);
		cell11 = row.insertCell(10);
		cell1.innerHTML = time;
		cell2.innerHTML = temp;
		cell3.innerHTML = hourlywindchill;
		cell4.innerHTML = hourlyFeelsLike;
		cell5.innerHTML = dewpoint;
		cell6.innerHTML = condition;
		cell7.innerHTML = cloud;
		cell8.innerHTML = hourlyWind;
		cell9.innerHTML = hourlyWindDir;
		cell10.innerHTML = hourlyPrecip;
		cell11.innerHTML = hourlySnow;
	}
};
let dailyForecast = () => {
dailyTable = document.getElementById('daily-forecast-table');
for (i=0; i < WUDailyForecast.length; i++) {
	arr = WUDailyForecast[i];
	day = arr.date.weekday;
	hightemp = arr.high.celsius;
	lowtemp = arr.low.celsius;
	condition = arr.conditions;
	dailyPOP = arr['pop'];
	maxWind = arr.maxwind.kph;
	maxWindDir = arr.maxwind['dir'];
	snowDay = arr.snow_day.cm;
	snowNight = arr.snow_night.cm;
	row = dailyTable.insertRow();
	cell1 = row.insertCell(0);
	cell2 = row.insertCell(1);
	cell3 = row.insertCell(2);
	cell4 = row.insertCell(3);
	cell5 = row.insertCell(4);
	cell6 = row.insertCell(5);
	cell7 = row.insertCell(6);
	cell8 = row.insertCell(7);
	cell9 = row.insertCell(8);
	cell1.innerHTML = day;
	cell2.innerHTML = hightemp;
	cell3.innerHTML = lowtemp;
	cell4.innerHTML = condition;
	cell5.innerHTML = dailyPOP;
	cell6.innerHTML = maxWind;
	cell7.innerHTML = maxWindDir;
	cell8.innerHTML = snowDay;
	cell9.innerHTML = snowNight;
}
};