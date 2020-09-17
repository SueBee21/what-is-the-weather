// define city

var myCity;
var cityName;
var storedCities = [];
var today = moment().format('MMMM Do YYYY');
$("#current-day").text(today);

function loadCities() {
    if (localStorage.getItem("storedCity")) {
        storedCities = JSON.parse(localStorage.getItem("storedCity"));
        $("#search-history").empty();
        for (var i = 0; i < storedCities.length; i++) {
            var a = $("<a href='#' class='list-group-item list-group-item-action stored-city'>").text(storedCities[i]);
            $("#search-history").append(a);
        };
        $(".stored-city").on("click", function(){
            var city = $(this).text();
            loadWeather(city);
        })
    };
};

loadCities();

// select submit button and set click
var submitButton = $("#submit-button");


// store and push city namae to history list and current city
submitButton.on("click", function () {
    event.preventDefault();
    myCity = $("#my-search").val();
    if (myCity.length > 0) {
        storedCities.push(myCity);
        localStorage.setItem("storedCity", JSON.stringify(storedCities));
    }
    else {
        alert("You must enter a city name")
    };

    loadWeather(myCity);

});


function loadWeather(myCity) {
    loadCities();

    // weather api
    var apiKey = "1bf3c720e5b6cf2622ee8bd1f82b9ad5";
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + myCity + "&units=imperial&appid=" + apiKey,
        method: "GET"
    }).then(function (results) {
        console.log(results)

        // city name
        console.log(results.name);
        cityName = results.name;

        $("#history").text(cityName);
        $("#my-city").text(cityName);

        // temp
        var myTemp = results.main.temp;
        console.log(myTemp);
        $("#my-temp").html("Temperature: " + myTemp);

        // humidity
        console.log(results.main.humidity)
        var myHumidity = results.main.humidity
        $("#my-humidity").html("Humidity: " + myHumidity);

        // wind speeed
        console.log(results.wind.speed);
        var myWind = results.wind.speed;
        $("#my-wind").html("Wind Speed: " + myWind);

        console.log(results.weather[0].icon);
        var iconcode = results.weather[0].icon
        var icon = "http://openweathermap.org/img/w/" + iconcode + ".png";
        console.log(icon);
        $(".weather-icon").attr("src", icon);

        // latitude and longiture for uv
        var lat = results.coord.lat;
        var lon = results.coord.lon;
        console.log(lat, lon);

        // uv
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey,
            method: "GET"
        }).then(function (uvResults) {
            console.log(uvResults);
            console.log(uvResults.value);
            var myUv = uvResults.value;
            console.log(myUv);
            $("#my-uv").html("UV Index: " + myUv);

            // 0-2 low, 3-7 moderate ,8+ very high  epa.gov
            if (myUv < 3) {
                $("#my-uv").addClass("fair");
            };
            if (myUv >= 3 && myUv < 8) {
                $("#my-uv").addClass("moderate");
            };
            if (myUv >= 8) {
                $("#my-uv").addClass("severe");
            };

        });

        // five day forecast
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + myCity + "&&units=imperial&appid=" + apiKey,
            method: "GET"
        }).then(function (fiveDayResult) {
            console.log(fiveDayResult);
            console.log(fiveDayResult.list[0].main.temp);
            var dayOneTemp = fiveDayResult.list[0].main.temp;
            console.log(dayOneTemp);
            var dayOneHumidity = fiveDayResult.list[0].main.humidity;
            console.log(dayOneHumidity);

            var fiveDayIcon = fiveDayResult.list[0].weather[0].icon;
            var fiveIcon = "http://openweathermap.org/img/w/" + fiveDayIcon + ".png";
            console.log(fiveIcon);


            // send to html
            // day +1
            $("#day1-temp").html("Temperature: " + fiveDayResult.list[8].main.temp);
            $("#day1-humidity").html("Humidity: " + fiveDayResult.list[8].main.humidity);
            $("#day1-icon").attr("src", fiveIcon);

            // day +2
            $("#day2-temp").html("Temperature: " + fiveDayResult.list[16].main.temp);
            $("#day2-humidity").html("Humidity: " + fiveDayResult.list[16].main.humidity);

            // day + 3
            $("#day3-temp").html("Temperature: " + fiveDayResult.list[24].main.temp);
            $("#day3-humidity").html("Humidity: " + fiveDayResult.list[24].main.humidity);

            // day + 4
            $("#day4-temp").html("Temperature: " + fiveDayResult.list[32].main.temp);
            $("#day4-humidity").html("Humidity: " + fiveDayResult.list[32].main.humidity);

            // day + 5
            $("#day5-temp").html("Temperature: " + fiveDayResult.list[39].main.temp);
            $("#day5-humidity").html("Humidity: " + fiveDayResult.list[39].main.humidity);

        });

    });

}











