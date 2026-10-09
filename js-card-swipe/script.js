document.addEventListener('DOMContentLoaded', function () {
	const cards = document.querySelectorAll('.card');
	const progressDots = document.querySelectorAll('.progress-dot');
	const prevBtn = document.getElementById('prev-btn');
	const nextBtn = document.getElementById('next-btn');
	const flipBtn = document.getElementById('flip-btn');

	let currentIndex = 0;
	let startX = 0;
	let currentX = 0;
	let isDragging = false;

	// Initialize cards
	updateCards();

	// Next card function
	function nextCard() {
		if (currentIndex < cards.length - 1) {
			// Add swipe animation to current card
			cards[currentIndex].classList.add('swipe-left');

			setTimeout(() => {
				currentIndex++;
				updateCards();
			}, 400);
		}
	}

	// Previous card function
	function prevCard() {
		if (currentIndex > 0) {
			// Add swipe animation to current card
			cards[currentIndex].classList.add('swipe-right');

			setTimeout(() => {
				currentIndex--;
				updateCards();
			}, 400);
		}
	}

	// Update card positions and progress
	function updateCards() {
		cards.forEach((card, index) => {
			card.classList.remove(
				'active',
				'next',
				'next-2',
				'next-3',
				'previous',
				'previous-2',
				'previous-3',
				'hidden',
				'swipe-left',
				'swipe-right',
			);

			if (index === currentIndex) {
				card.classList.add('active');
			} else if (index === currentIndex + 1) {
				card.classList.add('next');
			} else if (index === currentIndex + 2) {
				card.classList.add('next-2');
			} else if (index === currentIndex + 3) {
				card.classList.add('next-3');
			} else if (index === currentIndex - 1) {
				card.classList.add('previous');
			} else if (index === currentIndex - 2) {
				card.classList.add('previous-2');
			} else if (index === currentIndex - 3) {
				card.classList.add('previous-3');
			} else {
				card.classList.add('hidden');
			}
		});

		// Update progress indicators
		progressDots.forEach((dot, index) => {
			if (index === currentIndex) {
				dot.classList.add('active', 'bg-white');
				dot.classList.remove('bg-white/30');
			} else {
				dot.classList.remove('active', 'bg-white');
				dot.classList.add('bg-white/30');
			}
		});

		// Update button states
		prevBtn.disabled = currentIndex === 0;
		nextBtn.disabled = currentIndex === cards.length - 1;

		if (prevBtn.disabled) {
			prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
		} else {
			prevBtn.classList.remove('opacity-50', 'cursor-not-allowed');
		}

		if (nextBtn.disabled) {
			nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
		} else {
			nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
		}
	}

	// Flip current card
	function flipCurrentCard() {
		cards[currentIndex].classList.toggle('flipped');
	}

	// Event listeners for navigation buttons
	prevBtn.addEventListener('click', prevCard);
	nextBtn.addEventListener('click', nextCard);
	flipBtn.addEventListener('click', flipCurrentCard);

	// Event listeners for card buttons
	cards.forEach((card) => {
		const flipBtn = card.querySelector('.flip-btn');
		const swipeLeftBtn = card.querySelector('.swipe-left-btn');
		const swipeRightBtn = card.querySelector('.swipe-right-btn');

		flipBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			card.classList.toggle('flipped');
		});

		swipeLeftBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			if (card.classList.contains('active')) {
				prevCard();
			}
		});

		swipeRightBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			if (card.classList.contains('active')) {
				nextCard();
			}
		});
	});

	// Click on card to navigate (if it's not active)
	cards.forEach((card) => {
		card.addEventListener('click', (e) => {
			// Only navigate if the card is not active and not flipped
			if (
				!card.classList.contains('active') &&
				!card.classList.contains('flipped')
			) {
				const index = parseInt(card.getAttribute('data-index'));
				currentIndex = index;
				updateCards();
			}
		});
	});

	// Touch events for mobile swipe
	const cardStack = document.querySelector('.card-stack');

	cardStack.addEventListener('touchstart', (e) => {
		startX = e.touches[0].clientX;
		isDragging = true;
	});

	cardStack.addEventListener('touchmove', (e) => {
		if (!isDragging) return;

		currentX = e.touches[0].clientX;
		const diff = currentX - startX;

		// Apply transform to active card during drag
		if (cards[currentIndex]) {
			cards[currentIndex].style.transform =
				`translateX(${diff}px) rotateZ(${diff * 0.1}deg)`;
		}
	});

	cardStack.addEventListener('touchend', () => {
		if (!isDragging) return;

		isDragging = false;

		// Reset card transform
		if (cards[currentIndex]) {
			cards[currentIndex].style.transform = '';
		}

		const diff = currentX - startX;
		const swipeThreshold = 50;

		if (Math.abs(diff) > swipeThreshold) {
			if (diff > 0) {
				// Swipe right - go to previous card
				prevCard();
			} else {
				// Swipe left - go to next card
				nextCard();
			}
		}
	});

	// Mouse events for desktop drag
	cardStack.addEventListener('mousedown', (e) => {
		startX = e.clientX;
		isDragging = true;
		cardStack.style.cursor = 'grabbing';
	});

	document.addEventListener('mousemove', (e) => {
		if (!isDragging) return;

		currentX = e.clientX;
		const diff = currentX - startX;

		// Apply transform to active card during drag
		if (cards[currentIndex]) {
			cards[currentIndex].style.transform =
				`translateX(${diff}px) rotateZ(${diff * 0.1}deg)`;
		}
	});

	document.addEventListener('mouseup', () => {
		if (!isDragging) return;

		isDragging = false;
		cardStack.style.cursor = '';

		// Reset card transform
		if (cards[currentIndex]) {
			cards[currentIndex].style.transform = '';
		}

		const diff = currentX - startX;
		const swipeThreshold = 50;

		if (Math.abs(diff) > swipeThreshold) {
			if (diff > 0) {
				// Swipe right - go to previous card
				prevCard();
			} else {
				// Swipe left - go to next card
				nextCard();
			}
		}
	});

	// Keyboard navigation
	document.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowLeft') {
			prevCard();
		} else if (e.key === 'ArrowRight') {
			nextCard();
		} else if (e.key === ' ' || e.key === 'Spacebar') {
			e.preventDefault();
			flipCurrentCard();
		}
	});
});
