const DBAccessObject = require('./DBAccessObject.js');

const dbAccessObject = new DBAccessObject(process.env.DB_FILE);

const UserDB = require('./UserDB.js');

module.exports = {
  userDB: new UserDB(dbAccessObject),
};
