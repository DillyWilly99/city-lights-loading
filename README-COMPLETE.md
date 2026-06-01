# City Lights To-Do List Application 🌃✨

A modern, feature-rich to-do list application with an interactive loading screen, volume controls, mouse tracking, and an included Frogger mini-game!

## 🎯 Features

### Main To-Do List App
- ✅ **Add & Manage Tasks** - Create, edit, and delete tasks easily
- 📋 **Task Filtering** - View all, active, or completed tasks
- ✔️ **Mark Complete** - Check off finished tasks with visual feedback
- 📊 **Live Statistics** - Track total, active, and completed tasks
- 💾 **Local Storage** - All tasks persist in browser storage
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile

### Loading Screen
- 🎨 **City Lights Aesthetic** - Beautiful neon gradient design with purple, pink, and blue colors
- 🖱️ **Interactive Mouse Tracking** - 3D perspective effect that follows your cursor
- 🔊 **Volume Control Slider** - Smooth gradient slider with real-time percentage display
- 🎵 **Music Toggle** - Easy on/off control with fade in/out effects
- ⏳ **Animated Progress Bar** - Smooth loading bar with gradient colors

### Main App Features
- 🔊 **Volume Slider** - Control music level with synchronized loading screen slider
- 🎮 **Mini Game Button** - Quick access to Frogger game
- 🎵 **Music Control** - Toggle background music during tasks
- 💜 **Purple Gradient Theme** - Modern gradient background matching City Lights

### 🐸 Frogger Mini Game
- 🎮 **Classic Gameplay** - Navigate a frog across roads and rivers
- 🚗 **Dynamic Traffic** - Randomly generated cars with different colors and speeds
- 🌊 **Water Obstacles** - Floating logs to jump on to cross the water
- 📈 **Progressive Difficulty** - Speed increases with each level
- 💯 **Score System** - Earn points for each successful crossing
- ❤️ **Lives System** - 3 lives per game
- ⌨️ **Keyboard Controls** - Arrow keys or WASD to move
- 🎨 **Beautiful Graphics** - Colorful, well-animated game elements

## 📁 Project Structure

```
city-lights-loading/
├── fxmanifest.lua              # FiveM manifest for loading screen
├── html/
│   ├── index.html              # Loading screen HTML
│   ├── style.css               # Loading screen CSS
│   ├── script.js               # Loading screen JS
│   └── music.mp3               # Background music (add your own)
├── todo-app/
│   ├── index.html              # Main app HTML with game modal
│   ├── style.css               # All styling (app + game)
│   ├── script.js               # Main app logic
│   ├── game.js                 # Frogger game logic
│   ├── rap-music.mp3           # Background music (add your own)
│   └── README.md               # App documentation
└── README.md                   # This file
```

## 🚀 Getting Started

### Installation

1. **Clone or download the repository**
```bash
git clone https://github.com/DillyWilly99/city-lights-loading.git
cd city-lights-loading
```

2. **Add Music Files** (Optional but recommended)
   - Add `rap-music.mp3` to the `todo-app/` folder
   - Add `music.mp3` to the `html/` folder (for loading screen)

3. **Open the App**
   - Open `todo-app/index.html` in your browser
   - Or use a local server: `python -m http.server 8000`

### Usage

#### Adding Tasks
1. Type your task in the input field
2. Press Enter or click "Add Task"
3. Task is automatically saved to local storage

#### Editing Tasks
1. Click "Edit" button on any task
2. Modify the text
3. Click "Save" or press Enter
4. Press Escape to cancel

#### Managing Tasks
- **Check Complete**: Click the checkbox to mark complete
- **Delete**: Click "Delete" to remove a task
- **Filter**: Use All/Active/Completed buttons to filter view
- **Clear Completed**: Remove all completed tasks at once

#### Playing Frogger
1. Click "🎮 Play Mini Game" button
2. Use Arrow Keys or WASD to move the frog
3. Avoid traffic (cars)
4. Jump on logs to cross water
5. Reach the goal at the top to advance levels
6. Close modal to return to tasks

#### Music & Volume
- **Loading Screen**: Use the volume slider before loading completes
- **Main App**: Adjust volume with the slider in the app
- **Toggle**: Click music button to turn on/off
- **Fade Effect**: Music smoothly fades in and out

#### Mouse Tracking
- Move your mouse on the loading screen to see the 3D perspective effect
- The content rotates based on cursor position
- Creates an immersive interactive experience

## 🎮 Frogger Game Controls

