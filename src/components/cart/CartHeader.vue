<template>
  <div>
    <div class="header">
      <div>
        <van-icon name="arrow-left" size="23px" @click="back" />
      </div>
      <div>{{ center }}({{ cartNum }})</div>
      <div>{{ right }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    center: {
      type: String,
    },
    right: {
      type: String,
    },
    cartNum: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  methods: {
    back() {
      //返回
      this.$emit("backs");
    },
  },
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
