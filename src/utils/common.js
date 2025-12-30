// src/utils/common.js

// Capitalize first letter
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Check if value is empty
function isEmpty(value) {
  return value === undefined || value === null || value === '';
}

// Format a date to locale string
function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

// Convert string to lowercase
function toLowerCase(str) {
  return str ? str.toLowerCase() : '';
}

// Convert string to uppercase
function toUpperCase(str) {
  return str ? str.toUpperCase() : '';
}

// Generate a random number in range
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Delay/promise helper
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Check if array is empty
function isArrayEmpty(arr) {
  return !Array.isArray(arr) || arr.length === 0;
}

// Merge objects
function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

// Clone an object
function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Export all functions
module.exports = {
  capitalize,
  isEmpty,
  formatDate,
  toLowerCase,
  toUpperCase,
  randomNumber,
  sleep,
  isArrayEmpty,
  mergeObjects,
  cloneObject
};
