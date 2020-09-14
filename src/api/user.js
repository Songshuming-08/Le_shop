import api from './index'
// axios
import request from '@/utils/request'

//首页
export function getHomeData(data) {
  return request({
    url: api.HomeData,
    method: 'get',
    data,
    hideloading: false
  })
}
//首页
export function HomeShowGoods(params) {
  return request({
    url: api.HomeShowGoods,
    method: 'get',
    params,
    hideloading: false
  })
}

//商品详情
export function getDetailsData(params) {
  return request({
    url: api.DetailsData,
    method: 'get',
    params,
    hideloading: false
  })
}


//验证手机号
export function getPhone(phone) {
  return request({
    url: api.PhoneSate,
    method: 'get',
    params: {
      phone
    },
    hideloading: false
  })
}
//验证用户名
export function getLoginName(LoginName) {
  return request({
    url: api.LoginNames,
    method: 'get',
    params: {
      LoginName
    },
    hideloading: false
  })
}

//请求验证码
export function getVerification(params) {
  return request({
    url: api.Verifications,
    method: 'get',
    params,
    hideloading: false
  })
}


//分类 一级分类
export function getClassifyOne(params) {
  return request({
    url: api.ClassifyOne,
    method: 'get',
    params,
    hideloading: false
  })
}

//分类 二级分类
export function getClassifyTwo(params) {
  return request({
    url: api.ClassifyTwo,
    method: 'get',
    params,
    hideloading: false
  })
}



//获取购物车信息
export function getUserCart(params) {
  return request({
    url: api.UserCart,
    method: 'get',
    params,
    hideloading: false
  })
}

//加入购物车
export function addCart(params) {
  return request({
    url: api.AddCart,
    method: 'post',
    params,
    hideloading: false
  })
}
//删除购物车
export function deleteCart(params) {
  return request({
    url: api.DeleteCart,
    method: 'patch',
    params,
    hideloading: false
  })
}


////购物车到订单页面的接口
export function GetGoodsInfoFromCart(params) {
  return request({
    url: api.getGoodsInfoFromCart,
    method: 'get',
    params,
    hideloading: false
  })
}



export function addarea(params) {
  return request({
    url: api.addArea,
    method: 'post',
    params,
    hideloading: false
  })
}


export function getarea(params) {
  return request({
    url: api.getArea,
    method: 'get',
    params,
    hideloading: false
  })
}

//创建订单 点击确定付款 但未完成付款操作
export function CretaeOrder(params) {
  return request({
    url: api.cretaeOrder,
    method: 'post',
    params,
    hideloading: false
  })
}


export function VerifyPayPWD(params) {
  return request({
    url: api.verifyPayPWD,
    method: 'post',
    params,
    hideloading: false
  })
}


export function PayOrder(params) {
  return request({
    url: api.payOrder,
    method: 'post',
    params,
    hideloading: false
  })
}


export function ZhiFuBao(params) {
  return request({
    url: api.zhifubao,
    method: 'post',
    params,
    hideloading: false
  })
}


//搜索部分
export function GetSearchHot(params) {
  return request({
    url: api.getSearchHot,
    method: 'get',
    params,
    hideloading: false
  })
}
//搜索内容
export function GetGoods(params) {
  return request({
    url: api.getGoods,
    method: 'get',
    params,
    hideloading: false
  })
}


















// 登录
// export function login(data) {
//   return request({
//     url: api.Login,
//     method: 'post',
//     data
//   })
// }

// 用户信息 post 方法
// export function getUserInfo(data) {
//   return request({
//     url: api.UserInfo,
//     method: 'post',
//     data,
//     hideloading: true
//   })
// }

// 用户名称 get 方法
// export function getUserName(params) {
//   return request({
//     url: api.UserName,
//     method: 'get',
//     params,
//     hideloading: true
//   })
// }



