// define city
// var myCity = $("#my-search").value;
var myCity;

// se;ect submit button and set click
var submitButton = $("#submit-button");
// submitButton.addEventListener("click", displayCity());


// store and push city namae to history list and current city
submitButton.on("click", function() {
    event.preventDefault();
    var myCity = $(this).attr("#my-search");
    localStorage.setItem(keyCity, $("#my-search").value);

    console.log(myCity);
});

submitButton.on("click", function(){
    event.preventDefault();
    $(".history").text(myCity);
    $("#my-city").text(myCity);
});




// test vat
var myCity = "New Haven";



// api
var apiKey = "1bf3c720e5b6cf2622ee8bd1f82b9ad5";
$.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + myCity + "&units=imperial&appid=" + apiKey,
    method: "GET"
}).then(function (results) {
    console.log(results)

    // city name
    console.log(results.name);

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
    })
});


$.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + myCity + "&appid=" + apiKey,
    method: "GET"
}).then(function (fiveDayResult) {
    console.log(fiveDayResult);
});

// 

var icon;

$("h5").html(myCity);
$("#weather-icon").html(icon);
$("a").html(myCity);


