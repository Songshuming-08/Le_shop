<template>
  <div>
    <div>
      <!-- <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checked" @click="ok">全选</van-checkbox>
        <template #tip>
          你的收货地址不支持同城送,
          <span @click="onClickEditAddress">修改地址</span>
        </template>
      </van-submit-bar> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
      cartid: [],
    };
  },
  methods: {
    // onSubmit() {
    //   this.$router.push({
    //     path: "/confirm",
    //   });
    // },
     
    // ok() {
    //   console.log(this.checked);
    //   this.$store.dispatch("All_CHECKED", this.checked);
    // },
  },
  created() {},
  mounted() {
    // console.log(this.id);
    // console.log(this.cartid)
  },
  computed: {
    // id: function () {
    //   return this.$store.state.app.cart;
    // },
  },
};
</script>

<style scoped></style>
