window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let degreeSection = document.querySelector('.degree-section');
  let degreeSectionSpan = document.querySelector('.degree-section span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      // to get user position to give weather inform where user lives
      long = position.coords.longitude;
      lat = position.coords.latitude;
      // solve to connection problem we need this solution proxy
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      // const api = 'https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/37.8267,-122.4233'
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

      // to get request this url
      fetch(api)
        // we use then because we want to show data after get information from server
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          // set DOM elements from API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // formula for celcius
          let celsius = (temperature - 32) * (5 / 9);

          // set icons
          setIcons(icon, document.querySelector('.icon'));

          // change tempruture to celsius
          degreeSection.addEventListener('click', () => {
            if (degreeSectionSpan.textContent === "F") {
              degreeSectionSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);

            } else {
              degreeSectionSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });

        })
    });
  }

  function setIcons(icon, iconId) {
    const skycons = new Skycons({ color: 'white' });
    // we need to change icon name in darksky.net (this with middlescore-) to https://darkskyapp.github.io/skycons/ (this with underscore_ and uppercase)
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);

  }
});

