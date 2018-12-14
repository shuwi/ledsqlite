<template>
  <Modal id="new-board-modal" v-model="isVisible" @on-visible-change="visibleChange" :mask-closable="false"
    :footer-hide="true" width="850" :scrollable="true" class-name="vertical-center-modal">
    <p slot="header">
      <Icon type="md-person"></Icon>
      <span style="font-weight:normal;">人员信息</span>
    </p>
    <Spin size="large" fix v-if="loadingPostUser"></Spin>
    <Form ref="user" :model="user" :rules="ruleValidate" :label-width="110">
      <div class="container">
        <div>
          <FormItem label="证件类型" prop="idCardType">
            <Select v-model="user.idCardType" style="width:200px">
              <Option v-for="item in idCardType" :value="item.num" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </div>
        <div>
          <FormItem label v-if="user.id === 0">
            <Button @click="getUserInfo" size="small" shape="circle" icon="md-wifi">身份证读取</Button>
          </FormItem>
        </div>
        <div>
          <FormItem label="身份证号" prop="userId">
            <Input v-model="user.userId" placeholder="请填写身份证号" style="width:200px" disabled />
          </FormItem>
        </div>
        <div class="item-b">
          <FormItem label prop="photo">
            <img v-if="typeof user.photo!=='undefined'" :src="'data:image/bmp;base64,'+user.photo" width="100px">
            <Input v-model="user.photo" style="display:none;" />
          </FormItem>
        </div>
        <div>
          <FormItem label="人员姓名" prop="name">
            <Input v-model="user.name" placeholder="请填写人员姓名" style="width:200px" disabled />
          </FormItem>
        </div>
        <div>
          <FormItem label="生日" prop="relbirthday">
            <DatePicker placeholder="请选择生日" v-model="user.relbirthday" :value="user.relbirthday" style="width:200px"
              format="yyyy-MM-dd" disabled></DatePicker>
          </FormItem>
        </div>
        <div>
          <FormItem label="性别" prop="gender">
            <RadioGroup v-model="user.gender" type="button" style="width:200px" size="small">
              <Radio label="1" disabled>男</Radio>
              <Radio label="0" disabled>女</Radio>
            </RadioGroup>
          </FormItem>
        </div>
        <div>
          <FormItem label="民族" prop="nation">
            <Input v-model="user.nation" placeholder="请填写民族" style="width:200px" disabled />
          </FormItem>
        </div>
        <div>
          <FormItem label="籍贯" prop="birthPlaceCode">
            <Input v-model="user.birthPlaceCode" placeholder="请填写籍贯" style="width:200px" disabled />
          </FormItem>
        </div>
        <div>
          <FormItem label="电话号码" prop="mobile">
            <Input v-model="user.mobile" placeholder="请填写电话号码" style="width:200px" />
          </FormItem>
        </div>
        <div>
          <FormItem label="政治面貌" prop="politicsType">
            <Select v-model="user.politicsType" style="width:200px">
              <Option value="0">中共党员</Option>
              <Option value="1">中共预备党员</Option>
              <Option value="2">共青团员</Option>
              <Option value="3">群众</Option>
            </Select>
          </FormItem>
        </div>
        <div>
          <FormItem label="家庭住址" prop="homeAddress">
            <Input v-model="user.homeAddress" placeholder="请填写家庭住址" style="width:200px" disabled />
          </FormItem>
        </div>
        <div>
          <FormItem label="是否加入工会" prop="unJoined">
            <RadioGroup v-model="user.unJoined" type="button" size="small" @on-change="joinedChange">
              <Radio label="1">已加入</Radio>
              <Radio label="0">未加入</Radio>
            </RadioGroup>
          </FormItem>
        </div>
        <div>
          <FormItem label="加入工会时间">
            <FormItem prop="joinedTimeNew">
              <DatePicker placeholder="请选择加入工会时间" v-model="user.joinedTimeNew" style="width:200px" format="yyyy-MM-dd"
                @on-change="joinedTimeNewChange" :disabled="joinedTimeDisabled"></DatePicker>
            </FormItem>
          </FormItem>
        </div>
        <div>
          <FormItem label="文化程度" prop="cultureLevelType">
            <Select v-model="user.cultureLevelType" style="width:200px">
              <Option v-for="item in cultureLevel" :value="item.num" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </div>
        <div>
          <FormItem label="是否有重大病史" prop="noBadMedicalHistory">
            <RadioGroup v-model="user.noBadMedicalHistory" type="button" size="small">
              <Radio label="1">是</Radio>
              <Radio label="0">否</Radio>
            </RadioGroup>
          </FormItem>
        </div>
        <div>
          <FormItem label="紧急联系人" prop="urgentContractName">
            <Input v-model="user.urgentContractName" placeholder="请填写紧急联系人" style="width:200px" :maxlength="8" />
          </FormItem>
        </div>
        <div>
          <FormItem label="紧急联系人电话" prop="urgentContractCellphone">
            <Input v-model="user.urgentContractCellphone" placeholder="请填写紧急联系人电话" style="width:200px" />
          </FormItem>
        </div>
        <div>
          <FormItem label="开始工作日期" prop="workDateNew">
            <DatePicker placeholder="请选择开始工作日期" v-model="user.workDateNew" style="width:200px" @on-change="workDateNewChange"
              format="yyyy-MM-dd"></DatePicker>
          </FormItem>
        </div>
        <div>
          <FormItem label="工种" prop="workKind">
            <Select v-model="user.workKind" style="width:200px" filterable>
              <Option v-for="item in workKind" :value="item.num" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </div>
        <div v-if="classNoVisible">
          <FormItem label="人员类型" prop="personType">
            <Select v-model="user.personType" style="width:200px">
              <Option v-for="item in personTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </div>
        <div>
          <FormItem label>
            <Button type="primary" @click="handleSubmit('user')" shape="circle" style="width:100px;" :loading="loadingPostUser"
              icon="md-checkmark">提交</Button>
            <Button @click="handleReset('user')" style="margin-left: 8px;width:100px;" shape="circle" type="warning"
              icon="ios-undo">重置</Button>
          </FormItem>
        </div>
      </div>
    </Form>
  </Modal>
