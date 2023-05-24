document.addEventListener("DOMContentLoaded", function () {
    fetch('/restaurants')
      .then(response => response.json())
      .then(restaurants => {
        // Calculate the number of restaurants for each chain in each state
        const chainStateCounts = {};
        restaurants.forEach(restaurant => {
          const name = restaurant[6];
          const state = restaurant[8];
          if (!chainStateCounts[name]) {
            chainStateCounts[name] = {};
          }
          if (!chainStateCounts[name][state]) {
            chainStateCounts[name][state] = 1;
          } else {
            chainStateCounts[name][state]++;
          }
        });
  
        // Prepare data for Chart.js
        const labels = Object.keys(chainStateCounts);
        const states = Object.keys(chainStateCounts[labels[0]]);
        const data = labels.map(chain => states.map(state => chainStateCounts[chain][state] || 0));
  
        // Generate random colors for each chain
        const colors = labels.map(() => "#" + Math.floor(Math.random() * 16777215).toString(16));
  
        // Create datasets for Chart.js
        const datasets = labels.map((chain, index) => ({
          label: chain,
          data: data[index],
          borderColor: colors[index],
          backgroundColor: colors[index],
          fill: false
        }));
  
        // Create the chart
        const ctx = document.getElementById("chart").getContext("2d");
        ctx.canvas.width = 20000; // Set the width of the canvas
        ctx.canvas.height = 1800; // Set the height of the canvas
  
        const chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: states,
            datasets: datasets
          },
          options: {
            responsive: true, // Enable responsiveness
            maintainAspectRatio: false, // Disable aspect ratio
            scales: {
              x: {
                grid: {
                  display: true
                },
                max: states.length + 1 // Set the maximum value for x-axis
              },
              y: {
                grid: {
                  display: true
                },
                beginAtZero: true, // Start the y-axis from zero
                suggestedMax: getMaxValue(data) // Set the maximum value for y-axis
              }
            },
            plugins: {
              legend: {
                display: true,
                labels: {
                  usePointStyle: true,
                  padding: 10,
                  font: {
                    size: 10 // Adjust the font size here (e.g., 10)
                  }
                }
              }
            }
          }
        });
  
        // Function to calculate the maximum value in the data array
        function getMaxValue(data) {
          let maxValue = 0;
          data.forEach(chainData => {
            const maxDataValue = Math.max(...chainData);
            if (maxDataValue > maxValue) {
              maxValue = maxDataValue;
            }
          });
          return maxValue;
        }
  
        // Add restaurant filter functionality
        const restaurantFilterSelect = document.getElementById("sfilter-container");
        restaurantFilterSelect.addEventListener("change", function () {
          const selectedRestaurant = restaurantFilterSelect.value;
          const selectedIndex = labels.indexOf(selectedRestaurant);
  
          // Update chart visibility based on selected restaurant
          chart.data.datasets.forEach((dataset, index) => {
            if (index === selectedIndex) {
              dataset.hidden = false;
            } else {
              dataset.hidden = true;
            }
          });
  
          chart.update();
        });
      });
  });
  