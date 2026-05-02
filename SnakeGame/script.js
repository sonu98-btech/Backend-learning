const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const gameMessage = document.getElementById('gameMessage');
const score1Display = document.getElementById('score1');
const score2Display = document.getElementById('score2');
const length1Display = document.getElementById('length1');
const length2Display = document.getElementById('length2');

// Game configuration
const GRID_SIZE = 15;
const TILE_COUNT = canvas.width / GRID_SIZE; // 40x40 grid

// Game state
let gameRunning = false;
let gameOver = false;

// Player 1 (Blue - ASWD keys)
let player1 = {
    body: [{ x: 10, y: 20 }],
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    score: 0,
    color: '#667eea'
};

// Player 2 (Pink - Arrow keys)
let player2 = {
    body: [{ x: 30, y: 20 }],
    direction: { x: -1, y: 0 },
    nextDirection: { x: -1, y: 0 },
    score: 0,
    color: '#f5576c'
};

// Food
let food = { x: 20, y: 20 };

// Game loop
let gameSpeed = 200; // milliseconds per frame (SLOW START)
let lastFrameTime = 0;
const BASE_SPEED = 200;
const MIN_SPEED = 80; // Minimum speed as snake grows

// Key tracking
const keys = {};

// Event listeners
document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    
    // Player 1 controls (ASWD)
    if (e.key.toLowerCase() === 'w' && player1.direction.y === 0) {
        player1.nextDirection = { x: 0, y: -1 };
        e.preventDefault();
    }
    if (e.key.toLowerCase() === 's' && player1.direction.y === 0) {
        player1.nextDirection = { x: 0, y: 1 };
        e.preventDefault();
    }
    if (e.key.toLowerCase() === 'a' && player1.direction.x === 0) {
        player1.nextDirection = { x: -1, y: 0 };
        e.preventDefault();
    }
    if (e.key.toLowerCase() === 'd' && player1.direction.x === 0) {
        player1.nextDirection = { x: 1, y: 0 };
        e.preventDefault();
    }
    
    // Player 2 controls (Arrow keys)
    if (e.key === 'ArrowUp' && player2.direction.y === 0) {
        player2.nextDirection = { x: 0, y: -1 };
        e.preventDefault();
    }
    if (e.key === 'ArrowDown' && player2.direction.y === 0) {
        player2.nextDirection = { x: 0, y: 1 };
        e.preventDefault();
    }
    if (e.key === 'ArrowLeft' && player2.direction.x === 0) {
        player2.nextDirection = { x: -1, y: 0 };
        e.preventDefault();
    }
    if (e.key === 'ArrowRight' && player2.direction.x === 0) {
        player2.nextDirection = { x: 1, y: 0 };
        e.preventDefault();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

// Generate random food position
function generateFood() {
    let newFood;
    let isValid = false;
    
    while (!isValid) {
        newFood = {
            x: Math.floor(Math.random() * TILE_COUNT),
            y: Math.floor(Math.random() * TILE_COUNT)
        };
        
        // Check if food overlaps with snakes
        isValid = !isSnakePosition(newFood, player1.body) && 
                  !isSnakePosition(newFood, player2.body);
    }
    
    return newFood;
}

// Check if position is on a snake
function isSnakePosition(pos, snakeBody) {
    return snakeBody.some(segment => segment.x === pos.x && segment.y === pos.y);
}

// Calculate game speed based on snake sizes
function calculateGameSpeed() {
    const avgLength = (player1.body.length + player2.body.length) / 2;
    // Speed increases as snakes grow
    const speedIncrease = Math.floor((avgLength - 1) * 3);
    const newSpeed = Math.max(MIN_SPEED, BASE_SPEED - speedIncrease);
    gameSpeed = newSpeed;
}

// Update game state
function update() {
    if (!gameRunning || gameOver) return;
    
    // Update player 1
    updateSnake(player1);
    
    // Update player 2
    updateSnake(player2);
    
    // Check collisions and food
    checkFoodCollision(player1);
    checkFoodCollision(player2);
    
    // Check game over conditions
    checkGameOver();
    
    // Update game speed based on snake sizes
    calculateGameSpeed();
}

function updateSnake(player) {
    player.direction = player.nextDirection;
    
    const head = { ...player.body[0] };
    head.x += player.direction.x;
    head.y += player.direction.y;
    
    // Check boundary collision - GAME OVER
    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        if (player === player1) {
            endGame('p2');
        } else {
            endGame('p1');
        }
        return;
    }
    
    player.body.unshift(head);
    
    // Remove tail (unless just ate food - handled in checkFoodCollision)
    player.body.pop();
}

function checkFoodCollision(player) {
    const head = player.body[0];
    
    if (head.x === food.x && head.y === food.y) {
        // Add new segment - GROW THE SNAKE
        player.body.push({ ...player.body[player.body.length - 1] });
        player.score += 10;
        
        // Update displays
        if (player === player1) {
            score1Display.textContent = player1.score;
            length1Display.textContent = player1.body.length;
        } else {
            score2Display.textContent = player2.score;
            length2Display.textContent = player2.body.length;
        }
        
        // Generate new food
        food = generateFood();
    }
}

