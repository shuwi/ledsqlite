<template>
  <div class="wrapper">
    <main>
      <div class="left-side">
        <system-information></system-information>
        <Button shape="circle" @click="test" icon="ios-cube">LEVELDB</Button>
        <Button shape="circle" @click="http" icon="ios-flash-outline">HTTP</Button>
        <Button shape="circle" @click="sqlite" icon="ios-flash-outline">SQLITE</Button>
      </div>
    </main>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
    components: {
      SystemInformation
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link)
      },
      test() {
        var that = this
        that.$leveldb.put('name', new Date(), function (err) {
          if (err) return that.$Notice.error({
            title: '写入错误',
            desc: err
          })
        })

        that.$leveldb.get('name', function (err, value) {
          if (err) return that.$Notice.error({
            title: '读取错误',
            desc: err
          })
          that.$Notice.success({
            title: '结果',
            desc: value
          })

        })
      },
      http() {

        this.$http({
            url: '/v3/weather/weatherInfo',
            baseURL: 'https://restapi.amap.com/',
            method: 'get',
            params: {
              key: '0a73c5c6be50f0a6dcebcaf3f7eaa2e0',
              extensions: 'all',
              city: '320600'
            },
          })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      sqlite() {
        var db = this.$leveldb
        db.serialize(function () {
          db.run("CREATE TABLE if not exists lorem (info TEXT)");
          db.run(
            "CREATE TABLE IF NOT EXISTS `worker` (\
              `userId` varchar(255) NOT NULL,\
              `name` varchar(255) NOT NULL,\
              `mobile` varchar(255) NOT NULL,\
              `job` varchar(255) DEFAULT NULL,\
              `groupname` varchar(255) DEFAULT NULL,\
              `addtime` varchar(255) DEFAULT NULL,\
              `checkinState` int(2) NOT NULL DEFAULT 0,\
              `checkinTime` datetime DEFAULT NULL,\
              `photo` longtext NOT NULL,\
              `projectId` int(11) NOT NULL,\
              `workDate` date DEFAULT NULL,\
              `urgentContractCellphone` varchar(255) DEFAULT NULL,\
              `urgentContractName` varchar(255) DEFAULT NULL,\
              `noBadMedicalHistory` varchar(1) DEFAULT 0,\
              `cultureLevelType` varchar(255) DEFAULT NULL,\
              `joinedTime` date DEFAULT NULL,\
              `unJoined` varchar(1) DEFAULT 0,\
              `politicsType` varchar(255) DEFAULT NULL,\
              `birthPlaceCode` varchar(255) DEFAULT NULL,\
              `nation` varchar(255) DEFAULT NULL,\
              `idCardType` int(255) DEFAULT NULL,\
              `classNo` varchar(255) DEFAULT NULL,\
              `personType` varchar(255) DEFAULT NULL,\
              `homeAddress` varchar(255) DEFAULT NULL,\
              `workKind` int(6) DEFAULT NULL,\
              `birthday` varchar(255) DEFAULT NULL,\
              `gender` varchar(1) DEFAULT NULL ,\
              `ptype` varchar(1) DEFAULT NULL,\
              `currentAddresss` varchar(255) DEFAULT NULL,\
              `workAccommodationType` varchar(1) DEFAULT 0,\
              `workKindType` varchar(1) DEFAULT '1',\
              `beginnew` varchar(255) DEFAULT NULL,\
              `endnew` varchar(255) DEFAULT NULL,\
              `uploaded` int(2) DEFAULT 0\
            )"
          )

          var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
          for (var i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i + (new Date()).toLocaleDateString());
          }
          stmt.finalize();

          db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
            console.log(row.id + ": " + row.info);
          });
        });

        //db.close();
      }
    },
    dataDeal(objects) {
      for (var i = 0; i < objects.length; ++i) {
        console.log(objects[i]);
      }
    }
  }
</script>

<style>

</style>