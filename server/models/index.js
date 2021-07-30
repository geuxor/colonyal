'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const db = {};
require('dotenv').config()
// const Pool = require('pg').Pool


console.log('dbconx:                       🧹 connecting to database')
const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect: 'postgres',
    logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // operatorsAliases: false // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
});
const files = fs.readdirSync(__dirname);
// console.log('................', files);

for (let file of files) {
  if (file !== 'index.js') {
    console.log('Model file:', file);
    const modelCreation = require(path.join(__dirname, file)) 
    const model = modelCreation(sequelize, DataTypes)
    db[model.name] = model;
  }
}
// console.log('db-index:', db)

for (const model in db) {
  if (db[model].associate) db[model].associate(db);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// const pool = new Pool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT
// })

// module.exports = sequelize;
