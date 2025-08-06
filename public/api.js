// API client for TinnieDev
class API {
  constructor() {
    this.baseURL = '';
  }

  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Blog methods
  async getBlogPosts() {
    return this.request('/api/blog/posts');
  }

  async getFeaturedPosts() {
    return this.request('/api/blog/featured');
  }

  async getBlogPost(slug) {
    return this.request(`/api/blog/posts/${slug}`);
  }

  // Tutorial methods
  async getTutorials(difficulty = null) {
    const params = difficulty ? `?difficulty=${encodeURIComponent(difficulty)}` : '';
    return this.request(`/api/tutorials${params}`);
  }

  async getTutorial(slug) {
    return this.request(`/api/tutorials/${slug}`);
  }

  // Newsletter subscription
  async subscribeToNewsletter(email, name = null) {
    return this.request('/api/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, name }),
    });
  }

  // Contact form
  async submitContactForm(data) {
    return this.request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// Utility functions for rendering content
class ContentRenderer {
  static formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  static truncateText(text, maxLength = 150) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).replace(/\s+\S*$/, '') + '...';
  }

  static renderBlogCard(post) {
    const formattedDate = this.formatDate(post.created_at);
    const truncatedExcerpt = this.truncateText(post.excerpt || post.content, 120);
    
    return `
      <div class="card blog-card" data-slug="${post.slug}">
        <div class="card-content">
          <div class="blog-meta">
            <span class="category">${post.category}</span>
            <span class="date">${formattedDate}</span>
          </div>
          <h3>${post.title}</h3>
          <p>${truncatedExcerpt}</p>
          <div class="blog-tags">
            ${post.tags ? post.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
          </div>
          <a href="#" class="read-more" data-slug="${post.slug}">Read More →</a>
        </div>
      </div>
    `;
  }

  static renderTutorialCard(tutorial) {
    const formattedDate = this.formatDate(tutorial.created_at);
    const truncatedDescription = this.truncateText(tutorial.description || tutorial.content, 120);
    const difficultyClass = tutorial.difficulty.toLowerCase();
    
    return `
      <div class="card tutorial-card ${difficultyClass}" data-slug="${tutorial.slug}">
        <div class="card-content">
          <div class="tutorial-meta">
            <span class="difficulty ${difficultyClass}">${tutorial.difficulty}</span>
            <span class="technology">${tutorial.technology}</span>
            ${tutorial.duration_minutes ? `<span class="duration">${tutorial.duration_minutes} min</span>` : ''}
          </div>
          <h3>${tutorial.title}</h3>
          <p>${truncatedDescription}</p>
          <div class="tutorial-footer">
            <span class="date">${formattedDate}</span>
            <a href="#" class="start-tutorial" data-slug="${tutorial.slug}">Start Tutorial →</a>
          </div>
        </div>
      </div>
    `;
  }

  static renderFeaturedPost(post) {
    const formattedDate = this.formatDate(post.created_at);
    const truncatedExcerpt = this.truncateText(post.excerpt || post.content, 150);
    
    return `
      <div class="featured-post card" data-slug="${post.slug}">
        <div class="card-content">
          <div class="featured-badge">Featured</div>
          <div class="blog-meta">
            <span class="category">${post.category}</span>
            <span class="date">${formattedDate}</span>
          </div>
          <h3>${post.title}</h3>
          <p>${truncatedExcerpt}</p>
          <a href="#" class="read-more" data-slug="${post.slug}">Read More →</a>
        </div>
      </div>
    `;
  }
}

// Form handlers
class FormHandlers {
  static async handleNewsletterForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    try {
      submitButton.textContent = 'Subscribing...';
      submitButton.disabled = true;
      
      await api.subscribeToNewsletter(email);
      
      // Show success message
      submitButton.textContent = 'Subscribed!';
      submitButton.style.backgroundColor = 'var(--color-success, #22c55e)';
      form.reset();
      
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.backgroundColor = '';
      }, 3000);
      
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      submitButton.textContent = 'Try Again';
      submitButton.style.backgroundColor = 'var(--color-error, #ef4444)';
      
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.backgroundColor = '';
      }, 3000);
    }
  }

  static async handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    try {
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      await api.submitContactForm(data);
      
      // Show success message
      submitButton.textContent = 'Message Sent!';
      submitButton.style.backgroundColor = 'var(--color-success, #22c55e)';
      form.reset();
      
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.backgroundColor = '';
      }, 3000);
      
    } catch (error) {
      console.error('Contact form submission failed:', error);
      submitButton.textContent = 'Try Again';
      submitButton.style.backgroundColor = 'var(--color-error, #ef4444)';
      
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.backgroundColor = '';
      }, 3000);
    }
  }
}

// Initialize API instance
const api = new API();

// Export for global use
window.API = API;
window.api = api;
window.ContentRenderer = ContentRenderer;
window.FormHandlers = FormHandlers;