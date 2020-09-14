<template>
  <div>
    <!-- 头部logo -->
    <div class="header_logo">
      <img src="../../assets/img/home/LE_logo_2.png" width="240px" alt />
    </div>
    <!-- tab标签页 -->
    <van-tabs
      type="card"
      color="#FFFFFF"
      background="#F5F5F5"
      title-active-color="#5959D1"
      title-inactive-color="black"
    >
      <!-- 登录 -->

      <van-tab title="登录">
        <!-- <input type="text" v-model="username" placeholder="账号" />
        <input type="password" v-model="dlpassword" placeholder="密码" />
        <button @click="onSubmit">登录</button>-->
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="账号"
            label="账号"
            placeholder="账号"
            :rules="[{ required: true, message: '请填写账号' }]"
          />
          <van-field
            v-model="dlpassword"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div><input type="checkbox" name id />记住密码</div>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit"
              >登录</van-button
            >
          </div>
        </van-form>
      </van-tab>
      <!-- 注册 -->
      <van-tab title="注册">
        <div class="register_box">
          <van-field
            clearable
            center
            required
            colon
            v-model="tel"
            type="tel"
            placeholder="请输入手机号"
            label="手机号"
            maxlength="11"
          />

          <!-- 允许输入正整数，调起纯数字键盘 -->
          <van-field
            maxlength="12"
            clearable
            required
            colon
            placeholder="中-英文均可、不得超过12个字符"
            v-model="digit"
            type="textarea "
            label="用户名"
          />

          <!-- 输入密码 -->
          <van-field
            clearable
            required
            colon
            v-model="password"
            placeholder="3-18位英文、数字、符号, 区分大小写"
            type="password"
            label="密码"
          />

          <!-- 验证码 -->
          <van-field
            v-model="sms"
            center
            clearable
            label="短信验证码"
            placeholder="请输入短信验证码"
          >
            <template #button>
              <van-button size="small" type="info" @click="sendCode"
                >发送验证码</van-button
              >
            </template>
          </van-field>

          <van-button size="large " round type="info" @click="onRegister"
            >注册</van-button
          >
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getPhone, getLoginName, getVerification } from "@/api/user";
import axios from "axios";
import qs from "qs"; //post请求
import md5 from "js-md5"; //加密

export default {
  data() {
    return {
      tel: "", //注册手机号
      digit: "", //注册用户名
      password: "", //注册密码
      sms: "", //验证码
      username: "", //登录账号
      dlpassword: "", //登录密码
    };
  },
  methods: {
    onSubmit() {
      //登录
      let params = {
        LoginName: this.username,
        LoginPassword: this.dlpassword,
        isPassing: "yes",
      };

      console.log(params);
      params.LoginPassword = md5(params.LoginPassword);

      axios
        .post(
          `http://www.hj0819.top:44369/api/LoginPage/Login`,
          qs.stringify(params)
        )
        .then((res) => {
          console.log(res);
          //通过请求接口拿到一个Token，提交到vuex
          this.$store.dispatch("ADDdenglu", res.data.tnToken.tokenStr),
            setTimeout(() => {
              this.$router.push({
                path: "/home",
              });
            }, 1000);
        });
    },
    sendCode() {
      //发送验证码

      getVerification({
        phone: this.tel,
        codeType: 0,
      }).then((res) => {
        console.log(res);
      });
      console.log("发送验证码");
    },
    onRegister() {
      //注册

      getPhone().then((res) => {});

      let params = {
        LoginName: this.digit,
        LoginPassword: this.password,
        phone: this.tel,
      };

      params.LoginPassword = md5(params.LoginPassword); //加密

      axios
        .post(
          `http://www.hj0819.top:44369/api/LoginPage/AddLogin`,
          qs.stringify(params)
        )
        .then((res) => {
          console.log(res);
        });
    },
  },

  mounted() {},
};
</script>

<style scoped>
.header_logo {
  background: white;
  width: 100%;
  height: 100px;
  text-align: center;
}
.register_box {
  width: 100%;
}
</style>
