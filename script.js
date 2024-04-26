'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
if (navigator.geolocation) {
  //1st parameter is the callback fun called when success , 2nd : Error callback
  navigator.geolocation.getCurrentPosition(
    function (position) {
      //Extracting position.coords properties & assigning them to variables with the same names.
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(
        `https://www.google.com/maps/@${latitude},${longitude},15.17z?entry=ttu`
      );

      const coords = [latitude, longitude];

      //Id of the map element in the html file
      //L: main function that Leaflet gives us as an entry point
      //2nd par of the setView is: Zoom level
      const map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      //On : from leaflet library instead of normal event listeners
      map.on('click', function (mapEvent) {
        console.log(mapEvent);
        const { lat, lng } = mapEvent.latlng;

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
              className: 'running-popup',
            })
          )
          .setPopupContent('Workout')
          .openPopup();
      });
    },
    function () {
      alert("Couldn't get your position");
    }
  );
}
