# Gaming Universe - ThreeJS Experience

A modern, immersive Three.js website showcasing popular competitive gaming titles with stunning 3D visualizations and interactive elements.

## 🌐 Live Site
**Visit the live site:** [Gaming Universe](https://sanad-t.github.io/threejs-site/)

## 🎮 Featured Games

- **Dota 2** - Multiplayer Online Battle Arena (MOBA)
- **Counter-Strike 2** - Tactical First-Person Shooter
- **Valorant** - Tactical Hero Shooter
- **League of Legends** - Strategic MOBA
- **Fortnite** - Battle Royale
- **Overwatch 2** - Team-based FPS
- **PUBG** - Battle Royale
- **News** - Gaming Updates
- **Tournaments** - Esports Events
- **Streams** - Live Gaming
- **Merchandise** - Gaming Gear

## ✨ Features

- **Interactive 3D Scenes** - Each game page features unique Three.js visualizations
- **Responsive Design** - Optimized for desktop and mobile devices
- **Smooth Animations** - GSAP-powered transitions and effects
- **Professional UI** - Minimal, eye-friendly design with subdued colors
- **Modern Navigation** - Smooth page transitions with active state indicators
- **Loading Screen** - Engaging loading experience with progress animation
- **Proper URL Routing** - Clean URLs for each page (e.g., `/dota2`, `/news`)

## 🛠️ Technologies Used

- **Three.js** - 3D graphics and WebGL rendering
- **GSAP** - Advanced animations and transitions
- **Vite** - Fast development server and build tool
- **Modern CSS** - Grid, Flexbox, and CSS animations
- **ES6+ JavaScript** - Modern JavaScript features and modules

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sanad-t/threejs-site.git
   cd threejs-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - The application will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, manually navigate to the URL

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
threejs-site/
├── index.html              # Main HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── README.md              # Project documentation
├── styles/
│   └── main.css           # Main stylesheet
└── js/
    ├── main.js            # Main JavaScript with Three.js scenes
    └── router.js          # URL routing system
```

## 🎨 Design Features

- **Color Palette**: Subdued blues and grays to reduce eye strain
- **Typography**: Orbitron for headings, Rajdhani for body text
- **Layout**: Full-screen pages with overlay content
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach

## 🎯 Game Pages

### Home Page
- Floating 3D spheres representing gaming elements
- Hero section with call-to-action buttons
- Smooth particle animations

### Dota 2 Page
- Red-themed particle system
- Game statistics and hero showcase
- Interactive hero cards

### CS:GO 2 Page
- Geometric shapes representing tactical gameplay
- Weapon showcase with hover effects
- Military-themed color scheme

### Valorant Page
- Neon wireframe effects
- Agent showcase with abilities
- Futuristic design elements

### League of Legends Page
- Magical torus and floating orbs
- Champion showcase
- Gold-themed color scheme

### Additional Pages
- **Fortnite**: Colorful battle royale scene
- **Overwatch 2**: Futuristic hero shooter elements
- **PUBG**: Military-themed battle royale
- **News**: Gaming news and updates
- **Tournaments**: Major esports events
- **Streams**: Live streaming information
- **Merchandise**: Gaming merchandise store
- **About**: Technology showcase
- **Contacts**: Contact form and information

## 🎮 Interactive Elements

- **Navigation**: Smooth page transitions with proper URL routing
- **Buttons**: Hover effects and animations
- **Cards**: Interactive game/hero/weapon cards
- **Mobile Menu**: Responsive hamburger menu
- **Loading Screen**: Animated progress bar

## 🔧 Customization

### Adding New Games
1. Add a new section in `index.html`
2. Create a new scene method in `js/main.js`
3. Add navigation link
4. Update styles in `styles/main.css`

### Modifying Colors
The main color variables are:
- Primary: `#4a90e2` (Blue)
- Secondary: `#7b68ee` (Purple)
- Background: `#0a0a0a` (Dark)
- Text: `#e0e0e0` (Light)

### Changing Animations
- Modify animation speeds in the `animate()` functions
- Adjust GSAP animations in the main.js file
- Update CSS transitions in main.css

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Optimization

- Responsive navigation with hamburger menu
- Touch-friendly interactions
- Optimized 3D performance
- Adaptive layouts for different screen sizes

## 🚀 Performance Tips

- The application uses efficient Three.js rendering
- GSAP animations are hardware-accelerated
- Images and assets are optimized
- Lazy loading for better performance

## 🤝 Contributing

Feel free to contribute to this project by:
- Adding new game pages
- Improving animations
- Enhancing mobile experience
- Adding new interactive features

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

- Add more games and scenes
- Implement 3D models for characters/weapons
- Add sound effects and background music
- Create interactive 3D environments
- Add multiplayer features
- Implement game statistics API integration

---

**Enjoy exploring the Gaming Universe! 🎮✨**

**Live Site:** [https://sanad-t.github.io/threejs-site/](https://sanad-t.github.io/threejs-site/)
