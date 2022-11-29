let weather = {
  apikey: "628a4d5346bc875580165e833080440f",
  FetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apikey
    )
    .then((response) => response.json())
    .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    let kveyana = data.sys.country;
    let visib = data.visibility/100;
    const { name} = data;
    const { description } = data.weather[0];
    const {feels_like, temp, humidity, pressure } = data.main;
    const { speed } = data.wind;
    let mainweat =  data.weather[0].main;
    console.log(name,mainweat,temp)

    


   $(humid).html(`humidity ${humidity}%`);
   $(press).html(`pressure ${pressure}bar`);
   $(feels).html(`feelslike ${feels_like}&deg;`);
   $(visible).html(`visibility ${visib/10}km`);



   if(mainweat == "Clear"){
    $("#weathericon").attr("src","weather-icons/original/animated/sunny-day.svg");
   }else if(mainweat == "Clouds") {
    $("#weathericon").attr("src","weather-icons/original/animated/cloudy-day-3.svg");
   }else if(mainweat == "Rain"){
    $("#weathericon").attr("src","weather-icons/original/animated/rainy-3.svg");
   }else if(mainweat == "Mist"){
    $("#weathericon").attr("src","weather-icons/original/animated/fog.svg");
   }else if(mainweat == "Snow"){
    $("#weathericon").attr("src","weather-icons/original/animated/snowy-3.svg");
   }


    

    $(maininfo).html(mainweat);
    $(maindeg).html(`${Math.round(temp)}&deg;`);
  
    $(City).html(`${name}, ${kveyana}`);


    

    //--------------- Images API (200 REQ PER HOUR)

    fetch(`https://api.pexels.com/v1/search?query=${mainweat}`, {
      headers: {
        Authorization:
          "563492ad6f91700001000001b5990975c8304b3d88db29f4a5327a4f",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        let i = Math.floor(Math.random() * 14);
        console.log(i)
        let kartina = data.photos[i].src.landscape;
        $("#Changebale_image").attr("src",kartina);

      });

    //-----------------------------------------
  },
  
  search: function () {




    $(Get_city).on('keypress',function(e) {
      if(e.which == 13) {
        let kalaki = $(Get_city).val();
        $(City).html(kalaki);
        $(title).html(kalaki);

        weather.FetchWeather(kalaki);
        $(Get_city).val("");

      }
    });

  },
  
};
$(document).ready(function () {
  weather.search();
  weather.FetchWeather("Tbilisi")
});


///Hour

const zeroFill = n => {
  return ('0' + n).slice(-2);
}

// Creates interval
const interval = setInterval(() => {
  // Get current time
  const now = new Date();

  // Format date as in mm/dd/aaaa hh:ii:ss
  const dateTime =zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes());

  // Display the date and time on the screen using div#date-time
  document.getElementById('date-time').innerHTML = dateTime;
}, 1000);


///Weekday
function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}

var dateStr = new Date();
var day = getDayName(dateStr, "en-EN"); // Gives back 'Vrijdag' which is Dutch for Friday.
console.log(day)

const now = new Date();
const month = now.toLocaleString('default', { month: 'long' });

$("#datet").html(`${day} ${now.getUTCDate()}, ${month}`);
$("#gela").html(`${now.getUTCDate()}, ${month}`);











// ////Ready APi