# UnsaidScript Portfolio

A modern, animated portfolio website built with React, Tailwind CSS, and Framer Motion. Features a clean, dark aesthetic with interactive backgrounds, smooth animations, and a modular architecture.

![UnsaidScript](https://img.shields.io/badge/UnsaidScript-Portfolio-cyan?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)

## ✨ Features

- **Animated Backgrounds** - Canvas-based particle systems, world map connections, train animations, and nebula effects
- **Smooth Animations** - Powered by Framer Motion with reduced motion support
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Dark Theme** - Elegant dark UI with gradient accents
- **Modular Architecture** - Well-organized component structure for easy maintenance
- **Performance Optimized** - Lazy loading, reduced particles on mobile, respects `prefers-reduced-motion`
- **SEO Ready** - Meta tags, Open Graph, and Twitter card support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Abdu11ahMamun/unsaidscript.git
cd unsaidscript

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview the production build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── animations/          # Animation-related components
│   │   ├── FloatingActionButton.jsx
│   │   ├── GlobalStyles.jsx
│   │   ├── IntroLoader.jsx
│   │   ├── RoleType.jsx
│   │   └── index.js
│   │
│   ├── backgrounds/         # Canvas background components
│   │   ├── HeroBackground.jsx
│   │   ├── NotesNebula.jsx
│   │   ├── TrainBackground.jsx
│   │   ├── WorldMapBackground.jsx
│   │   └── index.js
│   │
│   ├── cards/               # Card components for content
│   │   ├── BlogCard.jsx
│   │   ├── BookCard.jsx
│   │   ├── NoteCard.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── StatCard.jsx
│   │   └── index.js
│   │
│   ├── layout/              # Layout components
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── index.js
│   │
│   ├── terminal/            # Terminal-style components
│   │   ├── TerminalPanel.jsx
│   │   └── index.js
│   │
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Container.jsx
│   │   ├── GradientText.jsx
│   │   ├── Modal.jsx
│   │   ├── Section.jsx
│   │   └── index.js
│   │
│   └── index.js             # Barrel export
│
├── data/                    # Static data files
│   ├── blogPosts.js
│   ├── books.js
│   ├── notes.js
│   ├── projects.js
│   ├── services.js
│   └── index.js
│
├── hooks/                   # Custom React hooks
│   ├── useIntroLoader.js
│   ├── useMobileMenu.js
│   ├── useScrollTo.js
│   └── index.js
│
├── utils/                   # Utility functions
│   ├── cn.js               # className utility
│   ├── helpers.js          # Helper functions & constants
│   ├── safeCopy.js         # Clipboard utility
│   └── index.js
│
├── App.jsx                  # Main application component
├── App.css                  # App-specific styles
├── index.css                # Global styles & Tailwind
└── main.jsx                 # React entry point
```

## 🎨 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS 3 |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Canvas** | Native HTML5 Canvas API |

## 📦 Key Components

### Background Components

- **HeroBackground** - Floating particle system
- **WorldMapBackground** - Animated world map with city connections
- **TrainBackground** - Moving train on stylized tracks
- **NotesNebula** - Cosmic nebula effect (lazy loaded)

### UI Components

- **Card** - Reusable card with hover effects
- **Modal** - Animated modal with copy functionality
- **GradientText** - Text with gradient coloring
- **Container** - Responsive content wrapper
- **Section** - Page section wrapper

### Custom Hooks

- **useScrollTo** - Smooth scrolling to elements
- **useMobileMenu** - Mobile menu state with body scroll lock
- **useIntroLoader** - Intro animation timing

## 🔧 Configuration

### Tailwind CSS

The project uses a custom Tailwind configuration. Modify `tailwind.config.js` to customize:

- Colors and gradients
- Breakpoints
- Animations
- Fonts

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_SITE_URL=https://yourdomain.com
```

## 📱 Responsive Breakpoints

| Breakpoint | Width |
|------------|-------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

## ♿ Accessibility

- Respects `prefers-reduced-motion`
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy the dist/ folder
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host"]
```

## 📄 License

MIT License - feel free to use this project as a template for your own portfolio.

## 👤 Author

**Abdullah Al Mamun**

- GitHub: [@Abdu11ahMamun](https://github.com/Abdu11ahMamun)
- LinkedIn: [abdu11ahmamun](https://www.linkedin.com/in/abdu11ahmamun/)
- Email: cs.abdullah@gmail.com

---

<p align="center">
  Built with ❤️ using React, Tailwind CSS & Framer Motion
</p>
