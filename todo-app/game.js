// Mini Frogger Game

class FroggerGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Game variables
        this.gameRunning = false;
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.speed = 2;
        
        // Player
        this.player = {
            x: this.canvas.width / 2 - 15,
            y: this.canvas.height - 50,
            width: 30,
            height: 30,
            speed: 30,
            color: '#00FF00'
        };
        
        // Lanes
        this.lanes = [];
        this.createLanes();
        
        // Keys pressed
        this.keysPressed = {};
        
        // Game over modal
        this.gameOverMessage = '';
        
        this.attachEventListeners();
    }
    
    createLanes() {
        this.lanes = [];
        const laneCount = 12;
        
        for (let i = 1; i < laneCount; i++) {
            const y = this.canvas.height - (i * 40) - 30;
            const isCarLane = i < laneCount - 2;
            
            if (isCarLane) {
                const carCount = Math.random() > 0.5 ? 2 : 3;
                const cars = [];
                
                for (let j = 0; j < carCount; j++) {
                    cars.push({
                        x: j * 150,
                        y: y,
                        width: 40,
                        height: 25,
                        speed: (Math.random() * 2 + 1) * this.speed,
                        color: this.randomColor(),
                        direction: Math.random() > 0.5 ? 1 : -1
                    });
                }
                
                this.lanes.push({
                    type: 'cars',
                    y: y,
                    cars: cars,
                    direction: cars[0].direction
                });
            } else {
                this.lanes.push({
                    type: 'water',
                    y: y,
                    logs: this.generateLogs(y)
                });
            }
        }
    }
    
    generateLogs(y) {
        const logs = [];
        const logCount = 3;
        
        for (let i = 0; i < logCount; i++) {
            logs.push({
                x: i * 150,
                y: y,
                width: 80,
                height: 20,
                speed: (Math.random() * 1.5 + 0.5) * this.speed,
                color: '#8B4513',
                direction: Math.random() > 0.5 ? 1 : -1
            });
        }
        
        return logs;
    }
    
    randomColor() {
        const colors = ['#FF006E', '#8338EC', '#3A86FF', '#FB5607', '#FFBE0B', '#8338EC'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    attachEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keysPressed[e.key.toLowerCase()] = true;
            this.handlePlayerMovement(e);
        });
        
        document.addEventListener('keyup', (e) => {
            this.keysPressed[e.key.toLowerCase()] = false;
        });
    }
    
    handlePlayerMovement(e) {
        const key = e.key.toLowerCase();
        
        if (key === 'arrowup' || key === 'w') {
            this.player.y = Math.max(10, this.player.y - this.player.speed);
            e.preventDefault();
        } else if (key === 'arrowdown' || key === 's') {
            this.player.y = Math.min(this.canvas.height - 40, this.player.y + this.player.speed);
            e.preventDefault();
        } else if (key === 'arrowleft' || key === 'a') {
            this.player.x = Math.max(0, this.player.x - this.player.speed);
            e.preventDefault();
        } else if (key === 'arrowright' || key === 'd') {
            this.player.x = Math.min(this.canvas.width - 30, this.player.x + this.player.speed);
            e.preventDefault();
        }
    }
    
    update() {
        // Update cars
        this.lanes.forEach(lane => {
            if (lane.type === 'cars') {
                lane.cars.forEach(car => {
                    car.x += car.speed * car.direction;
                    
                    if (car.direction > 0 && car.x > this.canvas.width) {
                        car.x = -car.width;
                    } else if (car.direction < 0 && car.x < -car.width) {
                        car.x = this.canvas.width;
                    }
                });
            } else if (lane.type === 'water') {
                lane.logs.forEach(log => {
                    log.x += log.speed * log.direction;
                    
                    if (log.direction > 0 && log.x > this.canvas.width) {
                        log.x = -log.width;
                    } else if (log.direction < 0 && log.x < -log.width) {
                        log.x = this.canvas.width;
                    }
                });
            }
        });
        
        // Check collisions
        this.checkCollisions();
        
        // Check win condition
        this.checkWinCondition();
    }
    
    checkCollisions() {
        // Check car collisions
        this.lanes.forEach(lane => {
            if (lane.type === 'cars') {
                lane.cars.forEach(car => {
                    if (this.isColliding(this.player, car)) {
                        this.loseLife();
                    }
                });
            }
        });
        
        // Check if player is in water without being on a log
        const playerLane = this.lanes.find(lane => 
            Math.abs(lane.y - (this.player.y + this.player.height / 2)) < 20
        );
        
        if (playerLane && playerLane.type === 'water') {
            let onLog = false;
            playerLane.logs.forEach(log => {
                if (this.isColliding(this.player, log)) {
                    onLog = true;
                    // Move player with the log
                    this.player.x += log.speed * log.direction * 0.1;
                }
            });
            
            if (!onLog) {
                this.loseLife();
            }
        }
    }
    
    isColliding(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    checkWinCondition() {
        if (this.player.y < 50) {
            this.score += 100 * this.level;
            this.level++;
            this.speed += 0.5;
            this.resetPlayerPosition();
            this.createLanes();
        }
    }
    
    loseLife() {
        this.lives--;
        if (this.lives <= 0) {
            this.endGame(false);
        } else {
            this.resetPlayerPosition();
        }
    }
    
    resetPlayerPosition() {
        this.player.x = this.canvas.width / 2 - 15;
        this.player.y = this.canvas.height - 50;
    }
    
    endGame(won) {
        this.gameRunning = false;
        this.gameOverMessage = won ? 'YOU WIN!' : 'GAME OVER!';
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grass at top and bottom
        this.ctx.fillStyle = '#228B22';
        this.ctx.fillRect(0, 0, this.canvas.width, 40);
        this.ctx.fillRect(0, this.canvas.height - 60, this.canvas.width, 60);
        
        // Draw lanes
        this.lanes.forEach((lane, index) => {
            if (lane.type === 'cars') {
                // Draw road
                this.ctx.fillStyle = '#4a4a5e';
                this.ctx.fillRect(0, lane.y - 20, this.canvas.width, 40);
                
                // Draw lane markings
                this.ctx.strokeStyle = '#FFD700';
                this.ctx.setLineDash([20, 10]);
                this.ctx.beginPath();
                this.ctx.moveTo(0, lane.y);
                this.ctx.lineTo(this.canvas.width, lane.y);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
                
                // Draw cars
                lane.cars.forEach(car => {
                    this.ctx.fillStyle = car.color;
                    this.ctx.fillRect(car.x, car.y - 12, car.width, car.height);
                    
                    // Draw windows
                    this.ctx.fillStyle = '#87CEEB';
                    this.ctx.fillRect(car.x + 5, car.y - 10, 8, 6);
                    this.ctx.fillRect(car.x + 18, car.y - 10, 8, 6);
                });
            } else if (lane.type === 'water') {
                // Draw water
                this.ctx.fillStyle = '#0066CC';
                this.ctx.fillRect(0, lane.y - 20, this.canvas.width, 40);
                
                // Draw logs
                lane.logs.forEach(log => {
                    this.ctx.fillStyle = log.color;
                    this.ctx.beginPath();
                    this.ctx.ellipse(log.x + log.width / 2, log.y, log.width / 2, log.height / 2, 0, 0, Math.PI * 2);
                    this.ctx.fill();
                    
                    // Log texture
                    this.ctx.strokeStyle = '#654321';
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                });
            }
        });
        
        // Draw player
        this.ctx.fillStyle = this.player.color;
        this.ctx.beginPath();
        this.ctx.arc(this.player.x + 15, this.player.y + 15, 15, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw frog eyes
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.arc(this.player.x + 10, this.player.y + 10, 3, 0, Math.PI * 2);
        this.ctx.arc(this.player.x + 20, this.player.y + 10, 3, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw goal
        this.ctx.fillStyle = '#FFD700';
        this.ctx.fillRect(this.canvas.width / 2 - 20, 5, 40, 30);
        this.ctx.fillStyle = '#000';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('🏁', this.canvas.width / 2, 28);
    }
    
    gameLoop() {
        if (!this.gameRunning) return;
        
        this.update();
        this.draw();
        
        if (this.gameRunning) {
            requestAnimationFrame(() => this.gameLoop());
        }
    }
    
    start() {
        this.gameRunning = true;
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.speed = 2;
        this.resetPlayerPosition();
        this.createLanes();
        this.gameLoop();
    }
    
    reset() {
        this.gameRunning = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Initialize game
let froggerGame = null;

function initGame() {
    froggerGame = new FroggerGame('gameCanvas');
    froggerGame.start();
    updateGameUI();
}

function updateGameUI() {
    if (!froggerGame || !froggerGame.gameRunning) return;
    
    document.getElementById('gameScore').textContent = froggerGame.score;
    document.getElementById('gameLives').textContent = froggerGame.lives;
    document.getElementById('gameLevel').textContent = froggerGame.level;
    
    requestAnimationFrame(updateGameUI);
}
