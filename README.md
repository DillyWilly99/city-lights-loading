# City Lights RP - Loading Screen

A beautiful, customizable QBCore loading screen with neon aesthetics and music support.

## Features

✨ **Neon Design** - Matching the City Lights aesthetic with hot pink, purple, and blue colors  
🎵 **Music Support** - Background music with fade in/out controls  
📊 **Server Info** - Display player count and ping  
⏳ **Progress Tracking** - Animated loading bar  
💡 **Tips & Quotes** - Random tips cycle during loading  
📱 **Responsive** - Works on all screen sizes  
🎮 **QBCore Compatible** - Easy integration with QBCore servers  

## Installation

1. Place the entire folder in your `resources` directory
2. Add to your `server.cfg`:
```
ensure city-lights-loading
```

## Customization

### Change Background Image
Edit the `.background` in `html/style.css` and replace the SVG gradient or add your own image.

### Change Music
Replace `html/music.mp3` with your desired music file (must be MP3 or OGG format).

### Change Tips
Edit the `tips` array in `html/script.js` to add your own loading tips.

### Change Colors
The main colors used:
- Primary Pink: `#ff006e`
- Secondary Purple: `#8338ec`
- Secondary Blue: `#3a86ff`

Edit these hex values throughout the CSS to change the color scheme.

### Change Server Info
Update the server info section in `html/index.html` or send messages from your server:

```lua
TriggerClientEvent('loadscreen:updateInfo', -1, {
    action = 'updatePlayerCount',
    players = GetNumPlayers(),
    maxPlayers = 128
})
```

## File Structure

```
city-lights-loading/
├── fxmanifest.lua      # FiveM manifest
├── README.md           # This file
└── html/
    ├── index.html      # Main HTML
    ├── style.css       # Styling
    ├── script.js       # Functionality
    └── music.mp3       # Background music (add your own)
```

## Server Events

You can trigger these events from your server to update the loading screen:

```lua
-- Update player count
TriggerClientEvent('loadscreen:updateInfo', -1, {
    action = 'updatePlayerCount',
    players = currentPlayers,
    maxPlayers = maxSlots
})

-- Update ping
TriggerClientEvent('loadscreen:updateInfo', -1, {
    action = 'updatePing',
    ping = playerPing
})

-- Complete loading
TriggerClientEvent('loadscreen:updateInfo', -1, {
    action = 'completeLoading'
})
```

## Music Controls

Players can click the music button to toggle music on/off during loading. The music fades in smoothly on start and fades out on server transition.

## Tips for Best Results

1. **Music File Size**: Keep your music file under 10MB for faster loading
2. **Background**: The current background is a gradient; you can replace it with an image by modifying the `.background` CSS
3. **Testing**: Test the loading screen in single-player first to ensure it displays correctly
4. **Discord**: Add your Discord invite in the HTML if desired

## Support

For issues or questions, make sure:
- Music file is properly named `music.mp3`
- All files are in the correct directories
- The resource is started before the server fully loads

Enjoy your City Lights RP loading screen! 🌃✨
