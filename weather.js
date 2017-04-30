$(document).ready(function() {
  var temptoggle = 0;
  var temp = 0;
  var min_temp = 0;
  var max_temp = 0;

  $("body").mousedown(function() {
    var wind = $(window).width();
    var windheight = $(window).height();

  });

  getLocation();

  function getLocation() {
    $.get("http://ipinfo.io", function(location) {
      console.log(location);
      getWeather(location.loc);
    }, 'jsonp');
  }

  function getWeather(loc) {

    
    var lat = loc.split(",")[0];
    var lon = loc.split(",")[1];
var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=213714cce14f4ff1396ceba3c8899f8d";
    
    //var url = "http://api.openweathermap.org/data/2.5/weather?lat=6.664186&lon=79.930549&appid=213714cce14f4ff1396ceba3c8899f8d";
    console.log(url);

    var symbolF = "°F";
    var symbolC = "°C";
    var weather = $.getJSON(url, function(result) {
      var description = result.weather[0].description;
      temp = convertFToC(Math.round((result.main.temp * (9 / 5) - 459.67)));
      var min_temp = convertFToC(Math.round((result.main.temp_min * (9 / 5) - 459.67)));
      var max_temp = convertFToC(Math.round((result.main.temp_max * (9 / 5) - 459.67)));
      var icon = result.weather[0].icon;
      var city = result.name;
      console.log(city);


      $(".city").html("<b>" + city + "</b><br>");
      $(".description").html("<b>" + description + "</b><br>");
      $(".temp").html("<b>" + temp  + "°C</b><br>");
      $(".mintemp").html("<b>Minimum temperature: " + min_temp + symbolC + "</b><br>");
      $(".maxtemp").html("<b>Maximum temperature: " + max_temp + symbolC + "</b><br>");

      function convertFToC(val) {
        val = Math.round(((val - 32) * 5) / 9);
        return val;
      }

      function convertCToF(val) {
        val = Math.round(((val * 9) / 5) + 32);
        return val;
      }

      $(".slider").click(function() {
        var symbol = "";
        if (temptoggle === 1) {
          temp = convertFToC(temp);
          min_temp = convertFToC(min_temp);
          max_temp = convertFToC(max_temp);
          symbol = symbolC;
          temptoggle = 0;

        } else {
          temp = convertCToF(temp);
          min_temp = convertCToF(min_temp);
          max_temp = convertCToF(max_temp);
          symbol = symbolF;
          temptoggle = 1;

        }
        $(".temp").html(temp + symbol);
        $(".mintemp").html("<b>Minimum temperature: " + min_temp + symbol + "</b><br>");
        $(".maxtemp").html("<b>Maximum temperature: " + max_temp + symbol + "</b><br>");
      });

      var backgroundArr = {
        "01d": "http://res.cloudinary.com/d5hbzroitr/image/upload/v1485892764/01d_clear_sky_day_zseqir.jpg",
        "01n": "http://res.cloudinary.com/d5hbzroitr/image/upload/v1485893226/01n_clear_sky_night_v25te6.jpg",
        "02d": "http://res.cloudinary.com/d5hbzroitr/image/upload/v1485893233/02d_few_clouds_day_jfxziq.jpg",
        "02n": "http://res.cloudinary.com/d5hbzroitr/image/upload/v1485893227/02n_few_clouds_night_auvlye.jpg",
        "03d": "http://res.cloudinary.com/d5hbzroitr/image/upload/v1485893221/03d_scattered_clouds_day_pninrq.jpg",
        "03n": "http://res.cloudinary.com/d5hbzroitr/image/upload/v1485893221/03n_scattered_clouds_night_dyoxel.jpg",
        "04d": "http://res.cloudinary.com/d5hbzroitr/image/upload/v1485893221/04d_broken_clouds_day_kzeggd.jpg",
        "04n": "http://res.cloudinary.com/d5hbzroitr/image/upload/v1485893226/04n_broken_clouds_night_vvtpd0.jpg",
        "09d": "http://res.cloudinary.com/d5hbzroitr/image/upload/v1485893227/09d_shower_rain_day_fk9w69.jpg",
        "09n": "http://res.cloudinary.com/d5hbzroitr/image/upload/v1485893228/09n_shower_rain_night_gtjzbi.jpg",
        "10d": "http://res.cloudinary.com/d5hbzroitr/image/upload/v1485893236/10d_rain_day_m9xn4m.jpg",
        "10n": "http://res.cloudinary.com/d5hbzroitr/image/upload/v1485893235/10n_rain_night_quzxuj.jpg",
        "11d": "http://res.cloudinary.com/d5hbzroitr/image/upload/v1485893232/11d_thunderstorm_day_zuevwd.jpg",
        "11n": "http://res.cloudinary.com/d5hbzroitr/image/upload/v1485893232/11n_thunderstorm_night_a98olx.jpg",
        "13d": "http://res.cloudinary.com/d5hbzroitr/image/upload/v1485893238/13d_snow_day_iul0aa.jpg",
        "13n": "http://res.cloudinary.com/d5hbzroitr/image/upload/v1485893241/13n_snow_night_h6sywg.jpg",
        "50d": "http://res.cloudinary.com/d5hbzroitr/image/upload/v1485893235/50d_mist_day_db02wl.jpg",
        "50n": "http://res.cloudinary.com/d5hbzroitr/image/upload/v1485893236/50d_mist_night_k7mjnh.jpg"
      };

      $(".container-fluid").css("background-image", "url(" + backgroundArr[icon] + ")");
    });
  }

});