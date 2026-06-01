// To-Do List App with Loading Screen, Mouse Tracking, Volume Control & Mini Game

class TodoApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.editingId = null;
        this.musicEnabled = false;
        
        this.initElements();
        this.loadTasks();
        this.attachEventListeners();
        this.startLoading();
    }

    initElements() {
        // Loading Screen Elements
        this.loadingScreen = document.getElementById('loadingScreen');
        this.loadingContent = document.getElementById('loadingContent');
        this.loadingFill = document.getElementById('loadingFill');
        this.loadingText = document.getElementById('loadingText');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.volumeValue = document.getElementById('volumeValue');
        this.musicToggle = document.getElementById('musicToggle');
        this.musicIcon = document.getElementById('musicIcon');
        this.mainApp = document.getElementById('mainApp');
        
        // App Elements
        this.taskInput = document.getElementById('taskInput');
        this.addBtn = document.getElementById('addBtn');
        this.taskList = document.getElementById('taskList');
        this.emptyState = document.getElementById('emptyState');
        this.clearCompleted = document.getElementById('clearCompleted');
        this.totalCount = document.getElementById('totalCount');
        this.activeCount = document.getElementById('activeCount');
        this.completedCount = document.getElementById('completedCount');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.appMusicToggle = document.getElementById('appMusicToggle');
        this.appMusicIcon = document.getElementById('appMusicIcon');
        this.appVolumeSlider = document.getElementById('appVolumeSlider');
        this.appVolumeValue = document.getElementById('appVolumeValue');
        this.bgMusic = document.getElementById('bgMusic');
        
        // Game Elements
        this.gameButton = document.getElementById('gameButton');
        this.gameModal = document.getElementById('gameModal');
        this.closeGameBtn = document.getElementById('closeGameBtn');
    }

    attachEventListeners() {
        // Loading Screen Mouse Tracking
        this.loadingScreen.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Loading Screen Volume Control
        this.volumeSlider.addEventListener('input', (e) => this.handleVolumeChange(e));
        
        // Loading Screen Music Toggle
        this.musicToggle.addEventListener('click', () => this.toggleLoadingMusic());
        
        // App Elements
        this.addBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
        this.clearCompleted.addEventListener('click', () => this.clearCompletedTasks());
        this.appMusicToggle.addEventListener('click', () => this.toggleAppMusic());
        
        // App Volume Control
        this.appVolumeSlider.addEventListener('input', (e) => this.handleAppVolumeChange(e));
        
        // Game Controls
        this.gameButton.addEventListener('click', () => this.openGame());
        this.closeGameBtn.addEventListener('click', () => this.closeGame());
        
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });
    }

    openGame() {
        this.gameModal.classList.remove('hidden');
        initGame();
    }

    closeGame() {
        this.gameModal.classList.add('hidden');
        if (froggerGame) {
            froggerGame.reset();
        }
    }

    handleMouseMove(e) {
        const mouseX = (e.clientX / window.innerWidth) * 100;
        const mouseY = (e.clientY / window.innerHeight) * 100;
        
        const centerX = 50;
        const centerY = 50;
        
        const rotateX = (mouseY - centerY) * 0.5;
        const rotateY = (mouseX - centerX) * 0.5;
        
        this.loadingContent.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }

    handleVolumeChange(e) {
        const volume = parseInt(e.target.value);
        this.volumeValue.textContent = volume + '%';
        this.bgMusic.volume = volume / 100;
    }

    handleAppVolumeChange(e) {
        const volume = parseInt(e.target.value);
        this.appVolumeValue.textContent = volume + '%';
        this.bgMusic.volume = volume / 100;
        this.volumeSlider.value = volume;
    }

    startLoading() {
        let progress = 0;
        const messages = [
            'Initializing...',
            'Loading tasks...',
            'Preparing interface...',
            'Getting ready...',
            'Almost there...'
        ];

        const interval = setInterval(() => {
            progress += Math.random() * 25;
            if (progress > 90) progress = 90;
            
            this.loadingFill.style.width = progress + '%';
            const messageIndex = Math.floor(progress / 20);
            this.loadingText.textContent = messages[Math.min(messageIndex, messages.length - 1)];
            
            if (progress >= 90) {
                clearInterval(interval);
                setTimeout(() => this.completeLoading(), 800);
            }
        }, 500);
    }

    completeLoading() {
        this.loadingFill.style.width = '100%';
        this.loadingText.textContent = 'Welcome! 🚀';
        
        setTimeout(() => {
            this.loadingScreen.classList.add('hidden');
            this.mainApp.classList.remove('hidden');
            this.appVolumeSlider.value = this.volumeSlider.value;
            
            if (!this.musicEnabled) {
                this.fadeOutLoadingMusic();
            }
            this.render();
            this.taskInput.focus();
        }, 500);
    }

    toggleLoadingMusic() {
        this.musicEnabled = !this.musicEnabled;
        
        if (this.musicEnabled) {
            this.fadeInMusic();
            this.musicToggle.classList.remove('muted');
            this.musicIcon.textContent = '🔊';
        } else {
            this.fadeOutMusic();
            this.musicToggle.classList.add('muted');
            this.musicIcon.textContent = '🔇';
        }
    }

    toggleAppMusic() {
        this.musicEnabled = !this.musicEnabled;
        
        if (this.musicEnabled) {
            this.fadeInMusic();
            this.appMusicToggle.classList.remove('muted');
            this.appMusicIcon.textContent = '🔊';
        } else {
            this.fadeOutMusic();
            this.appMusicToggle.classList.add('muted');
            this.appMusicIcon.textContent = '🔇';
        }
    }

    fadeInMusic(duration = 2000) {
        const steps = 50;
        const stepDuration = duration / steps;
        let step = 0;
        const targetVolume = parseInt(this.volumeSlider.value) / 100;
        
        this.bgMusic.play().catch(err => console.log('Audio play error:', err));
        
        const fadeInterval = setInterval(() => {
            step++;
            this.bgMusic.volume = (step / steps) * targetVolume;
            
            if (step >= steps) {
                clearInterval(fadeInterval);
                this.bgMusic.volume = targetVolume;
            }
        }, stepDuration);
    }

    fadeOutMusic(duration = 1000) {
        const steps = 50;
        const stepDuration = duration / steps;
        let step = 0;
        const startVolume = this.bgMusic.volume;
        
        const fadeInterval = setInterval(() => {
            step++;
            this.bgMusic.volume = startVolume * (1 - step / steps);
            
            if (step >= steps) {
                clearInterval(fadeInterval);
                this.bgMusic.pause();
            }
        }, stepDuration);
    }

    fadeOutLoadingMusic() {
        const steps = 30;
        const stepDuration = 500 / steps;
        let step = 0;
        const startVolume = this.bgMusic.volume;
        
        const fadeInterval = setInterval(() => {
            step++;
            this.bgMusic.volume = startVolume * (1 - step / steps);
            
            if (step >= steps) {
                clearInterval(fadeInterval);
                this.bgMusic.pause();
            }
        }, stepDuration);
    }

    addTask() {
        const text = this.taskInput.value.trim();
        
        if (!text) {
            alert('Please enter a task');
            return;
        }

        const task = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: 'medium',
            createdAt: new Date().toLocaleString()
        };

        this.tasks.push(task);
        this.taskInput.value = '';
        this.taskInput.focus();
        this.saveTasks();
        this.render();
    }

    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveTasks();
            this.render();
        }
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    editTask(id) {
        if (this.editingId) return;
        
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        this.editingId = id;
        this.render();

        setTimeout(() => {
            const editInput = document.getElementById(`edit-input-${id}`);
            if (editInput) {
                editInput.focus();
                editInput.select();
            }
        }, 0);
    }

    saveEdit(id) {
        const editInput = document.getElementById(`edit-input-${id}`);
        const newText = editInput.value.trim();

        if (!newText) {
            alert('Task cannot be empty');
            return;
        }

        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.text = newText;
            this.editingId = null;
            this.saveTasks();
            this.render();
        }
    }

    cancelEdit() {
        this.editingId = null;
        this.render();
    }

    clearCompletedTasks() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        
        if (completedCount === 0) {
            alert('No completed tasks to clear');
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveTasks();
            this.render();
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const saved = localStorage.getItem('tasks');
        this.tasks = saved ? JSON.parse(saved) : [];
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default:
                return this.tasks;
        }
    }

    updateStats() {
        const totalTasks = this.tasks.length;
        const activeTasks = this.tasks.filter(t => !t.completed).length;
        const completedTasks = this.tasks.filter(t => t.completed).length;

        this.totalCount.textContent = totalTasks;
        this.activeCount.textContent = activeTasks;
        this.completedCount.textContent = completedTasks;
    }

    render() {
        this.updateStats();
        
        const filteredTasks = this.getFilteredTasks();
        this.taskList.innerHTML = '';

        if (filteredTasks.length === 0) {
            this.emptyState.classList.remove('hidden');
        } else {
            this.emptyState.classList.add('hidden');
        }

        const hasCompleted = this.tasks.some(t => t.completed);
        if (hasCompleted) {
            this.clearCompleted.classList.remove('hidden');
        } else {
            this.clearCompleted.classList.add('hidden');
        }

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''} ${this.editingId === task.id ? 'edit-mode' : ''}`;

            if (this.editingId === task.id) {
                li.innerHTML = `
                    <input 
                        type="checkbox" 
                        class="task-checkbox" 
                        ${task.completed ? 'checked' : ''}
                        disabled
                    >
                    <input 
                        type="text" 
                        id="edit-input-${task.id}" 
                        class="edit-input" 
                        value="${this.escapeHtml(task.text)}"
                    >
                    <button class="task-btn save-btn" onclick="app.saveEdit(${task.id})">Save</button>
                    <button class="task-btn cancel-btn" onclick="app.cancelEdit()">Cancel</button>
                `;
            } else {
                li.innerHTML = `
                    <input 
                        type="checkbox" 
                        class="task-checkbox" 
                        ${task.completed ? 'checked' : ''}
                        onchange="app.toggleTask(${task.id})"
                    >
                    <span class="task-priority ${task.priority}">${task.priority}</span>
                    <span class="task-text">${this.escapeHtml(task.text)}</span>
                    <div class="task-actions">
                        <button class="task-btn edit-btn" onclick="app.editTask(${task.id})">Edit</button>
                        <button class="task-btn delete-btn" onclick="app.deleteTask(${task.id})">Delete</button>
                    </div>
                `;
            }

            this.taskList.appendChild(li);
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app
const app = new TodoApp();

// Keyboard shortcuts
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && app.editingId) {
        app.saveEdit(app.editingId);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && app.editingId) {
        app.cancelEdit();
    }
});
