const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

// Define sequelize connection
const { POSTGRES_DATABASE, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT } = process.env;

const sequelize = new Sequelize(
  `postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}`,
  {
    logging: false,
  }
);

const db = {};

// Import models
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') > 0 && file !== 'index.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = { sequelize, Sequelize, ...db };
