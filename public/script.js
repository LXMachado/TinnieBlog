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
});