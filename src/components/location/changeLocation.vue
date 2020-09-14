<template>
  <div>
    <div class="header">
      <div>
        <van-icon name="arrow-left" size="23px" @click="back" />
      </div>
      <div>更换收货地址</div>
      <div @click="addLocation">新增</div>
    </div>
    <div class="content">
      <div v-for="(item,index) in dizhi" :key="index">
        <div>
          <input type="checkbox" name id @click="onCheckbox(item)" />
          省份
          <span>{{item.province}}</span>
          市区
          <span>{{item.city}}</span>
          县区
          <span>{{item.district}}</span>
          收货人名称
          <span>{{item.name}}</span>
          收货人电话
          <span>{{item.phone}}</span>
          详细地址
          <span>{{item.address}}</span>
        </div>
      </div>
    </div>

    <van-submit-bar :price="3050" button-text="选择地址" @submit="onSubmit" />
  </div>
</template>

<script>
import { getarea } from "@/api/user";
export default {
  data() {
    return {
      dizhi: [],
      fl: false,
      iitem: {},
    };
  },
  methods: {
    back() {
      window.history.back();
    },
    addLocation() {
      this.$router.push({
        path: "/AddLocation",
      });
    },
    onCheckbox(item, $event) {
      //   console.log(item,event.target.checked);
      let flag = event.target.checked;
      this.fl = flag;
      this.iitem = item;

      localStorage.setItem("checkboxItem", JSON.stringify(item));
    },
    onSubmit() {
      //确认

      if (this.fl === true) {
        this.$router.push({
          path: "/confirm",
        });
      }
    },
  },
  created() {
    getarea().then((res) => {
      console.log(res.data);
      this.dizhi = res.data;
    });
  },
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
  margin-top: 100px;
}
</style>