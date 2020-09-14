<template>
  <div>
    <CartHeader center="确认支付" @backs="backs" ></CartHeader>

    <div class="location" @click="gochangeLocation">
      <img src="../../assets/地址logo.png" alt />

      <span>{{ routerItem.province }}</span>
      <span>{{ routerItem.city }}</span>
      <span>{{ routerItem.district }}</span>
      <span>{{ routerItem.name }}</span>
      <span>{{ routerItem.phone }}</span>
    </div>

    <div>
      <!-- {{this.llid.title}} -->
      <div v-for="(item, index) in this.llid" :key="index">
        {{ item.title }}
        <span style="color:pink;">{{ item.price }}</span>
        <img :src="item.image" width="100%" alt />
      </div>
    </div>
    <van-submit-bar :price="totel" button-text="去支付" @submit="onSubmit" />
  </div>
</template>

<script>
import CartHeader from "@/components/cart/CartHeader";

import { GetGoodsInfoFromCart } from "@/api/user";
export default {
  components: {
    CartHeader,
  },
  data() {
    return {
      cartid: [],
      routerItem: {},
      goodsIds: "",
    };
  },
  methods: {
    backs() {
      console.log("111");
      //返回
      window.history.back();
    },
    gochangeLocation() {
      this.$router.push("ChangeLocation");
    },
    onSubmit() {
      //支付
      console.log(this.llid);
      let id = [];
      this.llid.forEach((ele) => {
        id.push(ele.product_id);
      });
      let strid = id.join(" ");

      console.log(strid);
      this.$router.push({
        path: "/Pay",
        query: {
          id: strid,
        },
      });
    },
  },
  created() {
    this.llid.map((ele) => {
      console.log(ele.cart_id);
      this.cartid.push(ele.cart_id);
    });

    var list = this.cartid.join(" ");
    console.log(list);

    GetGoodsInfoFromCart({
      goodsid: list,
    }).then((res) => {
      console.log(res);
    });

    // 地址
    let i = localStorage.getItem("checkboxItem");
    if (i) {
      this.routerItem = JSON.parse(i);
    }
  },

  computed: {
    llid: function() {
      return this.$store.state.app.cart;
    },
    totel() {
      let money = 0;
      this.llid.forEach((ele) => {
        money += ele.customer_id * 1;
      });
      return money * 100;
    },
  },
  // created() {
  //   // console.log(this.llid)
  //   this.llid.map((ele) => {
  //     //  console.log('map',ele.cart_id)
  //     this.goodsIds = ele.cart_id;
  //   });

  //   // console.log("goodsId", this.goodsIds);

  //   // console.log(localStorage.getItem("checkboxItem"));
  // },
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
.location {
  width: 100%;
  margin-top: 100px;
  background: white;
}
</style>
