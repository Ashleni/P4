fetch('/nutritions')
  .then(response => response.json())
  .then(nutritions => {
    // Get the unique restaurant names
    const restaurantNames = [...new Set(nutritions.map(nutrition => nutrition[0]))];

    // Create the filter dropdown
    const filterSelect = document.getElementById('filter-select');

    // Clear existing options
    filterSelect.innerHTML = '';

    // Add a default "All" option
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All';
    filterSelect.appendChild(allOption);

    // Add the restaurant name options
    restaurantNames.forEach(restaurantName => {
      const option = document.createElement('option');
      option.value = restaurantName;
      option.textContent = restaurantName;
      filterSelect.appendChild(option);
    });

    // Handle the filter selection event
    filterSelect.addEventListener('change', () => {
      const selectedRestaurant = filterSelect.value;

      // Filter the nutritions based on the selected restaurant
      const filteredNutritions = selectedRestaurant === 'all'
        ? nutritions
        : nutritions.filter(nutrition => nutrition[0] === selectedRestaurant);

      // Display the menu items for the selected restaurant
      const menuListContainer = document.getElementById('menu-list');
      menuListContainer.innerHTML = '';

      // Find the highest and lowest calories
      let highestCalories = -Infinity;
      let lowestCalories = Infinity;

      filteredNutritions.forEach(nutrition => {
        const calories = nutrition[2];
        highestCalories = Math.max(highestCalories, calories);
        lowestCalories = Math.min(lowestCalories, calories);
      });

      filteredNutritions.forEach(nutrition => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.textContent = nutrition[1];

        // Highlight the highest calories food in red
        if (nutrition[2] === highestCalories) {
          menuItem.classList.add('highlight-red');
        }

        // Highlight the lowest calories food in green
        if (nutrition[2] === lowestCalories) {
          menuItem.classList.add('highlight-green');
        }

        // Handle click event on each menu item
        menuItem.addEventListener('click', () => {
          // Fetch the nutritional data for the selected menu item
          const nutritionalData = {
            Calories: nutrition[2] + ' kcal',
            TotalFat: nutrition[5] + ' g',
            Carbohydrates: nutrition[8] + ' g',
            Protein: nutrition[11] + ' g',
            Fiber: nutrition[9] + ' g',
          };

          // Display the nutritional data
          const nutritionContainer = document.getElementById('nutrition-container');
          nutritionContainer.innerHTML = '';

          const nutritionLabel = document.createElement('div');
          nutritionLabel.classList.add('nutrition-label');
          nutritionLabel.textContent = `Nutritional Information for ${nutrition[1]}`;
          nutritionContainer.appendChild(nutritionLabel);

          // Display each nutritional value
          Object.entries(nutritionalData).forEach(([key, value]) => {
            const nutritionItem = document.createElement('div');
            nutritionItem.textContent = `${key}: ${value}`;
            nutritionContainer.appendChild(nutritionItem);
          });
        });

        menuListContainer.appendChild(menuItem);
      });
    });
  });
