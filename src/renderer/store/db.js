import path from 'path'
import {
    remote
} from 'electron'
var levelup = require('levelup')
var leveldown = require('leveldown')

var leveldb = levelup(leveldown(path.join(__static, '/mydb')))
export default leveldb