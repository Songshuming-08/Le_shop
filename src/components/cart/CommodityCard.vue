<template>
  <div class="wrap">
    <van-checkbox-group v-model="result" @change="changeAll">
      <van-swipe-cell v-for="(item,index) in mycart" :key="index">
        <van-card
          num="2"
          :price="item.price"
          desc
          :title="item.title"
          class="goods-card"
          :thumb="item.image"
        >
          <template #tag>
            <!-- 单选 -->
            <van-checkbox v-model="checked" :name="item"></van-checkbox>
          </template>
        </van-card>

        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            @click="del(item.cart_id)"
            class="delete-button"
          />
        </template>
      </van-swipe-cell>
    </van-checkbox-group>

    <van-submit-bar :price="totel" button-text="提交订单" @submit="onSubmit">
      <!-- 单选 -->
      <van-checkbox v-model="checkeds" @change="ok">全选</van-checkbox>
      <!-- <template #tip>
        你的收货地址不支持同城送,
        <span @click="onClickEditAddress">修改地址</span>
      </template>-->
    </van-submit-bar>
  </div>
</template>

<script>
import { deleteCart, getUserCart } from "@/api/user";
export default {
  data() {
    return {
      checked: false,
      result: [], //
      mycart: [],
      checkeds: false,
      cartid: [],
    };
  },
  methods: {
    del(id) {
      console.log(id);
      deleteCart({
        carid: id,
      }).then((res) => {
        console.log(res);
      });

      getUserCart({
        page: 1,
        pageSize: 70,
      }).then((res) => {
        console.log(res);
        this.$store.dispatch("getCart", res.data);
        // this.cartNum = res.data.length;
      });
    },
    onSubmit() {
      this.$router.push({
        path: "/confirm",
      });
    },
    ok(val) {
      //全选
      console.log(val);
      if (this.checkeds) {
        this.checked = true;
        this.result = this.mycart;
      } else {
        this.checked = false;
        this.result = [];
      }
    },
    changeAll(name) {
      //单选
      console.log(name);
      if (name.length < this.mycart.length) {
        this.checkeds = false;
      } else if (name.length == this.mycart.length) {
        this.checkeds = true;
      }
    },
  },
  computed: {
    cart: function () {
      return this.$store.state.app.cart;
    },
    id: function () {
      return this.$store.state.app.cart;
    },
    totel() {
      let money = 0;
      this.result.forEach((ele) => {
        money += ele.customer_id * 1;
      });
      return money * 100;
    },
  },
  created() {
    // console.log(this.cart, "1111");
    this.mycart = this.cart;
    console.log(this.mycart);
  },
};
</script>

<style scoped>
.wrap {
  width: 100%;
  margin-top: 100px;
  margin-bottom: 100px;
}

.delete-button {
  height: 100%;
}
</style>