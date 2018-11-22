var sqlite3 = require('sqlite3').verbose()
import path from 'path'
import { remote } from 'electron'

var DB = new sqlite3.Database(path.join(remote.app.getPath('userData'), 'mysqlite.db'))

export default DB