</template>

<script>
  var ffi = require("ffi")

  var DLL = ffi.Library("termb.dll", {
    InitComm: ["int", ["int"]],
    Authenticate: ["int", []],
    Read_Content: ["int", ["int"]],
    GetPeopleName: ["int", ["string", "int"]],
    GetPeopleBirthday: ["int", ["string", "int"]],
    GetPeopleAddress: ["int", ["string", "int"]],
    GetPeopleNation: ["int", ["string", "int"]],
    GetPeopleIDCode: ["int", ["string", "int"]],
    GetPhotoBMP: ["int", ["string", "int"]],
    GetPeopleSex: ["int", ["string", "int"]],
    GetDepartment: ["int", ["string", "int"]],
    GetStartDate: ["int", ["string", "int"]],
    GetEndDate: ["int", ["string", "int"]],
    CloseComm: ["int", []]
  })
  var result = 0
  export default {
    name: "new-board-modal",
    computed: {
      isVisible: {
        get() {
          return this.$store.state.modals.newBoard.isVisible
        },
        set() {
          
        }
      },
      idCardType() {
        return this.$store.state.modals.metaData.idCardType
      },
      cultureLevel() {
        return this.$store.state.modals.metaData.cultureLevel
      },
      workKind() {
        return this.$store.state.modals.metaData.workKind
      }
    },
    data() {
      function dateFormat(date, fmt) {
        if (null == date || undefined == date) return ""
        var o = {
          "M+": date.getMonth() + 1, //月份
          "d+": date.getDate(), //日
          "h+": date.getHours(), //小时
          "m+": date.getMinutes(), //分
          "s+": date.getSeconds(), //秒
          S: date.getMilliseconds() //毫秒
        }
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
          )
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1 ?
              o[k] :
              ("00" + o[k]).substr(("" + o[k]).length)
            )
        return fmt
      }

      Date.prototype.toJSON = function () {
        return dateFormat(this, "yyyy-MM-dd")
      }
      var validateMobile = (rule, value, callback) => {
        if (value === "") {
          callback()
        } else {
          if (!/^1[34578]\d{9}$/.test(value)) {
            callback(new Error("手机号格式错误！"))
          } else {
            callback()
          }
        }
      }
      var validatePhone = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("手机号必填！"))
        } else {
          if (!/^1[34578]\d{9}$/.test(value)) {
            callback(new Error("手机号格式错误！"))
          } else {
            callback()
          }
        }
      };
      return {
        userdatatemp: {},
        joinedTimeDisabled: true,
        userDataSend: {},
        workKindTypeVisible: true,
        classNoVisible: false,
        personTypeList: [],
        idCardTypeArr: [],
        classNoArr: [],
        loadingUpdates: false,
        loadingPost: false,
        loadingSQL: false,
        updateloadingPost: false,
        loadingPostUser: false,
        pname: "",
        workKindArr: [],
        user: {
          id: 0,
          userId: "",
          name: "",
          gender: "",
          birthday: "",
          relbirthday: "",
          mobile: "",
          homeAddress: "",
          currentAddresss: "",
          workKind: "",
          idCardType: 1,
          nation: "",
          birthPlaceCode: "",
          politicsType: "3",
          unJoined: "0",
          joinedTimeNew: "",
          cultureLevelType: "0",
          noBadMedicalHistory: "0",
          urgentContractName: "",
          urgentContractCellphone: "",
          workDateNew: "",
          personTypeNew: [],
          professionlType: "0",
          personType: "",
          photo: "",
          workKindType: "1",
          workAccommodationType: "0",
          endnew: "",
          isSue: '',
          startTime: '',
          endTime: ''
        },
        ruleValidate: {
          name: [{
            required: true,
            message: "请填写人员姓名",
            trigger: "blur"
          }],
          userId: [{
            required: true,
            message: "请填写身份证号",
            trigger: "blur"
          }],
          homeAddress: [{
            required: true,
            message: "请填写家庭地址",
            trigger: "blur"
          }],
          birthPlaceCode: [{
            required: true,
            message: "请填写籍贯",
            trigger: "blur"
          }],
          gender: [{
            required: true,
            message: "请选择性别",
            trigger: "change"
          }],
          workKind: [{
            required: true,
            message: "请选择岗位",
            trigger: "blur",
            type: "number"
          }],
          mobile: [{
            required: true,
            validator: validatePhone,
            trigger: "blur"
          }],
          urgentContractCellphone: [{
            validator: validateMobile,
            trigger: "blur"
          }]
        }
      }
    },
    methods: {
      resetInput() {
        this.$refs.user.resetFields()
      },
      visibleChange(isVisible) {
        if (!isVisible) {
          this.user.id = 0
          this.closeModal()
        } else {
          this.$Loading.finish()
        }
      },
      closeModal() {
        this.$store.dispatch("hideNewBoardModal")
        this.$emit("reloadPage") //通知重载列表
        this.resetInput()
      },
      handleReset(name) {
        this.$refs[name].resetFields()
      },
      getUserInfo() {
        for (var j = 1001; j < 1016; j++) {
          result = DLL.InitComm(j)
          if (result === 1) {
            break
          }
        }
        if (result !== 1) {
          this.$Notice.error({
            title: "提醒",
            desc: "设备初始化失败. "
          })
          return
        }
        var one = DLL.Authenticate()
        var two = DLL.Read_Content(1) // 读取基本信息
        if (two === 1) {
          let name = Buffer.alloc(25, 32)
          let birthday = Buffer.alloc(20, " ")
          let address = Buffer.alloc(100, " ")
          let nation = Buffer.alloc(20, " ")
          let idcode = Buffer.alloc(20, " ")
          let photo = Buffer.alloc(38862, "base64")
          let sex = Buffer.alloc(4, 32)
          let sue = Buffer.alloc(100, " ")
          let starttime = Buffer.alloc(100, " ")
          let endtime = Buffer.alloc(100, " ")
          var iconv = require("iconv-lite")
          result = DLL.GetPeopleName(name, 20)
          result = DLL.GetPeopleBirthday(birthday, 100)
          result = DLL.GetPeopleAddress(address, 71)
          result = DLL.GetDepartment(sue, 71)
          result = DLL.GetStartDate(starttime, 71)
          result = DLL.GetEndDate(endtime, 71)
          result = DLL.GetPeopleNation(nation, 20)
          result = DLL.GetPeopleIDCode(idcode, 100)
          result = DLL.GetPhotoBMP(photo, 38862)
          result = DLL.GetPeopleSex(sex, 4)
          name.forEach(function (value, index, array) {
            if (value === 0) {
              array[index] = 32
            }
          })
          birthday.forEach(function (value, index, array) {
            if (value === 0) {
              array[index] = 32
            }
          })
          address.forEach(function (value, index, array) {
            if (value === 0) {
              array[index] = 32
            }
          })
          nation.forEach(function (value, index, array) {
            if (value === 0) {
              array[index] = 32
            }
          })
          idcode.forEach(function (value, index, array) {
            if (value === 0) {
              array[index] = 32
            }
          })
          sex.forEach(function (value, index, array) {
            if (value === 0) {
              array[index] = 32
            }
          })
          sue.forEach(function (value, index, array) {
            if (value === 0) {
              array[index] = 32
            }
          })
          starttime.forEach(function (value, index, array) {
            if (value === 0) {
              array[index] = 32
            }
          })
          endtime.forEach(function (value, index, array) {
            if (value === 0) {
              array[index] = 32;
            }
          })

          this.user.name = iconv.decode(name, "gbk").trim()
          this.user.homeAddress = iconv.decode(address, "gbk").trim()
          this.user.nation = iconv.decode(nation, "gbk").trim()
          this.user.relbirthday = this.Toyyyy_MM_dd(
            iconv.decode(birthday, "gbk").trim()
          )
          this.user.birthday = this.ToyyyyMMdd(
            iconv.decode(birthday, "gbk").trim()
          )
          this.user.userId = iconv.decode(idcode, "utf8").trim()
          this.user.photo = photo.toString("base64")
          this.user.gender = iconv.decode(sex, "gbk").trim() === "男" ? "1" : "0"

          this.user.isSue = iconv.decode(sue, 'gbk').trim()
          this.user.startTime = iconv.decode(starttime, 'gbk').trim()
          this.user.endTime = iconv.decode(endtime, 'gbk').trim()
          var ss = this.user.userId.substring(0, 2)
          const values = this.$store.state.modals.placeCode
          var that = this
          values.forEach(function (value, index, array) {
            if (value.code === ss) {
              that.user.birthPlaceCode = value.name
            }
          })
        } else {
          this.$Notice.error({
            title: "提醒",
            desc: `身份证信息读取失败`
          })
        }

        DLL.CloseComm()
      },
      Toyyyy_MM_dd(setDate) {
        var valDate = ""
        if (typeof setDate === "undefined" || null === setDate) return ""

        if (setDate.length === 8) {
          valDate =
            setDate.substring(0, 4) +
            "-" +
            setDate.substring(4, 6) +
            "-" +
            setDate.substring(6, 8)
          return valDate
        } else if (setDate.length === 6) {
          valDate = setDate.substring(0, 4) + "-" + setDate.substring(4, 6)
          return valDate
        }
        return valDate
      },
      ToyyyyMMdd(setDate) {
        var valDate = ""
        if (setDate.length === 8) {
          valDate =
            setDate.substring(0, 4) +
            "" +
            setDate.substring(4, 6) +
            "" +
            setDate.substring(6, 8)
          return valDate
        } else if (setDate.length === 6) {
          valDate = setDate.substring(0, 4) + "" + setDate.substring(4, 6)
          return valDate
        }
        return valDate
      },
      workDateNewChange(v) {
        this.user.workDate = new Date(v)
        this.user.workDateNew = v
      },
      joinedTimeNewChange(v) {
        this.user.joinedTime = new Date(v)
        this.user.joinedTimeNew = v
      },

      handleSubmit(name) {
        this.$refs[name].validate(valid => {
          var that = this
          if (valid && that.$store.state.modals.login.token !== "") {
            that.loadingPostUser = true
            var posturl = "/addWorker"
            that.$http({
                baseURL: that.$store.state.modals.login.baseURL,
                url: posturl,
                data: that.user,
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'token': that.$store.state.modals.login.token
                }
              })
              .then(function (res) {
                if (res.data.result === '1'){
                  that.userOpt(that.user)
                  that.$Notice.success({
                    title: "提醒",
                    desc: res.data.msg
                  })
                }else
                  that.$Notice.error({
                    title: "提醒",
                    desc: res.data.msg
                  })
              })
              .catch(function (error) {
                
              })
              .finally(() => {
                that.loadingPostUser = false
                that.closeModal()
              })
          } else {
            that.$Message.error("验证未通过")
          }
        })
      },
      /**
       * 本地数据库操作
       */
      userOpt(userdata) {
        var statlist = [
          "userId",
          "name",
          "gender",
          "birthday",
          "mobile",
          "homeAddress",
          "workKind",
          "idCardType",
          "birthPlaceCode",
          "nation",
          "politicsType",
          "unJoined",
          "joinedTime",
          "cultureLevelType",
          "urgentContractCellphone",
          "urgentContractName",
          "noBadMedicalHistory",
          "workDate",
          "isSue",
          "startTime",
          "endTime"
        ];

        var statdata = {};
        statlist.forEach(function (v, i, a) {
          statdata[v] = userdata[v]
        })

        var that = this

        that.$workersRepo
          .getCount(userdata.userId)
          .then(res => {
            if (res.num > 0) {
              that.$workersRepo
                .update(statdata)
                .then(re => {
                  if (re.affected === 1) {
                    that.$Notice.success({
                      title: "提醒",
                      desc: "已存在该人员数据，修改成功"
                    })
                  } else {
                    that.$Notice.error({
                      title: "提醒",
                      desc: "已存在该人员数据，修改出错"
                    })
                  }
                })
                .catch(err => {
                  that.$Notice.error({
                    title: "提醒",
                    desc: `修改出错${err}`
                  })
                })
                .finally(() => {
                  that.loadingPostUser = false
                  that.closeModal()
                  that.$refs["user"].resetFields()
                })
            } else {
              that.$workersRepo
                .create(statdata)
                .then(re => {
                  if (re.id > 0) {
                    that.$Notice.success({
                      title: "提醒",
                      desc: "新增成功"
                    })
                  } else {
                    that.$Notice.error({
                      title: "提醒",
                      desc: "新增出错"
                    })
                  }
                })
                .catch(err => {
                  that.$Notice.error({
                    title: "提醒",
                    desc: `新增出错${err}`
                  })
                })
                .finally(() => {
                  that.loadingPostUser = false
                  that.closeModal()
                  that.$refs["user"].resetFields()
                })
            }
          });
      },
      setWorkKindSelected(v) {
        this.user.workKind = v
      },
      joinedChange(v) {
        if (v === "1") {
          //加入工会
          this.joinedTimeDisabled = false
        } else {
          this.joinedTimeDisabled = true
          this.user.joinedTimeNew = ""
        }
      }
    }
  };
</script>
<style>
  .container {
    display: grid;
    grid-template-columns: 49% 49%;
    grid-auto-flow: row;
  }

  .item-b {
    grid-column: 2 / 3;
    grid-row: 2 / 5;
  }
</style>