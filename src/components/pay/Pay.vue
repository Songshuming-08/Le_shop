<template>
  <div>
    <van-nav-bar title="确认订单" left-text="返回" right-text left-arrow @click-left="onClickLeft" />

    <div class="wrap">
      <div>
        <div>
          <img width="50px" src="../../assets/img/cart/zhifubao.png" alt />
          支付宝
        </div>
        <van-radio-group v-model="radio">
          <van-radio name="1" @click="radio='1'">单选框 1</van-radio>
        </van-radio-group>
      </div>

      <div>
        <div>
          <img width="50px" src="../../assets/img/cart/weixin.png" alt />
          微信
        </div>
        <van-radio-group v-model="radio">
          <van-radio name="2" @click="radio='2'">单选框 1</van-radio>
        </van-radio-group>
      </div>

      <div>
        <div>
          <img width="50px" src="../../assets/img/cart/yuer.png" alt />
          余额支付
        </div>
        <van-radio-group v-model="radio">
          <van-radio name="3" @click="radio='3'">单选框 1</van-radio>
        </van-radio-group>
      </div>

      <p>{{this.radio}}</p>
    </div>
    <div>
      <van-button size="large" type="info" @click="confirm">确认支付</van-button>
    </div>

    <!-- 密码输入框 -->
    <van-password-input
      :value="value"
      info="密码为 6 位数字"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>

<script>
import { CretaeOrder, VerifyPayPWD, PayOrder, ZhiFuBao } from "@/api/user";
import QS from "qs";
import md5 from "js-md5";

export default {
  data() {
    return {
      radio: "3",
      num3: [],
      value: "",
      showKeyboard: true,
      num: [], //订单编号
      num2: [],
    };
  },
  methods: {
    onClickLeft() {
      window.history.back();
    },
    confirm() {
      //确认按钮
      this.showKeyboard = true;
      //支付宝请求
      if (this.radio == 1) {
        ZhiFuBao({
          OutTradeNo: this.num3,
          Subject: "标题",
          ProductCode: "QUICK_WAP_WAY",
          TotalAmount: 10,
        }).then((res) => {
          console.log("支付宝请求接口======>", res.data);
          // this.$router.push('/Zhifubao')
          this.$store.dispatch("zhifubaoData", res.data);
          this.html = res.data;
          var form = res.data;
          const div = document.createElement("div");
          div.innerHTML = form; //此处form就是后台返回接收到的数据
          document.body.appendChild(div);
          document.forms[0].submit();
        });
      }
    },
    onInput(key) {
      //密码输入
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      //删除
      this.value = this.value.slice(0, this.value.length - 1);
    },
  },
  watch: {
    //监听输入的密码值
    value(newvalue) {
      // console.log(newvalue);

      var data = {
        paypwd: newvalue,
      };
      //加密
      data.paypwd = md5(data.paypwd);
      //下标为3
      if (this.radio === "3") {
        //并且 输入密码长度为6
        if (newvalue.length == 6) {
          //发送请求
          VerifyPayPWD(data).then((res) => {
            console.log(res);
            if (res.code == 200) {
              //密码为200 请求支付成功接口
              PayOrder({
                orderNum: this.num3,
              }).then((res) => {
                console.log(res);
              });
              this.$router.push("OrderNum");
            }
          });
        }
      }
    },
  },
  created() {
    let v = this.$route.query.id;
    console.log(v);

    //创建订单
    CretaeOrder({
      goodsId: "2",
      isFcart: "true",
      consignee_addr: "212121,13213135256,21212 1212121 2121212 121212",
      price: "10",
      num: "1",
    }).then((res) => {
      console.log(res);
      console.log("订单编号", res.data);
      this.num = res.data;

      this.num.map((ele) => {
        this.num2.push(ele.orderNumber);
      });
      this.num3 = this.num2.join(" ");
      console.log(this.num2);
    });
  },
  mounted() {},
  computed: {},
};
</script>

<style scoped>
.wrap {
  width: 100%;
}
.wrap div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0px -100px;
}
</style>