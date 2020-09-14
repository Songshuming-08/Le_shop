<template>
  <div>
    <div class="header">
      <div>
        <van-icon name="arrow-left" size="23px" @click="back" />
      </div>
      <div>新增收货地址</div>
      <div></div>
    </div>

    <div class="content">
      <div>
        收件人
        <input type="text" v-model="user" />
      </div>
      <div>
        联系电话
        <input type="text" v-model="userNumber" />
      </div>
      <div>
        省份
        <input type="text" v-model="shengFen" />
      </div>
      <div>
        地级市
        <input type="text" v-model="diJiShi" />
      </div>
      <div>
        市、县级市
        <input type="text" v-model="shiXianJiShi" />
      </div>
      <div>
        详细地址
        <textarea v-model="XiangXidizhi"></textarea>
      </div>
      <van-button type="info" @click="add">立即创建</van-button>
      <van-button type="danger">重置</van-button>
    </div>
  </div>
</template>

<script>
import {addarea} from '@/api/user'
export default {
  data() {
    return {
      user: "",
      userNumber: "",
      shengFen: "",
      diJiShi: "",
      shiXianJiShi: "",
      XiangXidizhi: "",
    };
  },
  methods: {
    back() {
      window.history.back();
    },
    add() {
        addarea({
            Name:this.user,
            Phone:this.userNumber,
            Province:this.shengFen,
            City:this.diJiShi,
            District:this.shiXianJiShi,
            Address:this.XiangXidizhi
        }).then((res)=>{
            // console.log(res)
        })
      
    },
  },
  created() {},
  mounted() {},
  computed: {},
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 100px;
  background: white;
  border-bottom: 1px solid #eee;
  font-size: 33px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
  box-sizing: border-box;
  position: fixed;
  top: 0px;
  z-index: 1000;
}
.content {
  width: 100%;
  margin-top: 100px;
}
</style>