// define city
var myCity;
var cityName;
var storedCities = [];
var today = moment().format('MMMM Do YYYY');
$("#current-day").text(today);

//  local storage for search history
function loadCities() {
    if (localStorage.getItem("storedCity")) {
        storedCities = JSON.parse(localStorage.getItem("storedCity"));
        $("#search-history").empty();
        for (var i = 0; i < storedCities.length; i++) {
            var a = $("<a href='#' class='list-group-item list-group-item-action stored-city'>").text(storedCities[i]);
            $("#search-history").append(a);
        };
        $(".stored-city").on("click", function () {
            var city = $(this).text();
            loadWeather(city);
        })
    };
};

loadCities();

// select submit button and set click
var submitButton = $("#submit-button");


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

        // city name
        cityName = results.name;

        // populate result city name
        $("#my-city").text(cityName);

        // temp
        var myTemp = results.main.temp;
        $("#my-temp").html("Temperature: " + myTemp);

        // humidity
        var myHumidity = results.main.humidity
        $("#my-humidity").html("Humidity: " + myHumidity);

        // wind speeed
        var myWind = results.wind.speed;
        $("#my-wind").html("Wind Speed: " + myWind);

        // icons
        var iconcode = results.weather[0].icon
        var icon = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $(".weather-icon").attr("src", icon);

        // latitude and longiture for uv
        var lat = results.coord.lat;
        var lon = results.coord.lon;

        // uv
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey,
            method: "GET"
        }).then(function (uvResults) {
            var myUv = uvResults.value;
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

            // send to html
            // day +1
            $("#day1-temp").html("Temperature: " + fiveDayResult.list[8].main.temp);
            $("#day1-humidity").html("Humidity: " + fiveDayResult.list[8].main.humidity);

            var iconOne = fiveDayResult.list[0].weather[0].icon;
            var iconURL1 = "http://openweathermap.org/img/w/" + iconOne + ".png";
            $("#day1-icon").attr("src", iconURL1);

            // day +2
            $("#day2-temp").html("Temperature: " + fiveDayResult.list[16].main.temp);
            $("#day2-humidity").html("Humidity: " + fiveDayResult.list[16].main.humidity);
            var iconTwo = fiveDayResult.list[16].weather[0].icon;
            var iconurl2 = "http://openweathermap.org/img/w/" + iconTwo + ".png";
            $("#day2-icon").attr("src", iconurl2);


            // day + 3
            $("#day3-temp").html("Temperature: " + fiveDayResult.list[24].main.temp);
            $("#day3-humidity").html("Humidity: " + fiveDayResult.list[24].main.humidity);
            var iconThree = fiveDayResult.list[24].weather[0].icon;
            var iconurl3 = "http://openweathermap.org/img/w/" + iconThree + ".png";
            $("#day3-icon").attr("src", iconurl3);


            // day + 4
            $("#day4-temp").html("Temperature: " + fiveDayResult.list[32].main.temp);
            $("#day4-humidity").html("Humidity: " + fiveDayResult.list[32].main.humidity);
            var iconFour = fiveDayResult.list[32].weather[0].icon;
            var iconurl4 = "http://openweathermap.org/img/w/" + iconFour + ".png";
            $("#day4-icon").attr("src", iconurl4);
            console.log(iconurl4);

            // day + 5
            $("#day5-temp").html("Temperature: " + fiveDayResult.list[39].main.temp);
            $("#day5-humidity").html("Humidity: " + fiveDayResult.list[39].main.humidity);
            var iconFive = fiveDayResult.list[39].weather[0].icon;
            var iconurl5 = "http://openweathermap.org/img/w/" + iconFive + ".png";
            $("#day5-icon").attr("src", iconurl5);

        });

    });

}











