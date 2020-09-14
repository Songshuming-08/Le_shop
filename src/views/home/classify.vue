<template>
  <div>
    <div class="header">商品分类</div>
    <van-search placeholder="请输入搜索关键词" @focus="goSearch" />
    <!-- 内容 -->
    <div class="wrap_content">
      <div class="wrap_content_left">
        <div
          v-for="(item,index) in left"
          :key="index"
          @click="onLeft(item.cat_id,index)"
          :class="{active:leftSel===index}"
        >{{item.cat_name}}</div>
      </div>
      <div class="wrap_content_right">
        <div class="wrap_content_right_header">
          <div
            v-for="(item,index) in isSorts"
            :key="index"
            @click="sort(index)"
            :class="{sortSel:sortIndex===index}"
          >{{item}}</div>
        </div>

        <div class="wrap_content_right_content">
          <div v-for="(item,index) in right" :key="index">
            <img :src="item.goodsLogo" alt />
            <p>{{item.goodsName}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getClassifyOne, getClassifyTwo } from "@/api/user";
export default {
  data() {
    return {
      left: [],
      right: [],
      leftSel: 0,
      isSorts: ["综合", "销量", "新品"],
      sortIndex: 0,
      sorts: true, //排序
    };
  },
  methods: {
    onLeft(id, index) {
      //左边点击事件
      console.log(id, index);

      this.leftSel = index;
      getClassifyTwo({
        //右边数据
        cat_id: id,
      }).then((res) => {
        console.log(res.data);
        this.right = res.data;
      });
    },
    sort(index) { //排序
      this.sortIndex = index;
      console.log(index);
      this.sorts = !this.sorts;
      if (index === 0) {
        this.right.sort((a, b) => {
          return this.sorts ? a.goodsId - b.goodsId : b.goodsId - a.goodsId;
        });
      } else if (index === 1) {
        this.right.sort((a, b) => {
          return this.sorts
            ? a.goodsPrice - b.goodsPrice
            : b.goodsPrice - a.goodsPrice;
        });
      } else if (index === 2) {
        this.right.sort((a, b) => {
          return this.sorts
            ? a.goodsBuyNum - b.goodsBuyNum
            : b.goodsBuyNum - a.goodsBuyNum;
        });
      }
    },
    goSearch(){
      this.$router.push('Search')
    }
  },
  mounted() {
    getClassifyOne().then((res) => {
      console.log(res.data);
      this.left = res.data;
    });



      getClassifyTwo({
        //右边数据
        cat_id: 85,
      }).then((res) => {
        console.log(res.data);
        this.right = res.data;
      });
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 100px;
  background: white;
  text-align: center;
  line-height: 100px;
  font-size: 35px;
}
.wrap_content {
  width: 100%;
  height: 76vh;
  /* background: chocolate; */
  display: flex;
}
.wrap_content_left {
  width: 250px;
  height: 100%;
  background: white;
  overflow: scroll;
}
.wrap_content_left div {
  width: 100%;
  height: 150px;
  /* border: 1px solid red; */
  text-align: center;
  line-height: 150px;
}
.wrap_content_right {
  width: 100%;
}
.wrap_content_right_header {
  width: 100%;
  height: 100px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.wrap_content_right_content {
  width: 100%;
  height: 100%;
  /* background: crimson; */
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.wrap_content_right_content div {
  width: 47%;
  height: 400px;
  overflow: hidden;

  text-overflow: ellipsis;

  display: -webkit-box;

  -webkit-box-orient: vertical;

  -webkit-line-clamp: 1;
}
.wrap_content_right_content div img {
  width: 100%;
  border-radius: 10px;
}

.active {
  border-left: 3px solid red;
  color: red;
}

.sortSel {
  color: plum;
  border-bottom: 1px solid plum;
}
</style>