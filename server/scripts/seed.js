const { writeData, readData } = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

function seed() {
  const categories = [
    'Construction Worker',
    'Electrician',
    'Plumber',
    'Mason',
    'Painter',
    'Carpenter',
    'Welder',
    'Tile Setter',
    'Roofing',
  ];

  const areas = ['North', 'South', 'East', 'West', 'Downtown'];

  const firstNames = ['Ravi', 'Suresh', 'Anil', 'Vijay', 'Rahul', 'Kiran', 'Mahesh', 'Amit', 'Deepak', 'Sanjay'];
  const lastNames = ['Kumar', 'Reddy', 'Sharma', 'Patel', 'Singh', 'Yadav', 'Gowda', 'Naidu'];

  function randomName() {
    const f = firstNames[Math.floor(Math.random() * firstNames.length)];
    const l = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${f} ${l}`;
  }

  function randomPhone() {
    const base = Math.floor(6000000000 + Math.random() * 3999999999);
    return String(base);
  }

  const workers = [];
  for (let i = 0; i < 36; i++) {
    const name = randomName();
    const phone = randomPhone();
    const category = categories[i % categories.length];
    const area = areas[i % areas.length];
    const expectedSalary = 500 + (i % 10) * 50; // per day
    workers.push({ id: uuidv4(), name, phone, category, area, expectedSalary, createdAt: new Date().toISOString() });
  }

  writeData('categories.json', categories);
  writeData('workers.json', workers);

  // initialize users.json if missing
  const existingUsers = readData('users.json', null);
  if (!existingUsers) {
    writeData('users.json', []);
  }

  console.log('Seed complete:', { categories: categories.length, workers: workers.length });
}

seed();
