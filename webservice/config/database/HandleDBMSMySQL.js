const fs = require('fs');
const mysql = require('mysql');

class HandleDBMSMySQL {
  constructor(host = null, database = null, user = null, password = null) {
    var envFile = JSON.parse(fs.readFileSync('./config/server/env.json', 'utf8', 'r'));

    if (envFile) {
      this._host = (typeof host !== 'string' || host === null) ? env.File.host : host;
      this._database = (typeof database !== 'string' || database === null) ? env.File.database : database;
      this._user = (typeof user !== 'string' || user === null) ? env.File.user : user;
      this.password = (typeof password !== 'string' || password === null) ? env.File.password : password;
      this.connect();
    }
  }
  
    connect() {
      this.connection = mysql.createConnection({
        host: this._host,
        database: this._database,
        user: this._user,
        password: this.password,
      });
    }

    query(sql, args){
      return new Promise((resolve, reject) => {
        this.connect.query(sql, args, (err, results, fields) => {
          if(err){
            reject(err);
          }else{
            var resultsJSON = {'metadata':{},'data':{}};
            resultsJSON.metadata = fields.map((r) => Object.assign({}, r));
            resultsJSON.data = results.map((r) => Object.assign({}, r));
            resolve(resultsJSON);
          }
        });
      });
    }
    close() {
      return new Promise((resolve, reject) => {
        this.connection.end(err =>{
          if(err){
            reject(err);
          }else{
            resolve();
          }
        });
      });
    }

  }
  module.exports = HandleDBMSMySQL;