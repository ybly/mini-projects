function removeTransition(e) {
	if (e.propertyName !== 'transform') return;
	e.target.classList.remove('playing');
}

function playSound(e) {
	// Find audio and key imput div by data-attribute
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

	console.log(`key: ${key}, audio: ${audio}`);

	if (!audio) return; // exit if there's no associated audio to key

	// Add playing class for animation
	key.classList.add('playing');
	// reset the audio play time so sound is restarted if key is pressed multiple times
	audio.currentTime = 0;
	audio.play();
}

// loop through keys and add a event listener to remove the playing class when the css transition has ended
const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach((key) => key.addEventListener('transitionend', removeTransition));

// Add event listener to play sound associated to key down event
window.addEventListener('keydown', playSound);
