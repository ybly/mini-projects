const themeButton = document.querySelector('.theme-btn');

function switchTheme(e) {
	const currentTheme = localStorage.getItem('theme');

	if (currentTheme == 'dark') {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light');
		themeButton.innerHTML = 'Dark Theme';
	} else {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark');
		themeButton.innerHTML = 'Light Theme';
	}
}

themeButton.addEventListener('click', switchTheme, false);