function checkGameOver() {
    const p1Head = player1.body[0];
    const p2Head = player2.body[0];
    
    // Check head-to-head collision
    if (p1Head.x === p2Head.x && p1Head.y === p2Head.y) {
        endGame('draw');
        return;
    }
    
    // Check if player 1 head hits player 2 body
    if (isSnakePosition(p1Head, player2.body)) {
        endGame('p2');
        return;
    }
    
    // Check if player 2 head hits player 1 body
    if (isSnakePosition(p2Head, player1.body)) {
        endGame('p1');
        return;
    }
}

function endGame(winner = null) {
    gameRunning = false;
    gameOver = true;
    startBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
    
    if (winner === 'draw') {
        gameMessage.textContent = '💥 CRASH! It\'s a Draw! Both hit each other!';
        gameMessage.className = 'message draw';
    } else if (winner === 'p1') {
        gameMessage.textContent = `🎉 Player 1 Wins! Player 2 hit a boundary! (Length: P1: ${player1.body.length} | P2: ${player2.body.length})`;
        gameMessage.className = 'message player1-wins';
    } else if (winner === 'p2') {
        gameMessage.textContent = `🎉 Player 2 Wins! Player 1 hit a boundary! (Length: P1: ${player1.body.length} | P2: ${player2.body.length})`;
        gameMessage.className = 'message player2-wins';
    }
}

// Draw functions
function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw food
    drawFood();
    
    // Draw snakes
    drawSnake(player1);
    drawSnake(player2);
    
    // Draw grid (optional)
    drawGrid();
}

function drawSnake(player) {
    ctx.fillStyle = player.color;
    
    player.body.forEach((segment, index) => {
        const x = segment.x * GRID_SIZE;
        const y = segment.y * GRID_SIZE;
        
        if (index === 0) {
            // Head - slightly larger
            ctx.fillRect(x + 1, y + 1, GRID_SIZE - 2, GRID_SIZE - 2);
            // Eyes
            ctx.fillStyle = '#fff';
            const eyeSize = 2;
            if (player.direction.x === 1) { // Right
                ctx.fillRect(x + 9, y + 4, eyeSize, eyeSize);
                ctx.fillRect(x + 9, y + 9, eyeSize, eyeSize);
            } else if (player.direction.x === -1) { // Left
                ctx.fillRect(x + 4, y + 4, eyeSize, eyeSize);
                ctx.fillRect(x + 4, y + 9, eyeSize, eyeSize);
            } else if (player.direction.y === -1) { // Up
                ctx.fillRect(x + 4, y + 4, eyeSize, eyeSize);
                ctx.fillRect(x + 9, y + 4, eyeSize, eyeSize);
            } else if (player.direction.y === 1) { // Down
                ctx.fillRect(x + 4, y + 9, eyeSize, eyeSize);
                ctx.fillRect(x + 9, y + 9, eyeSize, eyeSize);
            }
            ctx.fillStyle = player.color;
        } else {
            // Body segments with slight gradient effect
            ctx.globalAlpha = 0.8;
            ctx.fillRect(x + 2, y + 2, GRID_SIZE - 4, GRID_SIZE - 4);
            ctx.globalAlpha = 1;
        }
    });
}

function drawFood() {
    const x = food.x * GRID_SIZE;
    const y = food.y * GRID_SIZE;
    
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(x + GRID_SIZE / 2, y + GRID_SIZE / 2, GRID_SIZE / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Add shine effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(x + GRID_SIZE / 2 - 2, y + GRID_SIZE / 2 - 2, 2, 0, Math.PI * 2);
    ctx.fill();
}

function drawGrid() {
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i <= TILE_COUNT; i++) {
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(i * GRID_SIZE, 0);
        ctx.lineTo(i * GRID_SIZE, canvas.height);
        ctx.stroke();
        
        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, i * GRID_SIZE);
        ctx.lineTo(canvas.width, i * GRID_SIZE);
        ctx.stroke();
    }
}

// Game control functions
function startGame() {
    gameRunning = true;
    gameOver = false;
    gameMessage.textContent = '';
    startBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    gameLoop();
}

function resetGame() {
    // Reset players
    player1 = {
        body: [{ x: 10, y: 20 }],
        direction: { x: 1, y: 0 },
        nextDirection: { x: 1, y: 0 },
        score: 0,
        color: '#667eea'
    };
    
    player2 = {
        body: [{ x: 30, y: 20 }],
        direction: { x: -1, y: 0 },
        nextDirection: { x: -1, y: 0 },
        score: 0,
        color: '#f5576c'
    };
    
    food = generateFood();
    gameRunning = false;
    gameOver = false;
    gameMessage.textContent = '';
    score1Display.textContent = '0';
    score2Display.textContent = '0';
    length1Display.textContent = '1';
    length2Display.textContent = '1';
    gameSpeed = BASE_SPEED;
    startBtn.style.display = 'inline-block';
    resetBtn.style.display = 'none';
    draw();
}

// Main game loop
function gameLoop() {
    const currentTime = Date.now();
    
    if (currentTime - lastFrameTime > gameSpeed) {
        update();
        draw();
        lastFrameTime = currentTime;
    }
    
    if (gameRunning) {
        requestAnimationFrame(gameLoop);
    }
}

// Initialize game
function init() {
    food = generateFood();
    draw();
}

init();
