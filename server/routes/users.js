const express = require('express');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { readData, writeData } = require('../utils/db');

const router = express.Router();

router.post('/register', (req, res) => {
  const { role, name, phone, location, expectedSalary, category, username, password } = req.body || {};

  if (!role || !['owner', 'worker', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid or missing role' });
  }
  if (!name || !phone || !username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const users = readData('users.json', []);
  if (users.some((u) => u.username === username)) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  const passwordHash = bcrypt.hashSync(password, 8);
  const newUser = {
    id: uuidv4(),
    role,
    name,
    phone,
    location: location || '',
    username,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeData('users.json', users);

  if (role === 'worker') {
    const workers = readData('workers.json', []);
    const workerRecord = {
      id: newUser.id,
      name,
      phone,
      category: category || 'Construction Worker',
      area: location || 'Unknown',
      expectedSalary: typeof expectedSalary === 'number' ? expectedSalary : Number(expectedSalary) || 0,
      createdAt: newUser.createdAt,
    };
    workers.push(workerRecord);
    writeData('workers.json', workers);
  }

  const { passwordHash: _ignored, ...safe } = newUser;
  return res.status(201).json({ user: safe });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  const users = readData('users.json', []);
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const ok = bcrypt.compareSync(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = uuidv4();
  const sessions = req.app.locals.sessions;
  sessions.set(token, { id: user.id, role: user.role, name: user.name, username: user.username });

  return res.json({
    token,
    user: { id: user.id, role: user.role, name: user.name, username: user.username, phone: user.phone, location: user.location },
  });
});

router.get('/me', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'No token' });

  const sessions = req.app.locals.sessions;
  const sess = sessions.get(token);
  if (!sess) return res.status(401).json({ error: 'Invalid token' });

  const users = readData('users.json', []);
  const user = users.find((u) => u.id === sess.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  return res.json({ user: { id: user.id, role: user.role, name: user.name, username: user.username, phone: user.phone, location: user.location } });
});

module.exports = router;
