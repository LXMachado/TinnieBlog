# TinnieDev - AI & Web Development Hub

A modern, futuristic blog and landing site built for showcasing cutting-edge web development content and AI insights. Features a sleek glassmorphic design with full dark/light mode support.

## 🚀 Features

- **Modern Design**: Glassmorphic UI effects with subtle animations
- **Dark/Light Mode**: Seamless theme switching with persistent preferences
- **Responsive Layout**: Optimized for all device sizes
- **Custom Branding**: Professional logo design with theme-aware variants
- **Fast Performance**: Lightweight static site with optimized assets

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js (simple static file server)
- **Styling**: Custom CSS with CSS Variables
- **Typography**: Google Fonts (Poppins + Orbitron)
- **Icons**: Custom SVG logo with theme variants

## 📁 Project Structure

```
├── public/
│   ├── images/
│   │   ├── t-dev-dark.svg    # Dark theme logo
│   │   └── t-dev-light.svg   # Light theme logo
│   ├── index.html            # Homepage
│   ├── blog.html             # Blog listing page
│   ├── tutorials.html        # Tutorials page
│   ├── about.html            # About page
│   ├── contact.html          # Contact page
│   ├── styles.css            # Main stylesheet
│   ├── script.js             # Theme switching logic
│   └── favicon.svg           # Site favicon
├── server.js                 # Node.js server
└── package.json              # Dependencies
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
git clone <repository-url>
cd tinnie-dev
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
# or
node server.js
```

4. Open your browser and navigate to:
```
http://localhost:5000
```

## 📄 Pages

### Homepage (`/`)
- Hero section with call-to-action
- Featured content cards
- Technology showcase
- Newsletter signup

### Blog (`/blog.html`)
- Article listings with categories
- Search and filter functionality
- Featured posts section
- Pagination layout

### Tutorials (`/tutorials.html`)
- Tutorial cards with difficulty levels
- Technology filters
- Step-by-step guides
- Code examples

### About (`/about.html`)
- Mission and vision
- Team member profiles
- Company values
- Technology expertise

### Contact (`/contact.html`)
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
1. Create new HTML file in `public/` directory
2. Follow the existing template structure
3. Update navigation links in all pages
4. Add corresponding styles if needed

### Modifying Colors
Update CSS variables in `styles.css`:
```css
:root {
  --color-primary: #007afe;
  --color-primary-light: #00C2FF;
  /* Add your colors here */
}
```

### Adding Content
- Edit HTML files directly for static content
- Modify the cards and sections as needed
- Update images in the `public/images/` directory

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