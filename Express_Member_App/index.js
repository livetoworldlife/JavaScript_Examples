const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger'); // import our file
const members = require('./Members');

const app = express();

// Init middleware - just we want to se how it can use
// app.use(logger);

// Handlebars Middleware-to use handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route-handelbars
app.get('/', (req, res) =>
  //res.sendFile(path.join(__dirname, 'public', 'index.html')); we dont need because of expresss Set static folder we use for that
  res.render('index', {
    title: 'Member App',
    members
  })
);

// Set static folder we can use all file in public folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
