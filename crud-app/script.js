const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
	if (inputBox.value == '') {
		alert('Invalid input!');
	} else {
		let li = document.createElement('li');
		li.innerHTML = inputBox.value;
		listContainer.appendChild(li);

		let span = document.createElement('span');
		span.innerHTML = '\u00d7';
		li.appendChild(span);
	}

	inputBox.value = '';
	saveData();
}

listContainer.addEventListener(
	'click',
	function (e) {
		// toggle check status
		if (e.target.tagName === 'LI') {
			e.target.classList.toggle('checked');
			saveData();
		} else if (e.target.tagName === 'SPAN') {
			// delete
			e.target.parentElement.remove();
			saveData();
		}
	},
	false
);

/**
 * Persist data on reload via local storage
 */
function saveData() {
	localStorage.setItem('data', listContainer.innerHTML);
}

function getData() {
	listContainer.innerHTML = localStorage.getItem('data');
}

// get data on load
getData();
