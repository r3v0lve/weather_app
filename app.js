window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude
            lat = position.coords.latitude

            const api = `http://api.weatherapi.com/v1/current.json?key=b245ecf6371644dea5f202323201307&q=${lat},${long}`;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{ 
                    const {temp_c, feelslike_c, icon} = data.current;
                    console.log(data)
                    // Set DOM Elements from the API
                    temperatureDegree.textContent = temp_c;
                    temperatureDescription.textContent = `It's ${data.current.condition.text} and it feels like ${feelslike_c} degrees`;
                    locationTimezone.textContent = data.location.tz_id;

                    let img = document.createElement("img");
                    img.src = data.current.condition.icon;
                    let src = document.getElementById("weather-img");
                    src.appendChild(img);

                    //Change temperature to Celcius/Farenheit
                    temperatureSection.addEventListener('click', ()=>{
                        if(temperatureSpan.textContent === "C"){
                            temperatureSpan.textContent = "F";
                            const {temp_c, feelslike_f, icon} = data.current;
                            temperatureDegree.textContent = data.current.temp_f;
                            temperatureDescription.textContent = `It's ${data.current.condition.text} and it feels like ${feelslike_f} degrees`;
                            locationTimezone.textContent = data.location.tz_id;

                        }else if (temperatureSpan.textContent === "C"){
                            const {temp_c, feelslike_c, icon} = data.current;
                            temperatureDegree = data.current.temp_c;
                            temperatureDescription.textContent = `It's ${data.current.condition.text} and it feels like ${feelslike_c} degrees`;
                            locationTimezone.textContent = data.location.tz_id;
                        }
                    });
                });
        });
    };
});