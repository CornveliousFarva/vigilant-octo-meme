const addCardBtn = document.getElementById('addCardBtn');
const clearCardsBtn = document.getElementById('clearCardsBtn');
const cardForm = document.getElementById('cardForm');
const saveCard = document.getElementById('saveCard');
const cancelCard = document.getElementById('cancelCard');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const cardsContainer = document.getElementById('cardsContainer');

let cards = JSON.parse(localStorage.getItem('quizCards')) || [];

// Show form
addCardBtn.addEventListener('click', () => {
    cardForm.classList.remove('hidden');
});

// Hide form
cancelCard.addEventListener('click', () => {
    cardForm.classList.add('hidden');
});

// Save card
saveCard.addEventListener('click', () => {
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if (!question || !answer) {
        alert("Please fill both fields!");
        return;
    }

    const card = { question, answer };
    cards.push(card);
    localStorage.setItem('quizCards', JSON.stringify(cards));

    questionInput.value = '';
    answerInput.value = '';
    cardForm.classList.add('hidden');

    renderCards();
});

// Render cards
function renderCards() {
    cardsContainer.innerHTML = '';

    cards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';

        cardEl.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    ${card.question}
                    <button class="delete-btn" data-index="${index}">x</button>
                </div>
                <div class="card-back">
                    ${card.answer}
                </div>
            </div>
        `;

        // Flip card
        cardEl.addEventListener('click', () => {
            cardEl.classList.toggle('flip');
        });

        // Delete card
        cardEl.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            cards.splice(index, 1);
            localStorage.setItem('quizCards', JSON.stringify(cards));
            renderCards();
        });

        cardsContainer.appendChild(cardEl);
    });
}

// Clear all cards
clearCardsBtn.addEventListener('click', () => {
    if (confirm("Delete all cards?")) {
        cards = [];
        localStorage.removeItem('quizCards');
        renderCards();
    }
});

// Initial render
renderCards();