<template>
  <div>
    <div class="wrap">
      <van-search
        v-model="SearchValue"
        shape="round"
        background="#fff"
        @search="Search"
        @focus="onFocus"
        placeholder="请输入搜索关键词"
      />

      <!-- 全网热搜记录 -->
      <div class="hotbot_isShow" v-show="hotbot_isShow">
        <van-divider>全网热搜</van-divider>
        <div class="hotbot">
          <div
            class="hotbot_item"
            v-for="(item, index) in hotBot"
            :key="index"
            @click="onHotbot(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <!-- 搜索出来的内容 -->
      <div class="searchContent" v-show="searchContent_isShow">
        <div class="Tab">
          <van-tabs>
            <van-tab title="综合" name="a"></van-tab>
            <van-tab title="销量" name="b"></van-tab>
            <van-tab title="新品" name="c"></van-tab>
            <van-tab title="价格" name="c"></van-tab>
          </van-tabs>
        </div>

        <div
          class="searchContentItem"
          v-for="(item, index) in searchData"
          :key="index"
        >
          <img width="100%" :src="item.goodsLogo" alt />
          <p>{{ item.goodsName }}</p>
        </div>
      </div>
    </div>
    <!-- 搜索历史 -->
    <van-divider>搜索历史</van-divider>
    <div class="searchHistory">
      <div
        class="searchHistory_item"
        v-for="(item, index) in SearchHistory"
        :key="index"
      >
        <span>{{ item }}</span>
        <span style="red;font-size:30px" @click="delRow(index)">×</span>
      </div>
      <van-button type="info" size="large" @click="delAll">清空所有</van-button>
    </div>
  </div>
</template>

<script>
import debounce from "@/utils/tools";
// import debounce from "@/utils/untitls";
import { GetSearchHot, GetGoods } from "@/api/user";
export default {
  data() {
    return {
      SearchValue: "", //搜索
      SearchHistory: JSON.parse(localStorage.getItem("historyList")) || [], //搜索记录
      hotBot: [], //热搜记录
      hotbot_isShow: true, //热搜记录的开关
      searchData: [], //搜索粗来的数据
      searchContent_isShow: false, //搜索内容是否显示
    };
  },
  methods: {
    Search() {
      //回车搜索
      this.hotbot_isShow = false;
      this.searchContent_isShow = true;

      GetGoods({
        goodsName: this.SearchValue,
        page: 1,
        pageSize: 30,
        sortType: "syn",
      }).then((res) => {
        console.log(res.data);
        this.searchData = res.data;
      });

      this.SearchHistory.push(this.SearchValue);

      localStorage.historyList = JSON.stringify(this.SearchHistory);
    },
    onFocus() {
      //聚焦
      this.searchContent_isShow = false;
      this.hotbot_isShow = true;
    },
    onHotbot(item) {
      console.log(item);
      this.searchContent_isShow = true;
      // this.hotbot_isShow = false;

      //点击全网热搜
      debounce(() => {
        GetGoods({
          goodsName: item,
          page: 1,
          pageSize: 30,
          sortType: "syn",
        }).then((res) => {
          console.log(res.data);
          this.searchData = res.data;
        });

        // this.SearchValue = item;
      }, 2000);
    },
    delRow(index) {
      //删除一行
      this.SearchHistory.splice(index, 1);
      localStorage.historyList = JSON.stringify(this.SearchHistory);
    },
    delAll() {
      //删除所有历史记录
      this.SearchHistory = [];
      localStorage.historyList = JSON.stringify(this.SearchHistory);
    },
  },
  watch: {
    //监听Search框的值,如果长度大于0 进行搜索(用于点击热搜记录)
    // SearchValue(newval) {
    //   this.searchContent_isShow = true;
    //   this.hotbot_isShow = false;
    //   if (newval.length > 0) {
    //     this.searchData = [];
    //     GetGoods({
    //       goodsName: this.SearchValue,
    //       page: 1,
    //       pageSize: 30,
    //       sortType: "syn",
    //     }).then((res) => {
    //       console.log(res.data);
    //       this.searchData = res.data;
    //     });
    //   }
    // },
  },
  created() {
    GetSearchHot().then((res) => {
      //热搜词

      this.hotBot = res.data;
    });
  },
};
</script>

<style scoped>
.wrap {
  margin-top: 100px;
  background: white;
}
.hotbot {
  width: 100%;
  height: 300px;
  border: 1px solid #eee;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 50px 80px;
  box-sizing: border-box;
}

.hotbot_item {
  margin: 0px 30px;
  border: 1px solid #eee;
  background: white;
}
.searchContent {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.searchContentItem {
  width: 47%;
  height: 500px;
  border: 1px solid blanchedalmond;
}
.Tab {
  width: 100%;
  height: 100px;
  background: white;
}
.searchHistory {
  width: 100%;
}
.searchHistory_item {
  width: 100%;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
