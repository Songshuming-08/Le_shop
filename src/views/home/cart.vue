<template>
  <div>
    <MyCartHeader
      center="购物车"
      right="管理"
      @backs="backs"
      :cartNum="this.$store.state.app.cart.length"
    ></MyCartHeader>





    <MyCommodityCard />
    <MySubmitOrder />
  </div>
</template>

<script>
import CartHeader from "@/components/cart/CartHeader"; //购物车头部  ======>项目优化
import SubmitOrder from "@/components/cart/SubmitOrder"; //购物车头部
import CommodityCard from "@/components/cart/CommodityCard"; //购物车头部
export default {
  data() {
    return {
      num:8888
    };
  },
  methods: {
    backs() {
      window.history.back();
    },
  },
  computed: {},
  mounted() {},
  components: {
    MyCartHeader: CartHeader,
    MySubmitOrder: SubmitOrder,
    MyCommodityCard: CommodityCard,
  },
};
</script>

<style scoped></style>
