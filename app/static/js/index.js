
  const ctx = document.getElementById('stateBar');
  
  var dataS;
  var labelsS;
  fetch('/stateBarData')
	.then((response) =>{
		return response.json();
	})
	.then((statedata) =>{
		dataS = statedata;
	});
	
  fetch('/stateBarLabel')
	.then((response) =>{
		return response.json();
	})
	.then((statelabel) =>{
		labelsS = statelabel;
	});

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['CA', 'TX', 'OH', 'FL', 'IN', 'IL', 'NC', 'GA', 'MO', 'KY', 'VA', 'PA', 'NY', 'MI', 'TN', 'SC', 'LA', 'AL', 'WA', 'OK', 'AZ', 'WI', 'IA', 'UT', 'MD', 'CO', 'NJ', 'AR', 'NM', 'MN', 'NV', 'MA', 'OR', 'SD', 'KS', 'ID', 'CT', 'WV', 'NE', 'MS', 'ND', 'ME', 'VT', 'WY', 'HI', 'NH', 'DE', 'MT', 'RI', 'DC', 'AK'],
      datasets: [{
        label: 'Number of Restaurants',
        data: [676, 634, 543, 471, 379, 363, 358, 347, 334, 332, 327, 283, 269, 251, 245, 238, 237, 236, 209, 208, 208, 186, 166, 159, 159, 158, 151, 151, 149, 148, 135, 131, 114, 105, 103, 99, 96, 93, 92, 82, 50, 44, 43, 41, 40, 36, 32, 25, 24, 21, 14],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });































/*
const urls = [pieChartDataUrl, barChartDataUrl];

Promise.all(urls.map(url => d3.json(url))).then(run);

function run(dataset) {
   d3PieChart(dataset[0], dataset[1]);
   d3BarChart(dataset[1]);
};
*/