| Key | Action |
|-----|--------|
| ⬆️ Arrow Up / W | Move Up |
| ⬇️ Arrow Down / S | Move Down |
| ⬅️ Arrow Left / A | Move Left |
| ➡️ Arrow Right / D | Move Right |

### Game Mechanics
- **Lives**: Start with 3 lives
- **Cars**: Moving obstacles that end your game if hit
- **Logs**: Float across water lanes, you must stay on them
- **Scoring**: 100 points × level for each successful crossing
- **Levels**: Progress increases difficulty (faster movement)

## 🎨 Design & Colors

### Color Palette
- **Primary Pink**: `#ff006e` - Neon pink accent
- **Secondary Purple**: `#8338ec` - Purple gradient
- **Secondary Blue**: `#3a86ff` - Blue gradient
- **Loading BG**: `#1a0033` to `#2d0052` - Dark purple gradient
- **App BG**: `#667eea` to `#764ba2` - Purple gradient

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Loading Title**: 4rem, gradient text
- **App Title**: 2.5rem, dark gray
- **Body**: 1rem, comfortable reading size

## 💾 Local Storage

Tasks are stored in browser's localStorage under the key `tasks` as JSON:

```javascript
{
  id: 1234567890,
  text: "Buy groceries",
  completed: false,
  priority: "medium",
  createdAt: "6/1/2026, 7:30:00 PM"
}
```

### Clear All Data
To reset all tasks, open browser console and run:
```javascript
localStorage.removeItem('tasks');
location.reload();
```

## 🔧 Customization

### Change Game Music
Replace `rap-music.mp3` in `todo-app/` folder with your own music file.

### Change Loading Screen Music
Replace `music.mp3` in `html/` folder.

### Change Colors
Edit color values in CSS files:
- `todo-app/style.css` - Main app colors
- `html/style.css` - Loading screen colors

### Modify Game Difficulty
Edit `todo-app/game.js`:
```javascript
this.speed = 2;  // Change initial speed
this.speed += 0.5;  // Change level speed increase
```

### Adjust Volume Range
Edit volume slider max value in `todo-app/index.html`:
```html
<input type="range" max="100" value="60">  <!-- Change max/value -->
```

## 🌐 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+

## 📊 Features Breakdown

### Loading Screen (`html/`)
- Animated gradient background
- Responsive 3D mouse tracking
- Volume control with real-time display
- Music toggle with fade effects
- Loading progress animation
- Full screen experience

### Main App (`todo-app/`)
- Clean, modern interface
- Smooth animations throughout
- Task management with CRUD operations
- Filter system for task viewing
- Real-time statistics
- Volume control synced with loading screen
- Game button integration

### Game (`game.js`)
- Canvas-based rendering
- Collision detection
- Multiple game lanes (cars/water/logs)
- Score and level system
- Lives mechanic
- Smooth movement with keyboard input
- Responsive difficulty scaling

## 🎯 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Enter | Add task or save edit |
| Escape | Cancel editing |
| Arrow Keys | Move in game |
| WASD | Move in game |

## 📈 Future Enhancements

Potential features to add:
- Dark/Light mode toggle
- Task categories/tags
- Due dates and reminders
- Cloud synchronization
- More mini games
- Sound effects
- Task notes/descriptions
- Recurring tasks
- Multiple profiles

## 🐛 Troubleshooting

### Music won't play
- Ensure audio file is in the correct folder
- Check browser autoplay permissions
- Try clicking the music toggle button

### Tasks not saving
- Check if localStorage is enabled in browser
- Clear browser cache and try again
- Check browser console for errors

### Game won't load
- Ensure `game.js` is loaded after `script.js`
- Check canvas element exists in HTML
- Verify browser supports HTML5 Canvas

### Mouse tracking not working
- Only works on loading screen
- Move mouse within browser window
- Check if JavaScript is enabled

## 📝 Notes

- All data is stored locally in your browser
- No data is sent to any server
- Clearing browser data will delete tasks
- Different browsers have separate storage

## 🙏 Credits

Built with ♥️ using:
- HTML5 Canvas for gaming
- CSS3 for animations and gradients
- Vanilla JavaScript (no dependencies)
- City Lights aesthetic inspiration

## 📄 License

This project is open source and available for personal and commercial use.

## 🔗 Links

- **GitHub**: https://github.com/DillyWilly99/city-lights-loading
- **Live Demo**: Open `todo-app/index.html` in your browser

## 💬 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Ensure all files are in correct folders
4. Try clearing cache and reloading

---

**Version**: 2.0.0  
**Last Updated**: June 1, 2026  
**Created by**: DillyWilly99

Enjoy organizing your tasks with style! 🚀✨
