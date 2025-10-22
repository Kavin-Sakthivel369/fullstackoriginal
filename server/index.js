const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// very simple in-memory sessions map for demo purposes
app.locals.sessions = new Map();

const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const workersRouter = require('./routes/workers');

app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/workers', workersRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
