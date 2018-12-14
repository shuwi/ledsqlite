<template>
  <div class="wrapper">
    <main>
      <div class="left-side">
        <worker @reloadPage="userlistChange(1)"></worker>
        <div class="opttop">
          <Button shape="circle" icon="md-add" class="btn" type="primary" @click="showUserModal" v-if="canAddUser">添加人员</Button>
          <Input placeholder="请输入姓名或身份证号、手机号后查询" style="width:300px;margin:0 10px 0 0;" clearable v-model="keyword" />
          <Button shape="circle" icon="md-search" class="btn" @click="search">查询</Button>
        </div>
        <div class="optcontent">
          <Table border size="small" ref="selection" :columns="workerscol" :data="workersdata"></Table>
        </div>
        <div class="optbt">
          <Page :current="current" :total="total" show-total style="float:right;" @on-change="userlistChange"
            :page-size="pagesize" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import Worker from './LandingPage/Worker'

  export default {
    name: 'landing-page',
    components: {
      Worker
    },
    data() {
      return {
        canAddUser: true,
        current: 1,
        total: 0,
        pagesize: 10,
        keyword: '',
        workerscol: [{
            title: '姓名',
            key: 'name',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'md-person'
                  }
                }),
                h('strong', params.row.name)
              ]);
            }
          },
          {
            title: '身份证号',
            key: 'userId'
          },
          {
            title: '出生日期',
            key: 'birthday'
          },
          {
            title: '手机号',
            key: 'mobile'
          },
          {
            title: '家庭住址',
            key: 'homeAddress'
          }
        ],
        workersdata: []
      }
    },
    methods: {
      userlistChange(number) {
        var that = this
        that.$workersRepo.createTable().then(() => {
          that.$workersRepo.getWorkersCount(that.keyword).then((data) => {
            that.total = data.num
          }).then(() => that.$workersRepo.getWorkers(that.keyword, number, that.pagesize)).then((userlist) => {
            that.workersdata = userlist
          }).catch((err) => {
            
          })
        }).catch((err) => {
          
        })
      },
      search() {
        var that = this
        var k = that.keyword
        that.$workersRepo.getWorkersCount(k).then((data) => {
          that.total = data.num
        }).then(() => that.$workersRepo.getWorkers(k, 1, that.pagesize)).then((userlist) => {
          that.workersdata = userlist
        }).catch((err) => {
          
        })
      },
      showUserModal() {
        this.$store.dispatch('showNewBoardModal', {
          id: 0
        })
      }
    },
    created() {
      this.userlistChange(1)
      var that = this
      that.$http({
          baseURL: that.$store.state.modals.login.baseURL,
          url: '/login',
          data: {
            userName: 'cardReader',
            password: 'xywg'
          },
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function (data) {
          if (data.data.code === '200') {
            that.$store.dispatch('setToken', data.data.token)

            that.$http({
                baseURL: that.$store.state.modals.login.baseURL,
                url: '/getIdCardType',
                data: {
                  key: '人员证件类型'
                },
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'token': data.data.token
                }
              })
              .then(function (res) {
                that.$store.dispatch('setIdCardType', res.data)
              })
              .catch(function (error) {
                
              })
              .finally(() => {
                
              })

              //工种字典数据
              that.$http({
                baseURL: that.$store.state.modals.login.baseURL,
                url: '/getIdCardType',
                data: {
                  key: '工种字典数据'
                },
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'token': data.data.token
                }
              })
              .then(function (res) {
                that.$store.dispatch('setWorkKind', res.data)
              })
              .catch(function (error) {
                
              })
              .finally(() => {
                
              })

              that.$http({
                baseURL: that.$store.state.modals.login.baseURL,
                url: '/getIdCardType',
                data: {
                  key: '文化程度'
                },
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'token': data.data.token
                }
              })
              .then(function (res) {
                that.$store.dispatch('setCultureLevel', res.data)
              })
              .catch(function (error) {
                
              })
              .finally(() => {
                
              })
          }
        })
        .catch(function (error) {
          
        })
        .finally(() => {
          
        })
    }
  }
</script>
<style>
  .opttop {
    margin: 0 auto 20px auto;
    width: 96%;
  }

  .optcontent {
    margin: 20px auto;
    width: 96%;
  }

  .optbt {
    margin: 20px auto;
    width: 96%;
  }
</style>