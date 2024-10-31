const dodger = document.getElementById("dodger");
const movementSound = document.getElementById("movementSound");
const gameoverSound = document.getElementById("gameoverSound");
const collisionIndicator = document.getElementById("collisionIndicator"); // New collision indicator element

dodger.style.bottom = "80px";
dodger.style.left = "100px";

// Function to generate random position within the container
function generateRandomPosition() {
  const container = document.getElementById("game");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  
  const randomX = Math.floor(Math.random() * (containerWidth - 20)); // 20 is the width of collisionIndicator
  const randomY = Math.floor(Math.random() * (containerHeight - 20)); // 20 is the height of collisionIndicator
  
  console.log("Random Position:", { x: randomX, y: randomY }); // Debugging log to check randomness
  return { x: randomX, y: randomY };
}

// Function to update collision indicator position
function updateCollisionPosition() {
  const randomPosition = generateRandomPosition();
  collisionIndicator.style.left = `${randomPosition.x}px`;
  collisionIndicator.style.top = `${randomPosition.y}px`;
  collisionIndicator.style.display = "block"; // Ensure it’s visible for testing
}

// Event listener for key presses
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    moveDodgerLeft();
  } else if (event.key === "ArrowRight") {
    moveDodgerRight();
  } else if (event.key === "ArrowUp") {
    moveDodgerUp();
  } else if (event.key === "ArrowDown") {
    moveDodgerDown();
  }
});

// Function to move dodger left
function moveDodgerLeft() {
  const leftNumbers = dodger.style.left.replace("px", "");
  const left = parseInt(leftNumbers);
  if (left > 0) {
    dodger.style.left = `${left - 10}px`;
    dodger.style.backgroundImage = "url('../img/pacman-left.webp')"; // Change to left-facing image
    playSoundOnMovement();
    checkCollision();
  } else {
    playGameOverSound();
  }
}

// Function to move dodger right
function moveDodgerRight() {
  const leftNumbers = dodger.style.left.replace("px", "");
  const left = parseInt(leftNumbers);
  if (left < 360) {
    dodger.style.left = `${left + 10}px`;
    dodger.style.backgroundImage = "url('../img/pacman-right.webp')"; // Change to right-facing image
    playSoundOnMovement();
    checkCollision();
  } else {
    playGameOverSound();
  }
}

// Function to move dodger up
function moveDodgerUp() {
  const bottomNumbers = dodger.style.bottom.replace("px", "");
  const bottom = parseInt(bottomNumbers);
  if (bottom < 360) {
    dodger.style.bottom = `${bottom + 10}px`;
    playSoundOnMovement();
    checkCollision(); // Check for collision after movement
  } else {
    playGameOverSound();
  }
}

// Function to move dodger down
function moveDodgerDown() {
  const bottomNumbers = dodger.style.bottom.replace("px", "");
  const bottom = parseInt(bottomNumbers);
  if (bottom > 0) {
    dodger.style.bottom = `${bottom - 10}px`;
    playSoundOnMovement();
    checkCollision(); // Check for collision after movement
  } else {
    playGameOverSound();
  }
}

// Function to check for collision with collisionIndicator
function checkCollision() {
  const dodgerRect = dodger.getBoundingClientRect();
  const collisionRect = collisionIndicator.getBoundingClientRect();
  if (
    dodgerRect.left <= collisionRect.left + collisionRect.width &&
    dodgerRect.left + dodgerRect.width >= collisionRect.left &&
    dodgerRect.top <= collisionRect.top + collisionRect.height &&
    dodgerRect.top + dodgerRect.height >= collisionRect.top
  ) {
    playGameOverSound();
    console.log("Collision occurred at:", { x: collisionRect.left, y: collisionRect.top });
    showCollisionIndicator(collisionRect.left, collisionRect.top);
    updateCollisionPosition(); // Generate new random position for collisionIndicator
  }
}

// Function to show collision indicator at a specific position
function showCollisionIndicator(x, y) {
  collisionIndicator.style.left = `${x}px`;
  collisionIndicator.style.top = `${y}px`;
  collisionIndicator.style.display = "block"; // Show the collision indicator
  setTimeout(() => {
    collisionIndicator.style.display = "none"; // Hide the collision indicator after 1 second
  }, 1000);
}

// Function to play sound on movement
function playSoundOnMovement() {
  movementSound.currentTime = 0;
  movementSound.play();
}

// Function to play game over sound
function playGameOverSound() {
  gameoverSound.currentTime = 0;
  gameoverSound.play();
}

// Initial setup: generate random position for collisionIndicator on page load
updateCollisionPosition();
