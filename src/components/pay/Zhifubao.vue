<template>
<div>
  <div>支付宝</div>
  <!-- <div v-html="zhifubao"></div> -->
  {{zhifubao}}
</div>
</template>

<script>
export default {
 data() {
 return {
 };
 },
 methods:  {},
 created() {},
 mounted() {},
 computed: {
     zhifubao:function(){
         return this.$store.state.app.zhibaoData
     }
 },
};
</script>

<style scoped>

</style>