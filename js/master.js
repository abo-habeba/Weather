// Switch Class Active between links
let navLinks = document.querySelectorAll(".links");
navLinks.forEach(function (ele) {
  ele.addEventListener("click", function (e) {
    navLinks.forEach(function(ele){
      ele.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});


async function getWeatherApi(searsh) {
  let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a00714c1cac14f7d8b4220342221110&q=&q=${searsh}&days=3`);
  let Result = await response.json();
  disply(Result);
  console.log(Result);
}
getWeatherApi('cairo');

let inputsearch = document.getElementById('search');

inputsearch.addEventListener('input' , function(e){
  if (e.target.value.length >= 3) {
    getWeatherApi(e.target.value);
    }
})


let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let datDy = new Date();
let dy = days[datDy.getDay()];
let tomorrow = days[datDy.getDay()+1];
let AfterTomorrow = days[datDy.getDay()+2];

let forecastBox = document.getElementById('forecast');
function disply(weatherApi){
  // console.log(weatherApi);
  let box = `
      <div class="col-md-12 col-lg-4  today forecast">
        <div class="box">
          <div class="forecast-header" id="today">
            <div class="day">${dy}</div>
            <div class=" date">${weatherApi.location.localtime}</div>
          </div>
          <!-- .forecast-header -->
          <div class="forecast-content" id="current">
            <div class="location">${weatherApi.location.name}</div>
            <div class="degree">
              <div class="num">${weatherApi.current.temp_c}<sup>o</sup>C</div>
              <div class="forecast-icon">
                <img src="${weatherApi.current.condition.icon}" alt="">
              </div>
            </div>
            <div class="custom">${weatherApi.current.condition.text}</div>
            <span><img src="images/icon-umberella.png" alt="">20%</span>
            <span><img src="images/icon-wind.png" alt="">${weatherApi.current.wind_kph} km/h</span>
            <span><img src="images/icon-compass.png" alt="">East</span>
          </div>
        </div>
      </div>
      <div class="col-md-12 col-lg-4  forecast">
        <div class="box">
          <div class="forecast-header">
          
            <div class="day">${tomorrow}</div>
            <div class="day">${weatherApi.forecast.forecastday[1].date}</div>
          </div> <!-- .forecast-header -->
          <div class="forecast-content text-center">
            <div class="forecast-icon">
              <img src="${weatherApi.forecast.forecastday[1].day.condition.icon}" alt="" width="48">
            </div>
            <div class="degree text-center">
              <p>${weatherApi.forecast.forecastday[1].day.maxtemp_c} <sup>o</sup>C</p> 
            </div>
            <small>${weatherApi.forecast.forecastday[1].day.mintemp_c} <sup>o</sup></small>
            <div class="custom">${weatherApi.forecast.forecastday[1].day.condition.text}</div>
          </div>
        </div>
      </div>
      <div class="col-md-12 col-lg-4  forecast">
        <div class="box">
          <div class="forecast-header">
            <div class="day">${AfterTomorrow}</div>
            <div class="day">${weatherApi.forecast.forecastday[2].date}</div>
          </div>
          <!-- .forecast-header -->
          <div class="forecast-content">
            <div class="forecast-icon">
            <img src="${weatherApi.forecast.forecastday[2].day.condition.icon}" alt="" width="48">
            </div>
            <div class="degree text-center">
              <p>${weatherApi.forecast.forecastday[2].day.maxtemp_c} <sup>o</sup>C</p> 
            </div>
            <small>${weatherApi.forecast.forecastday[2].day.mintemp_c} <sup>o</sup></small>
            <div class="custom">${weatherApi.forecast.forecastday[2].day.condition.text}</div>
          </div>
        </div>
      </div>
  `
  forecastBox.innerHTML = box;

}


