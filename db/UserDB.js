const bcrypt = require('bcrypt');

const saltRound = 2048;

class UserDB {
  constructor(dao) {
    this.dao = dao;
    this.dao.run(`
      CREATE TABLE IF NOT EXISTS USER(
        id VARCHAR(128),
        pw_hash BINARY(60)
      )
    `);
  }

  login(id, pw) {
    return new Promise((resolve, reject) => {
      this.dao.get('SELECT pw_hash from USER where id = ?', [id]).then((idRow) => {
        if (!idRow) {
          resolve({ res: false, err: 'i18n:NO_SUCH_ID' });
        } else {
          bcrypt.compare(pw, idRow.pw_hash, (err, result) => {
            if (err) {
              reject(err);
            } else if (result) {
              resolve({ res: true, err: null });
            } else {
              resolve({ res: false, err: 'i18n:WRONG_PASSWORD' });
            }
          });
        }
      });
    });
  }

  register(id, pw) {
    return new Promise((resolve, reject) => {
      this.dao.get('SELECT * from USER where id = ?', [id]).then((existID) => {
        if (existID) {
          resolve({ res: false, err: 'i18n:ID_EXISTS' });
        } else {
          bcrypt.hash(pw, saltRound, (err, hash) => {
            if (err) {
              reject(err);
            } else {
              this.dao.run(`
              INSERT INTO USER (id, pw_hash)
              VALUES (?, ?)
              `, [id, hash]).then(resolve({ res: true, err: null }));
            }
          });
        }
      });
    });
  }
}

module.exports = UserDB;
