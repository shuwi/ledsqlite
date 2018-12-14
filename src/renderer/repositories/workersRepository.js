export default class WorkersRepository {
    constructor(dao) {
      this.dao = dao
    }
    /**
     * 建表
     */
    createTable() {
      const sql = `
          CREATE TABLE IF NOT EXISTS worker (
              id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
              userId varchar(255) NOT NULL,
              name varchar(255) NOT NULL,
              gender varchar(1) DEFAULT NULL,
              birthday varchar(255) DEFAULT NULL,
              mobile varchar(255) NOT NULL,
              homeAddress varchar(255) DEFAULT NULL,
              workKind varchar(255) DEFAULT NULL,
              idCardType int(255) DEFAULT NULL,
              birthPlaceCode varchar(255) DEFAULT NULL,
              nation varchar(255) DEFAULT NULL,
              politicsType int(2) DEFAULT ('0'),
              unJoined varchar(1) DEFAULT ('0'),
              joinedTime date DEFAULT NULL,
              cultureLevelType varchar(255) DEFAULT NULL,
              urgentContractCellphone varchar(255) DEFAULT NULL,
              urgentContractName varchar(255) DEFAULT NULL,
              noBadMedicalHistory varchar(1) DEFAULT ('0'),
              workDate date DEFAULT NULL,
              isSue varchar(255) DEFAULT NULL,
              startTime varchar(255) DEFAULT NULL,
              endTime varchar(255) DEFAULT NULL
            )
          `
      return this.dao.run(sql)
    }
    /**
     * 插入工人数据
     * @param {*} value k-v数据对象
     */
    create(value) {
      var statlist = []
      var vallist = []
      for (var i in value) {
        statlist.push(i)
        vallist.push(value[i])
      }
      var stat =
        `INSERT INTO worker(${statlist.join(',')}) VALUES (${new Array(statlist.length).fill('?').join(',')})`
      return this.dao.run(stat,
        vallist)
    }
    /**
     * 更新工人数据
     * @param {*} value 更新的k-v数据对象
     */
    update(value) {
      var statlist = []
      var vallist = []
      for (var i in value) {
        statlist.push(i)
        vallist.push(value[i])
      }
     
      var stat =
        `UPDATE worker SET ${statlist.join(' = ?, ')} = ? WHERE userId = '${value.userId}' AND projectId = ${value.projectId}`
      return this.dao.run(stat,
        vallist)
    }
    /**
     * 根据用户身份证号查询人数，用于更新或插入验证
     * @param {*} userid 用户身份证号
     */
    getCount(userid) {
      return this.dao.get(
        `SELECT count(id) as num FROM worker WHERE userId = ?`,
        [userid])
    }
    /**
     * 根据关键词查询工人数量
     * @param {*} keyword 关键词
     */
    getWorkersCount(keyword) {
      return this.dao.get(
        `SELECT count(id) as num from worker where (userId like '${keyword}%' or mobile like '${keyword}%' or name like '${keyword}%')`)
    }
    /**
     * 根据关键词、页码等查询工人数据
     * @param {*} keyword 关键词
     * @param {*} pagenum 页码
     * @param {*} pagesize 页大小
     */
    getWorkers(keyword, pagenum, pagesize) {
      return this.dao.all(
        `SELECT * from worker where (userId like '${keyword}%' or mobile like '${keyword}%' or name like '${keyword}%') limit ?,?`,
        [ (pagenum - 1) * pagesize, pagesize])
    }
  }
  