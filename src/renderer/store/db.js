import path from 'path'
import {
  remote
} from 'electron'
const sqlite3 = require('sqlite3')
const Promise = require('bluebird')

export default class AppDAO {
  constructor(dbname) {
    var dbFilePath = path.join(remote.app.getPath('userData'), dbname)
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.log('数据库连接失败:', err)
      } else {
        
      }
    })
  }
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve({ id: this.lastID, affected: this.changes })
        }
      })
    })
  }
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('all error: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
  each(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.each(sql, params, (err, rows) => {
        if (err) {
          console.log('each error: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
}

