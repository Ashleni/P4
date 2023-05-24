const map = L.map('map').setView([40.718315, -74.014249], 16);
const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

document.addEventListener("DOMContentLoaded", function () {
  // Rest of the code...

  const fullscreenBtn = document.getElementById("fullscreen-btn");
  const mapContainer = document.getElementById("map-container");

  fullscreenBtn.addEventListener("click", toggleFullScreen);

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      if (mapContainer.requestFullscreen) {
        mapContainer.requestFullscreen();
      } else if (mapContainer.mozRequestFullScreen) {
        mapContainer.mozRequestFullScreen();
      } else if (mapContainer.webkitRequestFullscreen) {
        mapContainer.webkitRequestFullscreen();
      } else if (mapContainer.msRequestFullscreen) {
        mapContainer.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }
});


const markers = [];

// Function to generate a color based on the restaurant name
function generateColor(name) {
  // Generate a hash code for the lowercase name
  let hash = 0;
  const lowerCaseName = name.toLowerCase();
  for (let i = 0; i < lowerCaseName.length; i++) {
    hash = lowerCaseName.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the hash code to a hexadecimal color
  const color = '#' + ((hash & 0x00FFFFFF) | 0x44000000).toString(16).toUpperCase();

  return color;
}

fetch('/restaurants')
  .then(response => response.json())
  .then(restaurants => {
    for (let i = 0; i < restaurants.length; i++) {
      const restaurant = restaurants[i];
      const name = restaurant[6];
      const lat = restaurant[4];
      const lon = restaurant[5];
      const address = restaurant[0];
      const city = restaurant[1];
      const zip = restaurant[7];
      const state = restaurant[8];
      const website = restaurant[9];

      // Generate a color based on the lowercase restaurant name
      const color = generateColor(name);

      const circleMarker = L.circleMarker([lat, lon], {
        radius: 7,
        fillColor: color, // Use the generated color
        color: 'black',
        weight: 1,
        opacity: 1,
        fillOpacity: 1,
      })
        .bindPopup(`${name}<br>Address: ${address}, ${city} ${state}, ${zip}<br>Website: <a href="${website}" target="_blank">${website}</a>`)
        .on('mouseover', function () {
          this.openPopup();
        })
        .on('mouseout', function () {
          this.closePopup();
        });

      markers.push(circleMarker);
    }

    showMarkers(); // Show all markers by default
    console.log(`Total markers: ${markers.length}`);
  });

function showMarkers() {
  markers.forEach(marker => marker.addTo(map));
}

function filterMarkers(value) {
  const filterValue = value.toLowerCase();
  console.log(filterValue);
  markers.forEach(marker => {
    const markerName = marker.getPopup().getContent().toLowerCase();
    const isMatched = markerName.includes(filterValue);

    if (filterValue === 'all' || isMatched) {
      marker.addTo(map);
    } else {
      marker.removeFrom(map);
    }
  });
}

const filterSelect = document.getElementById('filter-select');
filterSelect.addEventListener('change', function () {
  const selectedValue = filterSelect.value;
  filterMarkers(selectedValue);
});

// Create filters for each restaurant name
fetch('/restaurants')
  .then(response => response.json())
  .then(restaurants => {
    const restaurantNames = restaurants.map(restaurant => restaurant[6]);
    const uniqueNames = [...new Set(restaurantNames)]; // Get unique restaurant names

    const filterOptions = uniqueNames.map(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      return option;
    });

    const selectAllOption = document.createElement('option');
    selectAllOption.value = 'all';
    selectAllOption.textContent = 'All';

    filterSelect.appendChild(selectAllOption);
    filterOptions.forEach(option => {
      filterSelect.appendChild(option);
    });
  });