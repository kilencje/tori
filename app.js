const express = require('express');
const app = express();
const fs = require('fs');

// Load JSON data
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
const quiz = JSON.parse(fs.readFileSync('./quiz.json', 'utf8'));
const technology = JSON.parse(fs.readFileSync('./technology.json', 'utf8'));

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static files
app.use(express.static('public'));

// Middleware to get language from query and set current path
app.use((req, res, next) => {
  const lang = req.query.lang || 'en';
  res.locals.lang = lang;
  res.locals.currentPath = req.path;
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
