const state = {
  newBoard: {
    isVisible: false,
    data: {},
    id: 0
  },
  login: {
    baseURL: 'http://192.168.20.211:8090/cardReader/',
    token: ''
  },
  metaData: {
    idCardType: [],
    cultureLevel: [],
    workKind: []
  },
  placeCode: [{
      name: '北京市',
      code: '11'
    },
    {
      name: '天津市',
      code: '12'
    },
    {
      name: '河北',
      code: '13'
    },
    {
      name: '山西',
      code: '14'
    },
    {
      name: '内蒙古自治区',
      code: '15'
    },
    {
      name: '辽宁',
      code: '21'
    },
    {
      name: '吉林',
      code: '22'
    },
    {
      name: '黑龙江',
      code: '23'
    },
    {
      name: '上海市',
      code: '31'
    },
    {
      name: '江苏',
      code: '32'
    },
    {
      name: '浙江',
      code: '33'
    },
    {
      name: '安徽',
      code: '34'
    },
    {
      name: '福建',
      code: '35'
    },
    {
      name: '江西',
      code: '36'
    },
    {
      name: '山东',
      code: '37'
    },
    {
      name: '河南',
      code: '41'
    },
    {
      name: '湖北',
      code: '42'
    },
    {
      name: '湖南',
      code: '43'
    },
    {
      name: '广东',
      code: '44'
    },
    {
      name: '广西壮族自治区',
      code: '45'
    },
    {
      name: '海南',
      code: '46'
    },
    {
      name: '重庆',
      code: '50'
    },
    {
      name: '四川',
      code: '51'
    },
    {
      name: '贵州',
      code: '52'
    },
    {
      name: '云南',
      code: '53'
    },
    {
      name: '西藏自治区',
      code: '54'
    },
    {
      name: '陕西',
      code: '61'
    },
    {
      name: '甘肃',
      code: '62'
    },
    {
      name: '青海',
      code: '63'
    },
    {
      name: '宁夏回族自治区',
      code: '64'
    },
    {
      name: '新疆维吾尔自治区',
      code: '65'
    },
    {
      name: '台湾',
      code: '71'
    },
    {
      name: '香港特别行政区',
      code: '81'
    },
    {
      name: '澳门特别行政区',
      code: '91'
    }
  ]
}

const mutations = {
  SHOW_NEW_BOARD(state, val) {
    state.newBoard.isVisible = true
    state.newBoard.data = val
    state.newBoard.id = val.id
  },
  HIDE_NEW_BOARD(state) {
    state.newBoard.isVisible = false
    state.newBoard.data = {}
    state.newBoard.id = 0
  },
  SET_TOKEN(state, val) {
    state.login.token = val
  },
  SET_IDCARDTYPE(state, val) {
    state.metaData.idCardType = val
  },
  SET_CULTURELEVEL(state, val) {
    state.metaData.cultureLevel = val
  },
  SET_WORKKIND(state, val) {
    state.metaData.workKind = val
  }
}

const actions = {
  showNewBoardModal({
    commit
  }, val) {
    commit('SHOW_NEW_BOARD', val)
  },
  hideNewBoardModal({
    commit
  }) {
    commit('HIDE_NEW_BOARD')
  },
  setToken({
    commit
  }, val) {
    commit('SET_TOKEN', val)
  },
  setIdCardType({
    commit
  }, val) {
    commit('SET_IDCARDTYPE', val)
  },
  setCultureLevel({
    commit
  }, val) {
    commit('SET_CULTURELEVEL', val)
  },
  setWorkKind({
    commit
  }, val) {
    commit('SET_WORKKIND', val)
  }
}

export default {
  state,
  mutations,
  actions
}