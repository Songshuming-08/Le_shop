const state = {
  userName: '',
  token: "",
  cartData: [],
  cart: [],
  cartId: [],
  createLoction: [],
  zhifubaoData: []//支付宝
  // checkedState: Boolean
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  ADDdenglu(state, val) {
    state.token = val
  },
  getCart(state, cartitem) {
    console.log(cartitem)
    state.cartData = cartitem
    state.cart = []
    state.cartData.forEach((ele) => {
      if (ele == null) {
        state.cartData.pop(ele)

        state.cart = state.cartData

        // console.log(state.cart)
      }
    })

  },
  getCartId(state) {
    state.cart.forEach((ele) => {
      console.log(ele)
      // console.log(ele.cart_id)
      // state.cartId=ele.cart_id

    })

  },
  create_loction(state, item) {
    console.log(item)
    state.createLoction = item
    console.log(state.createLoction)
  },
  // All_CHECKED(state, stat) {
  //   console.log(stat)
  //   state.checkedState = stat
  // }
  zhifubaoData(state, item) {  //支付宝页面数据
    console.log(item)
    state.zhifubaoData = item
  }
}
const actions = {
  // 设置name
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  },
  ADDdenglu(context, val) {
    context.commit("ADDdenglu", val)
  },
  getCart(context, cartdata) {
    context.commit("getCart", cartdata)
  },
  getCartId(context) {
    context.commit("getCartId")
  },
  create_loction(context, item) {  //创建地址
    context.commit("create_loction", item)
  },
  // All_CHECKED(context, stat) {
  //   context.commit("All_CHECKED", stat)
  // }
  zhifubaoData(context, item) {
    context.commit("zhifubaoData", item)
  }
}
export default {
  state,
  mutations,
  actions
}
