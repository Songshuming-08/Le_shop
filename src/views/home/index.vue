<template>
  <div>
    <!-- 返回顶部按钮 -->
    <div class="backTop" @click="back" v-show="isShow">
      <van-icon name="arrow-up" size="45px" />
    </div>

    <!-- 头部 -->
    <div class="header_logo">
      <img src="../../assets/img/home/LE_logo_2.png" width="240px" alt="" />
    </div>
    <!-- 搜索框 -->
    <van-search @focus="goSearch" placeholder="请输入搜索关键词" />
    <!-- 轮播图 -->

    <Swiper :banner="banner" />
    <!-- 轮播图 -->

    <!-- 九宫格 -->
    <div class="sudoku">
      <div class="sudoku_item" v-for="(item, index) in sudoku" :key="index">
        <img :src="item.sp_home_ico" width="65px" alt="" />
        <p>{{ item.sp_home_title }}</p>
      </div>
    </div>
    <!-- tab标签页 -->
    <div class="tab">
      <van-tabs
        sticky
        color="#FE5776"
        title-active-color="#FE5776"
        @change="changeGoods"
      >
        <van-tab v-for="(item, index) in tab" :title="item" :key="index">
        </van-tab>
      </van-tabs>
    </div>
    <!-- 商品列表 -->
    <div class="goods_wrap">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="goods_box">
            <div
              class="goods_wrap_item"
              v-for="(item, index) in goods"
              :key="index"
              @click="goDetails(item.goodsId)"
            >
              <img v-lazy="item.goodsLogo" width="100%" alt="" />
              <p>{{ item.goodsName }}</p>
              <p>
                原价 <s>{{ item.goodsOldPrice }}</s>
              </p>
              <p>
                现价:<span style="color:red;">{{ item.goodsPrice }}</span>
              </p>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import Swiper from "@/components/swiper/Swiper"; //项目优化  轮播公共组件
//请求接口
import { getHomeData, HomeShowGoods } from "@/api/user";
import axios from "axios";
export default {
  components: {
    Swiper,
  },
  data() {
    return {
      banner: [], //轮播图
      sudoku: [], //九宫格
      goods: [], //商品列表
      tab: ["流行", "新款", "精选"],
      isShow: false, //返回按钮是否显示
      types: ["syn", "new", "sell"],
      loading: false,
      finished: false,
      refreshing: false,
    };
  },
  methods: {
    goSearch() {
      this.$router.push("Search");
    },
    goDetails(id) {
      // console.log(id)
      this.$router.push({
        path: "/Details",
        query: {
          id: id,
        },
      });
    },
    changeGoods(index) {
      HomeShowGoods({ sortType: this.types[index], page: 1 }).then((res) => {
        console.log(res.data);
        this.goods = res.data;
      });
    },
    back() {
      $("html")
        .stop()
        .animate(
          {
            scrollTop: 0,
          },
          1000
        );
    },
    listenerFunction(e) {
      document.addEventListener("scroll", this.handleScroll, true);
    },

    handleScroll() {
      if (window.pageYOffset > 200) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    onLoad() {
      //下拉加载
      setTimeout(() => {
        if (this.refreshing) {
          this.goods = [];
          this.refreshing = false;
        }

        this.goods.push(...this.goods);

        this.loading = false;

        if (this.goods.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      //下拉加载
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
  mounted() {
    this.listenerFunction(); //滑动到200显示返回顶部按钮

    getHomeData()
      .then((res) => {
        // console.log(res.data[1]);
        this.sudoku = res.data[0]; //九宫格
        this.banner = res.data[1]; //轮播图
      })
      .catch(() => {});

    // let params = { sortType: "syn", page: 1 };
    HomeShowGoods({ sortType: "syn", page: 1 }).then((res) => {
      // console.log(res.data);
      this.goods = res.data;
    });
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.listenerFunction);
  },
};
</script>

<style scoped>
.goods_box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.backTop {
  width: 100px;
  height: 100px;
  background: #eee;
  position: fixed;
  bottom: 100px;
  right: 50px;
  z-index: 1000;
  text-align: center;
  line-height: 100px;
}

.header_logo {
  background: white;
  width: 100%;
  height: 100px;
  text-align: center;
}
.sudoku {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background: white;
}
.sudoku_item {
  text-align: center;
  font-size: 30px;
}
.tab {
  width: 100%;
}
.goods_wrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 300px;
}
.goods_wrap_item {
  width: 47%;
  height: 600px;
  margin-top: 30px;
  background: white;
}
.tab {
  position: sticky;
  top: 0px;
}
</style>
