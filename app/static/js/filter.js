// Center the filter container
const filterContainer = document.querySelector('.filter-container');
filterContainer.style.display = 'flex';
filterContainer.style.justifyContent = 'center';
filterContainer.style.alignItems = 'center';

// Style the filter
const filterLabel = document.querySelector('#filter-container label');
filterLabel.style.fontWeight = 'bold';
filterLabel.style.marginRight = '10px';

const filterSelect = document.querySelector('#filter-container select');
filterSelect.style.padding = '5px 10px';
filterSelect.style.border = '1px solid #ccc';
filterSelect.style.borderRadius = '5px';
filterSelect.style.fontFamily = 'Arial, sans-serif';
filterSelect.style.backgroundColor = '#f5f5f5';
filterSelect.style.color = '#333';