<template>
  <div>
    <div>
      <div class="swiper_wrap">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in banner" :key="index">
            <img :src="item.slide_show_imgUrl" width="100%" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    banner: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
  computed: {},
};
</script>

<style scoped></style>
