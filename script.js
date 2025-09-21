// =================================================================
// 1. DATA
// =================================================================
const aminoAcids = [
  { one: "A", three: "Ala", name: "Alanine", image: "https://upload.wikimedia.org/wikipedia/commons/9/90/L-Alanin_-_L-Alanine.svg", size: "Small", polarity: "Nonpolar", interactions: "Van der Waals" },
  { one: "R", three: "Arg", name: "Arginine", image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Arginin_-_Arginine.svg", size: "Large", polarity: "Basic (+)", interactions: "Ionic bonds, H-bonding" },
  { one: "N", three: "Asn", name: "Asparagine", image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/L-Asparagin_-_L-Asparagine.svg", size: "Small", polarity: "Polar", interactions: "H-bonding" },
  { one: "D", three: "Asp", name: "Aspartic Acid", image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/L-Asparagins%C3%A4ure_-_L-Aspartic_acid.svg", size: "Small", polarity: "Acidic (-)", interactions: "Ionic bonds, H-bonding" },
  { one: "C", three: "Cys", name: "Cysteine", image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/L-Cystein_-_L-Cysteine.svg", size: "Small", polarity: "Polar", interactions: "Disulfide bonds, H-bonding" },
  { one: "E", three: "Glu", name: "Glutamate", image: "https://upload.wikimedia.org/wikipedia/commons/d/db/L-Glutamins%C3%A4ure_-_L-Glutamic_acid.svg", size: "Large", polarity: "Acidic (-)", interactions: "Ionic bonds, H-bonding" },
  { one: "Q", three: "Gln", name: "Glutamine", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/L-Glutamin_-_L-Glutamine.svg", size: "Large", polarity: "Polar", interactions: "H-bonding" },
  { one: "G", three: "Gly", name: "Glycine", image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Glycine-2D-skeletal.svg", size: "Small", polarity: "Nonpolar", interactions: "Van der Waals" },
  { one: "H", three: "His", name: "Histidine", image: "https://upload.wikimedia.org/wikipedia/commons/1/18/L-Histidin_-_L-Histidine.svg", size: "Large", polarity: "Basic (+)", interactions: "Ionic bonds, H-bonding" },
  { one: "I", three: "Ile", name: "Isoleucine", image: "https://upload.wikimedia.org/wikipedia/commons/4/46/L-Isoleucin_-_L-Isoleucine.svg", size: "Large", polarity: "Nonpolar", interactions: "Van der Waals" },
  { one: "L", three: "Leu", name: "Leucine", image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/L-Leucine.svg", size: "Large", polarity: "Nonpolar", interactions: "Van der Waals" },
  { one: "K", three: "Lys", name: "Lysine", image: "https://upload.wikimedia.org/wikipedia/commons/8/88/L-Lysin_-_L-Lysine.svg", size: "Large", polarity: "Basic (+)", interactions: "Ionic bonds, H-bonding" },
  { one: "M", three: "Met", name: "Methionine", image: "https://upload.wikimedia.org/wikipedia/commons/2/23/Methionin_-_Methionine.svg", size: "Large", polarity: "Nonpolar", interactions: "Van der Waals" },
  { one: "F", three: "Phe", name: "Phenylalanine", image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/L-Phenylalanin_-_L-Phenylalanine.svg", size: "Large", polarity: "Nonpolar", interactions: "Van der Waals" },
  { one: "P", three: "Pro", name: "Proline", image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Prolin_-_Proline.svg", size: "Small", polarity: "Nonpolar", interactions: "Van der Waals" },
  { one: "S", three: "Ser", name: "Serine", image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/L-Serin_-_L-Serine.svg", size: "Small", polarity: "Polar", interactions: "H-bonding" },
  { one: "T", three: "Thr", name: "Threonine", image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/L-Threonin_-_L-Threonine.svg", size: "Small", polarity: "Polar", interactions: "H-bonding" },
  { one: "W", three: "Trp", name: "Tryptophan", image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/L-Tryptophan_-_L-Tryptophan.svg", size: "Large", polarity: "Nonpolar", interactions: "Van der Waals,H-bonding" },
  { one: "Y", three: "Tyr", name: "Tyrosine", image: "https://upload.wikimedia.org/wikipedia/commons/4/40/L-Tyrosin_-_L-Tyrosine.svg", size: "Large", polarity: "Polar", interactions: "H-bonding, Pi-stacking" },
  { one: "V", three: "Val", name: "Valine", image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Valine_3.svg", size: "Small", polarity: "Nonpolar", interactions: "Van der Waals" },
];

// =================================================================
// 2. HTML ELEMENT SELECTION
// =================================================================
const introScreen = document.getElementById('intro-screen');
const studyScreen = document.getElementById('study-screen');
const finishScreen = document.getElementById('finish-screen');

const numCardsInput = document.getElementById('num-cards-input');
const startBtn = document.getElementById('start-btn');
const errorMessage = document.getElementById('error-message');

const flashcard = document.getElementById('flashcard');
const nextBtn = document.getElementById('next-btn');

const finalCount = document.getElementById('final-count');
const studiedList = document.getElementById('studied-list');
const returnBtn = document.getElementById('return-btn');

// Card face elements
const cardFrontContent = document.getElementById('card-front-content');
const cardThreeLetter = document.getElementById('card-three-letter');
const cardFullName = document.getElementById('card-full-name'); // NEW LINE
const cardImage = document.getElementById('card-image');
const cardSize = document.getElementById('card-size');
const cardPolarity = document.getElementById('card-polarity');
const cardInteractions = document.getElementById('card-interactions');

// =================================================================
// 3. STATE MANAGEMENT
// =================================================================
let deck = [];
let currentCardIndex = 0;

// =================================================================
// 4. CORE FUNCTIONS
// =================================================================

function startGame() {
  const numCards = parseInt(numCardsInput.value);

  // Validate input
  if (isNaN(numCards) || numCards < 1 || numCards > 100) {
    errorMessage.textContent = 'Invalid input, please enter a number between 1 and 100.';
    return;
  }
  errorMessage.textContent = ''; // Clear error message if valid

  // Build the deck
  deck = [];
  for (let i = 0; i < numCards; i++) {
    const randomIndex = Math.floor(Math.random() * aminoAcids.length);
    deck.push(aminoAcids[randomIndex]);
  }
  
  // Reset state and switch screens
  currentCardIndex = 0;
  introScreen.style.display = 'none';
  finishScreen.style.display = 'none';
  studyScreen.style.display = 'block';

  showCard(currentCardIndex);
}

function showCard(index) {
  if (index >= deck.length) return;

  flashcard.classList.remove('is-flipped');
  
  const cardData = deck[index];
  
  // Update front
  cardFrontContent.textContent = cardData.one;

  // Update back
  cardThreeLetter.textContent = cardData.three;
  cardFullName.textContent = cardData.name; // NEW LINE
  cardImage.src = cardData.image;
  cardSize.textContent = cardData.size;
  cardPolarity.textContent = cardData.polarity;
  cardInteractions.textContent = cardData.interactions;

  // Update next button text on the last card
  if (index === deck.length - 1) {
    nextBtn.textContent = 'End Session';
  } else {
    nextBtn.textContent = 'Next Flashcard';
  }
}

function flipCard() {
  flashcard.classList.toggle('is-flipped');
}

function nextCard() {
  currentCardIndex++;
  if (currentCardIndex < deck.length) {
    showCard(currentCardIndex);
  } else {
    showFinishScreen();
  }
}

function showFinishScreen() {
  studyScreen.style.display = 'none';
  finishScreen.style.display = 'block';

  finalCount.textContent = deck.length;
  
  studiedList.innerHTML = '';
  deck.forEach(card => {
    const p = document.createElement('p');
    p.textContent = `${card.name} (${card.one})`;
    studiedList.appendChild(p);
  });
}

function returnToStart() {
    finishScreen.style.display = 'none';
    introScreen.style.display = 'block';
    numCardsInput.value = '';
}

// =================================================================
// 5. EVENT LISTENERS
// =================================================================
startBtn.addEventListener('click', startGame);
flashcard.addEventListener('click', flipCard);
nextBtn.addEventListener('click', nextCard);
returnBtn.addEventListener('click', returnToStart);