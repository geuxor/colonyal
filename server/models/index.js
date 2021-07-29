'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const db = {};
require('dotenv').config()
// const Pool = require('pg').Pool
// const mongoose = reqduire('mongoose');
// const DB_PORT = process.env.DB_PORT || 27017;
// const DB_NAME = process.env.DB_NAME || 'authenticate';

// Connect to database
console.log('connecting to database')
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
// console.log('🧹 trying to connect to DB');
const files = fs.readdirSync(__dirname);
// console.log('................', files);

for (let file of files) {
  if (file !== 'index.js') {
    console.log('xxxxxx', file);
    
    const modelCreation = require(path.join(__dirname, file)) 
    //`./${file}`)  //path.join(__dirname, file))(sequelize, sequelize.DataTypes);
    console.log('modelCreation', modelCreation);
    const model = modelCreation(sequelize, DataTypes)
    db[model.name] = model;   //db.User
  }
}
console.log(db)

// for (const model in db) {
//   if (db[model].associate) db[model].associate(db);
// }

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
