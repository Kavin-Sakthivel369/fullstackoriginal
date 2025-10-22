const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

function ensureDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function getFilePath(fileName) {
  ensureDir();
  return path.join(dataDir, fileName);
}

function readData(fileName, defaultValue) {
  try {
    const filePath = getFilePath(fileName);
    if (!fs.existsSync(filePath)) return defaultValue;
    const content = fs.readFileSync(filePath, 'utf-8');
    if (!content) return defaultValue;
    return JSON.parse(content);
  } catch (err) {
    console.error('Failed to read data file', fileName, err.message);
    return defaultValue;
  }
}

function writeData(fileName, data) {
  try {
    const filePath = getFilePath(fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to write data file', fileName, err.message);
    return false;
  }
}

module.exports = { readData, writeData, getFilePath };
