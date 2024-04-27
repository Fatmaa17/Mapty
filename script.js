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
class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();
    form.addEventListener('submit', this.__newWorkout.bind(this));

    inputType.addEventListener(change, this.__toggleElevationField);
  }


  _getPosition() {
    if (navigator.geolocation) {
      //1st parameter is the callback fun called when success , 2nd : Error callback
      navigator.geolocation.getCurrentPosition(
        //Extracting position.coords properties & assigning them to variables with the same names.
        this.__loadMap.bind(this),
        function () {
          alert("Couldn't get your position");
        }
      );
    }
  }

  __loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(
      `https://www.google.com/maps/@${latitude},${longitude},15.17z?entry=ttu`
    );

    const coords = [latitude, longitude];

    //Id of the map element in the html file
    //L: main function that Leaflet gives us as an entry point
    //2nd par of the setView is: Zoom level
    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    // handling clicks on map
    //On : from leaflet library instead of normal event listeners
    this.#map.on('click', this.__showForm.bind(this));
  }


  __showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden')
    inputDistance.focus();
  }

  __toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row__hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row__hidden');
  }

  __newWorkout(e) {
    e.preventDefault();

    // clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
    //display marker
    // console.log(mapEvent);
    const { lat, lng } = this.#mapEvent.latlng;

    L.marker([lat, lng])
      .addTo(this.#map)
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
  };
}


const app = new App();


