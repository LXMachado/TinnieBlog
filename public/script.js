document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check for saved theme preference or use user's system preference
  const savedTheme = localStorage.getItem('theme');
  const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // If the user has explicitly chosen a theme or has a system preference for dark
  if (savedTheme === 'dark' || (!savedTheme && userPrefersDark)) {
    document.body.classList.add('dark-mode');
  }
  
  // Toggle dark mode on button click
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

  // Load dynamic content based on current page
  const currentPath = window.location.pathname;
  
  if (currentPath === '/' || currentPath === '/index.html') {
    loadFeaturedContent();
  } else if (currentPath.includes('blog.html')) {
    loadBlogContent();
  } else if (currentPath.includes('tutorials.html')) {
    loadTutorialContent();
  }

  // Setup form handlers
  setupFormHandlers();
});

// Load featured content for homepage
async function loadFeaturedContent() {
  const grid = document.getElementById('featured-content-grid');
  if (!grid) return;

  try {
    const featuredPosts = await api.getFeaturedPosts();
    if (featuredPosts.length === 0) {
      grid.innerHTML = '<p>No featured content available at the moment.</p>';
      return;
    }

    grid.innerHTML = featuredPosts.map(post => ContentRenderer.renderFeaturedPost(post)).join('');
    
  } catch (error) {
    console.error('Failed to load featured content:', error);
    grid.innerHTML = '<p>Unable to load featured content. Please try again later.</p>';
  }
}

// Load blog content for blog page
async function loadBlogContent() {
  const grid = document.querySelector('.blog-posts .card-grid');
  if (!grid) return;

  try {
    const posts = await api.getBlogPosts();
    if (posts.length === 0) {
      grid.innerHTML = '<p>No blog posts available at the moment.</p>';
      return;
    }

    grid.innerHTML = posts.map(post => ContentRenderer.renderBlogCard(post)).join('');
    
  } catch (error) {
    console.error('Failed to load blog content:', error);
    grid.innerHTML = '<p>Unable to load blog posts. Please try again later.</p>';
  }
}

// Load tutorial content for tutorials page
async function loadTutorialContent() {
  const grid = document.querySelector('.tutorials-grid .card-grid');
  if (!grid) return;

  try {
    const tutorials = await api.getTutorials();
    if (tutorials.length === 0) {
      grid.innerHTML = '<p>No tutorials available at the moment.</p>';
      return;
    }

    grid.innerHTML = tutorials.map(tutorial => ContentRenderer.renderTutorialCard(tutorial)).join('');
    setupDifficultyFilters();

  } catch (error) {
    console.error('Failed to load tutorial content:', error);
    grid.innerHTML = '<p>Unable to load tutorials. Please try again later.</p>';
  }
}

// Setup difficulty filters for tutorials
function setupDifficultyFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const difficulty = button.dataset.difficulty;
      const grid = document.querySelector('.tutorials-grid .card-grid');
      
      try {
        grid.innerHTML = '<div class="loading-placeholder">Loading tutorials...</div>';
        
        const tutorials = difficulty === 'all' 
          ? await api.getTutorials() 
          : await api.getTutorials(difficulty);
        
        if (tutorials.length === 0) {
          grid.innerHTML = `<p>No ${difficulty === 'all' ? '' : difficulty.toLowerCase()} tutorials available.</p>`;
          return;
        }

        grid.innerHTML = tutorials.map(tutorial => ContentRenderer.renderTutorialCard(tutorial)).join('');
        
      } catch (error) {
        console.error('Failed to filter tutorials:', error);
        grid.innerHTML = '<p>Unable to load tutorials. Please try again later.</p>';
      }
    });
  });
}

// Setup form handlers
function setupFormHandlers() {
  // Newsletter form handler
  const newsletterForms = document.querySelectorAll('form[action*="newsletter"], .newsletter-form, form:has(input[type="email"][placeholder*="email" i])');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', FormHandlers.handleNewsletterForm);
  });

  // Contact form handler
  const contactForms = document.querySelectorAll('form[action*="contact"], .contact-form, form:has(textarea)');
  contactForms.forEach(form => {
    form.addEventListener('submit', FormHandlers.handleContactForm);
  });
}