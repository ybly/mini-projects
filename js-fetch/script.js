const endpoint =
	'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

// Retrieve data from API endpoint and resolve response to json data
fetch(endpoint)
	.then((blob) => blob.json())
	.then((data) => cities.push(...data));

// Filter response data by user input
function findMatches(wordToMatch, cities) {
	return cities.filter((place) => {
		// here we need to figure out if the city or state matches what was searched
		const regex = new RegExp(wordToMatch, 'gi'); // gi -> g = match all instances, i = ignore case

		return place.city.match(regex) || place.state.match(regex);
	});
}

function formatNumber(n) {
	const formatter = new Intl.NumberFormat('en-GB');
	return formatter.format(n);
}

// Display results to screen
function displayMatches() {
	const matchArray = findMatches(this.value, cities);

	// Create elements and append to DOM to display matching responses
	const html = matchArray
		.map((res) => {
			const regex = new RegExp(this.value, 'gi');
			const cityName = res.city.replace(
				regex,
				`<span class="hl">${this.value}</span>`
			);
			const stateName = res.state.replace(
				regex,
				`<span class="hl">${this.value}</span>`
			);
			return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${formatNumber(res.population)}</span>
        </li>
        `;
		})
		.join('');

	suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
