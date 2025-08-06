const express = require('express');
const path = require('path');
const { initializeDatabase, insertSampleData, db } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database on startup
(async () => {
  await initializeDatabase();
  await insertSampleData();
})();

// API Routes

// Blog API endpoints
app.get('/api/blog/posts', async (req, res) => {
  try {
    const posts = await db.getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/blog/featured', async (req, res) => {
  try {
    const posts = await db.getFeaturedPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/blog/posts/:slug', async (req, res) => {
  try {
    const post = await db.getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Tutorial API endpoints
app.get('/api/tutorials', async (req, res) => {
  try {
    const { difficulty } = req.query;
    let tutorials;
    
    if (difficulty) {
      tutorials = await db.getTutorialsByDifficulty(difficulty);
    } else {
      tutorials = await db.getAllTutorials();
    }
    
    res.json(tutorials);
  } catch (error) {
    console.error('Error fetching tutorials:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/tutorials/:slug', async (req, res) => {
  try {
    const tutorial = await db.getTutorialBySlug(req.params.slug);
    if (!tutorial) {
      return res.status(404).json({ error: 'Tutorial not found' });
    }
    res.json(tutorial);
  } catch (error) {
    console.error('Error fetching tutorial:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Newsletter subscription endpoint
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    const subscriber = await db.subscribeToNewsletter(email, name);
    res.json({ message: 'Successfully subscribed to newsletter', subscriber });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    if (error.code === '23505') { // Unique constraint violation
      res.status(409).json({ error: 'Email already subscribed' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    
    const contactMessage = await db.saveContactMessage(name, email, subject, message);
    res.json({ message: 'Message sent successfully', contactMessage });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Static file routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/blog.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

app.get('/tutorials.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'tutorials.html'));
});

app.get('/about.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});