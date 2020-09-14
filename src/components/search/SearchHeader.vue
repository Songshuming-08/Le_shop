<template>
  <div>
    <div>
         <div class="header">
      <div>
        <van-icon name="arrow-left" size="23px" @click="back" />
      </div>
      <div>商品搜索</div>
      <div></div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
      back(){
          window.history.back()
      }
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
</style>