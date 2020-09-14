const api = {
  HomeData: '/Home/getHomeREC',//首页
  HomeShowGoods: '/Home/getHomeShowGoods',//首页
  DetailsData: '/Goods/GetGoodsInfo',//商品详情,
  PhoneSate: '/Verify/GetPhone',//验证手机号否正确
  LoginNames: '/Verify/LoginName',//验证用户名是否正确
  Verifications: '/SMSCode/GetCode',//请求验证码
  // Registers:'/LoginPage/AddLogin'//开始注册
  ClassifyOne: '/Goods/getCatsTree',//分类页面 一级分类
  ClassifyTwo: '/Goods/getCadGoods',//分类页面 二级分类
  UserCart: '/Cart/getCart',// 获取用户购物车信息
  AddCart: '/Cart/addCart',//加入购物车
  DeleteCart: '/Cart/DeleteCart',//删除购物车
  getGoodsInfoFromCart: '/Order/getGoodsInfoFromCart',//购物车到订单页面的接口
  addArea: '/UserInfo/addArea',//添加用户的收货地址
  getArea: '/UserInfo/getArea',//获取用户的收货地址
  cretaeOrder: '/Order/cretaeOrder',//创建订单 点击确定付款 但未完成付款操作
  verifyPayPWD: '/Order/verifyPayPWD',//验证支付密码
  payOrder: '/Order/payOrder',//进行订单的支付 （余额）
  zhifubao:'/Alipay/appWebPay', //支付宝
  //搜索部分
  getSearchHot:'/Goods/getSearchHot',//全网热搜
  getGoods:'/Goods/getGoods',//搜索内容
}

export default api
