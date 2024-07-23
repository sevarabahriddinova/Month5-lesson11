const $searchForm = document.querySelector(".search-form");
const $searchInput = document.querySelector("#search-input");
const $weatherStatusIcon = document.querySelector("#weather-status-icon");
const $weatherGradus = document.querySelector("#weather-gradus");
const $weatherLocation = document.querySelector("#weather-location");
const $weatherTime = document.querySelector("#time");
const $wetherWeek = document.querySelector("#weekday");
const $humidty = document.querySelector("#hummidtly");
const $uvIndex = document.querySelector("#uv-index");
const $sunset = document.querySelector("#sunset");
const $sunrise = document.querySelector("#sunrice");
const $pascal = document.querySelector("#pascal")

const $themeChecbox = document.querySelector("#theme")



const API_KEY = "644f6ce0ca9e401ebb891832211707"



// functions


var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var dayName = days[new Date().getDay() -1]

const renderWeather = (data) => {
    $weatherStatusIcon.src = "https:" + data.current.condition.icon;
     $weatherGradus.innerHTML = data.current.temp_c + "°";
    $weatherLocation.innerHTML = `${data.location.name}, ${data.location.country}`
   $weatherTime.innerHTML =  data.forecast.forecastday[0].astro.sunset;
   $wetherWeek.innerHTML =`Sunset Time ${dayName}`;
   $humidty.innerHTML = data.current.humidity + "%";
   $uvIndex.innerHTML =  data.current.uv + " out of 10";
   $sunset.innerHTML = data.forecast.forecastday[0].astro.sunset;
   $sunrise.innerHTML = data.forecast.forecastday[0].astro.sunrise;
   $pascal.innerHTML = data.current.pressure_mb + "Pa";

 console.log(data)

 
}

const apiData = (city) => {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes&alerts=yes`)
    .then(response => response.json())
    .then(data => renderWeather(data ))
}

apiData("Navoi")

const searchCityWeather = (e) => {
    e.preventDefault();
 
    apiData( $searchInput.value)
        $searchInput.value =""
}

const changeTheme = (e) => {
   const darkmode = e.target.checked;

   if (darkmode) {
        localStorage.setItem("theme", "dark")
        document.body.style.backgroundColor = "rgb(54, 26, 82)"

   }else{
        localStorage.setItem("theme", "light")
        document.body.style.backgroundColor = "#fff"
   }
}

const checkTheme = () => {
    let currentTheme = localStorage.getItem("theme");
    console.log(currentTheme)

    if (currentTheme === "dark ") {
        $themeChecbox.checked = true
        document.body.style.backgroundColor = "rgb(54, 26, 82)"
    } else{
        $themeChecbox.checked = false
        document.body.style.backgroundColor = "#fff"
    }
}
checkTheme()

// event listener
$searchForm.addEventListener("submit", searchCityWeather)
$themeChecbox.addEventListener("change", changeTheme)


