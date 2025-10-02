# ExoDetect - AI Exoplanet Detection Frontend

A modern React frontend for the NASA Space Apps Challenge 2025 exoplanet detection project. This application provides an intuitive interface for uploading transit photometry data, analyzing it with AI/ML models, and exploring confirmed exoplanets.

## 🚀 Features

- **Modern Space-Themed UI**: Beautiful, responsive design with smooth animations
- **Data Upload Interface**: Drag-and-drop file upload with progress tracking
- **Interactive Exoplanet Gallery**: Browse and explore confirmed exoplanets with detailed information
- **Real-time Analysis Results**: View AI model predictions with confidence scores and explanations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Educational Content**: Learn about exoplanet detection methods and NASA missions

## 🛠 Tech Stack

- **React 18** - Modern React with hooks and functional components
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations and transitions
- **Recharts** - Interactive data visualizations
- **Lucide React** - Beautiful icon library
- **CSS Variables** - Consistent theming and dark mode support

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd exoplanet-detection-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation component
│   └── Navbar.css      # Navigation styles
├── pages/              # Main application pages
│   ├── Home.js         # Landing page
│   ├── Upload.js       # Data upload interface
│   ├── Gallery.js      # Exoplanet gallery
│   ├── Results.js      # Analysis results
│   ├── About.js        # About page
│   └── *.css          # Page-specific styles
├── App.js             # Main application component
├── App.css            # Global application styles
├── index.js           # Application entry point
└── index.css          # Global CSS variables and base styles
```

## 🌟 Key Features

### Home Page
- Hero section with animated planetary system
- Feature highlights with interactive cards
- Technology showcase with neural network visualization
- Call-to-action sections

### Upload Interface
- Drag-and-drop file upload
- File validation and preview
- Progress tracking with animations
- Support for CSV, FITS, and TXT files

### Exoplanet Gallery
- Interactive planet cards with hover effects
- Search and filter functionality
- Detailed modal views with planetary data
- Confidence scoring visualization

### Results Dashboard
- Tabbed interface for multiple analyses
- Interactive light curve charts
- Confidence scoring with bar charts
- Detailed AI explanations

### About Page
- Team role descriptions
- NASA mission information
- Technology stack overview
- Project impact metrics

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The build folder can be deployed to any static hosting service like:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

## 🤝 Contributing

This project was developed for the NASA Space Apps Challenge 2025. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🏆 NASA Space Apps Challenge 2025

ExoDetect was created as part of the NASA Space Apps Challenge 2025, focusing on advancing exoplanet detection through AI and machine learning. The project demonstrates the power of combining NASA's space mission data with modern web technologies to create accessible scientific tools.

## 🔗 Related Links

- [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/)
- [Kepler Mission](https://www.nasa.gov/kepler)
- [TESS Mission](https://www.nasa.gov/tess-transiting-exoplanet-survey-satellite)
- [NASA Space Apps Challenge](https://www.spaceappschallenge.org/)
