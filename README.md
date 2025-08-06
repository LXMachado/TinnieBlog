# TinnieDev - AI & Web Development Hub

A modern, futuristic blog and landing site built for showcasing cutting-edge web development content and AI insights. Features a sleek glassmorphic design with full dark/light mode support.

## 🚀 Features

- **Modern Design**: Glassmorphic UI effects with subtle animations
- **Dark/Light Mode**: Seamless theme switching with persistent preferences
- **Responsive Layout**: Optimized for all device sizes
- **Custom Branding**: Professional logo design with theme-aware variants
- **Fast Performance**: Lightweight static site with optimized assets

## 🛠 Tech Stack

- **Frontend**: Astro.js with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Backend**: Express.js API + PostgreSQL database
- **Build Tools**: Vite (integrated with Astro)
- **Typography**: Google Fonts (Poppins + Orbitron)
- **Icons**: Custom SVG logo with theme variants

## 📁 Project Structure

```
├── src/
│   ├── components/           # Reusable Astro components
│   │   ├── Layout.astro     # Main layout wrapper
│   │   ├── Navbar.astro     # Navigation component
│   │   ├── Footer.astro     # Footer component
│   │   ├── SEO.astro        # SEO meta tags
│   │   └── ...              # Other components
│   ├── layouts/             # Layout templates
│   │   └── BlogLayout.astro # Blog post layout
│   ├── pages/               # Application pages and routes
│   │   ├── index.astro      # Homepage
│   │   ├── about.astro      # About page
│   │   ├── contact.astro    # Contact page
│   │   └── blog/            # Blog pages
│   └── styles/              # Global styles and CSS
│       └── global.css       # Main stylesheet
├── public/                  # Static assets
│   ├── images/
│   │   ├── t-dev-dark.svg   # Dark theme logo
│   │   └── t-dev-light.svg  # Light theme logo
│   └── favicon.svg          # Site favicon
├── server.js                # Express.js API server
├── database.js              # PostgreSQL database setup
├── astro.config.mjs         # Astro configuration
├── tailwind.config.mjs      # Tailwind CSS configuration
└── package.json             # Dependencies
```

## 🎨 Design System

### Color Palette
- **Primary**: #007AFE (Tinnie Blue)
- **Primary Light**: #00C2FF (Light theme variant)
- **Accent**: #E0F4F5
- **Dark Background**: #0C1618
- **Light Background**: #FFFFFF

### Typography
- **Headings**: Orbitron (400-700 weights)
- **Body Text**: Poppins (300-700 weights)

### Features
- Glassmorphic cards with backdrop blur
- Smooth hover animations
- Theme-aware logo switching
- Responsive grid layouts

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/LXMachado/technology-blog.git
cd technology-blog
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
# or for the Express API server
node server.js
```

4. Open your browser and navigate to:

```text
http://localhost:5001
```

## 📄 Pages

### Homepage (`/`)

- Hero section with call-to-action
- Featured content cards  
- Technology showcase
- Newsletter signup

### Blog (`/blog/`)

- Article listings with categories
- Search and filter functionality
- Featured posts section
- Dynamic routing for individual posts

### Tutorials (`/blog/artificial-intelligence-tutorials`)

- Tutorial cards with difficulty levels
- Technology filters
- Step-by-step guides
- Code examples

### About (`/about`)

- Mission and vision
- Team member profiles
- Company values
- Technology expertise

### Contact (`/contact`)

- Contact form
- Social media links
- Office information
- Interactive elements

## 🌓 Theme System

The site includes a robust dark/light mode system:

- **Automatic Detection**: Respects system preferences
- **Manual Toggle**: Theme switcher in header
- **Persistent Storage**: Remembers user preference
- **Smooth Transitions**: Animated theme changes
- **Logo Variants**: Theme-specific logo colors

## 🎯 Performance

- **Lightweight**: No external frameworks
- **Fast Loading**: Optimized assets and minimal dependencies
- **SEO Friendly**: Semantic HTML structure
- **Accessible**: WCAG compliant design patterns

## 🔧 Customization

### Adding New Pages

1. Create new `.astro` file in `src/pages/` directory
2. Follow the existing component structure
3. Update navigation links in `Navbar.astro`
4. Add corresponding styles if needed

### Modifying Colors

Update Tailwind configuration in `tailwind.config.mjs`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#007afe',
        'primary-light': '#00C2FF',
        // Add your colors here
      }
    }
  }
}
```

### Adding Content

- Create new `.astro` components in `src/components/`
- Modify existing pages in `src/pages/`
- Update images in the `public/images/` directory
- Use Tailwind CSS classes for styling

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📧 Contact

For questions or support, please visit the contact page or reach out through the provided social media links.

---

Built with ❤️ for the developer community