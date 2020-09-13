var myCity = document.getElementById("my-search").value;


var submitButton = getElementById("submit-button");
submitButton.addEventListener("click", updateHistory);


function updateHistory() {
    localStorage.setItem("mySavedCity", myCity)
    item.textContent = mySavedCity;
    history.appendChild(item);
};

submitButton.addEventListener("click", displayCity);

function displayCity() {

    console.log(myCity);
    h5.appendChild(MyCity);
};

event.preventDefault();

var myCity = "New Haven";

var apiKey = "1bf3c720e5b6cf2622ee8bd1f82b9ad5";
$.ajax({
    url:"https://api.openweathermap.org/data/2.5/weather?q="+ myCity +"&units=imperial&appid=" + apiKey,
    method:"GET"
}).then(function(results){
    console.log(results)
    console.log(results.main.humidity)
    console.log(results.name);
    console.log(results.weather[0].icon);
    var iconcode = results.weather[0].icon
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    console.log(results.wind.speed);
    var lat = results.coord.lat;
    var lon = results.coord.lon;
    console.log(lat, lon);
    $.ajax({
        url:"https://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon + "&appid=" + apiKey,
        method:"GET"
    }).then(function(uvResults){
        console.log(uvResults);
        console.log(uvResults.value);
    })
});


$.ajax({
    url:"https://api.openweathermap.org/data/2.5/forecast?q="+ myCity +"&appid=" +apiKey,
    method:"GET"
}).then(function(fiveDayResult){
    console.log(fiveDayResult);
});




