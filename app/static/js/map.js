          const map = L.map('map').setView([40.718315, -74.014249], 16);

          const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(map);

          L.marker([40.718315, -74.014249]).addTo(map);
          fetch('/restaurants')
            .then(response => response.json())
            .then(restaurants => {
              for (var i = 0; i < restaurants.length; i++) {
                var restaurant = restaurants[i];
                var name = restaurant[0];
				console.log(search);
                if (name.includes(search)) {  // Filter restaurants based on name
                  var lat = restaurant[1];
                  var lon = restaurant[2];
                  var circleMarker = L.circleMarker([lat, lon], {
                    radius: 8,
                    fillColor: "blue",
                    color: "white",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                  }).addTo(map);
                  circleMarker.bindPopup(name);
                }
              }
            });
			

      const f = document.getElementById('form');
      const q = document.getElementById('query');
	  var search = "McDonald's"
      function submitted(event) {
        event.preventDefault();
        var search = q.value;
		fetch('/restaurants')
            .then(response => response.json())
            .then(restaurants => {
              for (var i = 0; i < restaurants.length; i++) {
                var restaurant = restaurants[i];
                var name = restaurant[0];
				console.log(search);
                if (name.includes(search)) {  // Filter restaurants based on name
                  var lat = restaurant[1];
                  var lon = restaurant[2];
                  var circleMarker = L.circleMarker([lat, lon], {
                    radius: 8,
                    fillColor: "blue",
                    color: "white",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                  }).addTo(map);
                  circleMarker.bindPopup(name);
                }
              }
            }
		
      }

      f.addEventListener('submit', submitted);