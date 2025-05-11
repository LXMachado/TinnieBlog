const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

// Map file extensions to MIME types
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

// Create the server
const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Handle the root path
  let filePath = req.url === '/' 
    ? path.join(__dirname, 'public', 'index.html')
    : path.join(__dirname, 'public', req.url);
  
  // Get the file extension
  const extname = path.extname(filePath);
  let contentType = MIME_TYPES[extname] || 'text/plain';
  
  // Read the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // If the file doesn't exist, serve the index.html file
      if (err.code === 'ENOENT') {
        console.log(`File not found: ${filePath}`);
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('Server Error: Could not find index.html');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
        return;
      }
      
      // Server error
      res.writeHead(500);
      res.end(`Server Error: ${err.code}`);
      return;
    }
    
    // Success - serve the file
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
  });
});

// Start the server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});