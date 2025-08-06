const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Initialize database tables
async function initializeDatabase() {
  try {
    // Create blog_posts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        author VARCHAR(255) DEFAULT 'TinnieDev Team',
        category VARCHAR(100) DEFAULT 'Technology',
        tags TEXT[],
        image_url VARCHAR(500),
        published BOOLEAN DEFAULT true,
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create tutorials table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tutorials (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        content TEXT NOT NULL,
        difficulty VARCHAR(50) DEFAULT 'Beginner',
        technology VARCHAR(100),
        duration_minutes INTEGER,
        prerequisites TEXT[],
        author VARCHAR(255) DEFAULT 'TinnieDev Team',
        image_url VARCHAR(500),
        published BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create newsletter_subscribers table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        active BOOLEAN DEFAULT true
      )
    `);

    // Create contact_messages table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Insert sample data
async function insertSampleData() {
  try {
    // Check if data already exists
    const existingPosts = await pool.query('SELECT COUNT(*) FROM blog_posts');
    if (parseInt(existingPosts.rows[0].count) > 0) {
      console.log('Sample data already exists');
      return;
    }

    // Insert sample blog posts
    const blogPosts = [
      {
        title: 'The Future of AI in Web Development',
        slug: 'future-ai-web-development',
        excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build and interact with web applications.',
        content: 'Artificial intelligence is transforming every aspect of web development, from automated code generation to intelligent user experiences...',
        category: 'AI',
        tags: ['AI', 'Web Development', 'Future Tech'],
        featured: true
      },
      {
        title: 'Building Responsive Layouts with CSS Grid',
        slug: 'responsive-layouts-css-grid',
        excerpt: 'Master the art of creating flexible, responsive layouts using CSS Grid and modern layout techniques.',
        content: 'CSS Grid has revolutionized how we approach layout design on the web. In this comprehensive guide...',
        category: 'CSS',
        tags: ['CSS', 'Layout', 'Responsive Design']
      },
      {
        title: 'JavaScript Performance Optimization Tips',
        slug: 'javascript-performance-optimization',
        excerpt: 'Essential techniques and best practices for optimizing JavaScript performance in modern web applications.',
        content: 'Performance is crucial for user experience. Here are the most effective ways to optimize your JavaScript...',
        category: 'JavaScript',
        tags: ['JavaScript', 'Performance', 'Optimization']
      }
    ];

    for (const post of blogPosts) {
      await pool.query(`
        INSERT INTO blog_posts (title, slug, excerpt, content, category, tags, featured)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [post.title, post.slug, post.excerpt, post.content, post.category, post.tags, post.featured]);
    }

    // Insert sample tutorials
    const tutorials = [
      {
        title: 'Getting Started with React Hooks',
        slug: 'getting-started-react-hooks',
        description: 'Learn the fundamentals of React Hooks and how to use them effectively in your applications.',
        content: 'React Hooks have changed how we write React components. In this tutorial...',
        difficulty: 'Beginner',
        technology: 'React',
        duration_minutes: 45,
        prerequisites: ['Basic JavaScript', 'HTML/CSS']
      },
      {
        title: 'Advanced Node.js Patterns',
        slug: 'advanced-nodejs-patterns',
        description: 'Explore advanced patterns and techniques for building scalable Node.js applications.',
        content: 'Building scalable Node.js applications requires understanding advanced patterns...',
        difficulty: 'Advanced',
        technology: 'Node.js',
        duration_minutes: 90,
        prerequisites: ['JavaScript ES6+', 'Node.js Basics', 'Express.js']
      },
      {
        title: 'CSS Animation Fundamentals',
        slug: 'css-animation-fundamentals',
        description: 'Master CSS animations and transitions to create engaging user interfaces.',
        content: 'Animations bring life to web interfaces. Learn how to create smooth, performant animations...',
        difficulty: 'Intermediate',
        technology: 'CSS',
        duration_minutes: 60,
        prerequisites: ['CSS Basics', 'HTML']
      }
    ];

    for (const tutorial of tutorials) {
      await pool.query(`
        INSERT INTO tutorials (title, slug, description, content, difficulty, technology, duration_minutes, prerequisites)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [tutorial.title, tutorial.slug, tutorial.description, tutorial.content, tutorial.difficulty, tutorial.technology, tutorial.duration_minutes, tutorial.prerequisites]);
    }

    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
}

// Database query functions
const db = {
  // Blog functions
  async getAllPosts() {
    const result = await pool.query('SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC');
    return result.rows;
  },

  async getFeaturedPosts() {
    const result = await pool.query('SELECT * FROM blog_posts WHERE published = true AND featured = true ORDER BY created_at DESC LIMIT 3');
    return result.rows;
  },

  async getPostBySlug(slug) {
    const result = await pool.query('SELECT * FROM blog_posts WHERE slug = $1 AND published = true', [slug]);
    return result.rows[0];
  },

  // Tutorial functions
  async getAllTutorials() {
    const result = await pool.query('SELECT * FROM tutorials WHERE published = true ORDER BY created_at DESC');
    return result.rows;
  },

  async getTutorialsByDifficulty(difficulty) {
    const result = await pool.query('SELECT * FROM tutorials WHERE difficulty = $1 AND published = true ORDER BY created_at DESC', [difficulty]);
    return result.rows;
  },

  async getTutorialBySlug(slug) {
    const result = await pool.query('SELECT * FROM tutorials WHERE slug = $1 AND published = true', [slug]);
    return result.rows[0];
  },

  // Newsletter functions
  async subscribeToNewsletter(email, name = null) {
    try {
      const result = await pool.query(
        'INSERT INTO newsletter_subscribers (email, name) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET active = true RETURNING *',
        [email, name]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Contact functions
  async saveContactMessage(name, email, subject, message) {
    try {
      const result = await pool.query(
        'INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, subject, message]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = { pool, initializeDatabase, insertSampleData, db };