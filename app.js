const express = require('express');
const app = express();
const fs = require('fs');
const compression = require('compression');

// Load JSON data
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
const quiz = JSON.parse(fs.readFileSync('./quiz.json', 'utf8'));
const technology = JSON.parse(fs.readFileSync('./technology.json', 'utf8'));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Enable gzip compression for all responses
app.use(compression());

// Serve static files with caching headers
app.use(express.static('public', {
  maxAge: '7d',           // Cache static files for 7 days
  etag: false             // Disable ETag comparison (trust maxAge)
}));

// Cache-Control middleware for different content types
app.use((req, res, next) => {
  // Cache HTML pages for 1 hour
  if (req.url.endsWith('.html') || req.path === '/') {
    res.set('Cache-Control', 'public, max-age=3600');
  }
  
  // Cache JSON responses for 30 minutes (API data)
  if (req.url.endsWith('.json')) {
    res.set('Cache-Control', 'public, max-age=1800');
  }
  
  // Cache images for 30 days
  if (req.url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
    res.set('Cache-Control', 'public, max-age=2592000, immutable');
  }
  
  // Cache CSS/JS for 7 days
  if (req.url.match(/\.(css|js)$/i)) {
    res.set('Cache-Control', 'public, max-age=604800, immutable');
  }
  
  next();
});

// Middleware to get language from query and set current path
app.use((req, res, next) => {
  const lang = req.query.lang || 'en';
  res.locals.lang = lang;
  res.locals.currentPath = req.path;
  
  // Set cache headers for HTML responses
  res.set('Cache-Control', 'public, max-age=3600');
  
  next();
});

// Routes
app.get('/', (req, res) => {
  res.render('index', { data });
});

app.get('/battles', (req, res) => {
  res.render('battles', { battles: data.battles });
});

app.get('/weapons', (req, res) => {
  res.render('weapons', { weapons: data.weapons });
});

app.get('/battle/:id', (req, res) => {
  const battle = data.battles.find(b => b.id === req.params.id);
  if (battle) {
    res.render('battle', { battle });
  } else {
    res.status(404).send('Battle not found');
  }
});

app.get('/weapon/:id', (req, res) => {
  const weapon = data.weapons.find(w => w.id === req.params.id);
  if (weapon) {
    res.render('weapon', { weapon });
  } else {
    res.status(404).send('Weapon not found');
  }
});

app.get('/quiz', (req, res) => {
  res.render('quiz', { quiz });
});

app.get('/technology', (req, res) => {
  res.render('technology', { technology });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
