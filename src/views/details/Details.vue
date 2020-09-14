<template>
  <div>
    <div class="header">
      <van-icon size="26px" name="arrow-left" @click="back" />
      <span
        v-for="(item,index) in headers"
        :key="index"
        @click="onScllo(index)"
        :class="{active:sel === index}"
      >{{item}}</span>
    </div>
    <div>
      <img width="100%" :src="content1.topImages" alt />
      <p style="font-size:18px;">{{content1.goodsName}}</p>
      <p>
        <span style="color:#FF90A5;font-size:20px;">￥{{content1.goodsPrice}}</span>
        <s>{{content1.goodsOldPrice}}</s>
      </p>
    </div>
    <!-- 销量 -->
    <div class="xiaoliang">
      <div>销量{{content1.num}}</div>
      <div>收藏{{content1.goodsFav}}</div>
      <div>{{content1.goodsAre}}</div>
    </div>
    <van-divider />
    <!-- 延迟必陪 -->
    <div class="yanchibipei">
      <div v-for="(item,index) in icondata" :key="index">
        <img :src="item.icon" width="20px" alt />
        <span>{{item.name}}</span>
      </div>
    </div>
    <div class="comment">
      <div>买家评价</div>
      <div>更多</div>
    </div>
    <van-divider />
    <!-- 评论区 -->
    <div class="comment2">
      <div class="comment2_content">
        <!-- <div v-for="(item,index) in img1" :key="index">
          <img :src="item" alt />
        </div>-->
        <div>
          <div>
            <img :src="pinglun.user_img" width="100px" alt />
          </div>
          <p>{{pinglun.content}}</p>
          <p>{{content2.creteTime}}</p>
        </div>
      </div>
    </div>

    <div class="merchant">
      <div>
        <p>
          {{content2.shopName}}
          <img
            style="border-radius: 50%;"
            :src="content2.shopLogo"
            width="20px"
            alt
          />
        </p>

        <p>{{content2.shopCpy}}</p>
        <p>{{content2.shopAre}}</p>
      </div>

      <div>
        <p>描述相符{{pinglun.fwvalue}}</p>
        <p>价格合理{{pinglun.msvalue}}</p>
        <p>质量满意{{pinglun.wlvalue}}</p>
      </div>
    </div>

    <div class="myhtml" v-html="content1.goodsIntroduce"></div>

    <!-- 购物车 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" @click="goCart" text="购物车" :badge="cartNum" />
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
      <van-goods-action-button type="warning" @click="adCart" text="加入购物车" />
      <van-goods-action-button type="danger" @click="purchase" text="立即购买" />
    </van-goods-action>

    <!-- <van-cell is-link @click="showPopup">展示弹出层</van-cell> -->
    <van-popup v-model="show">添加购物车成功！</van-popup>
  </div>
</template>

<script>
import { getDetailsData, getUserCart, addCart } from "@/api/user";

export default {
  data() {
    return {
      headers: ["商品", "评论", "详情", "推荐"],
      content1: {},
      icondata: [],
      content2: {},
      sel: 0,
      cartNum: 0,
      img1: [],
      pinglun: [],
      show: false,
    };
  },
  methods: {
    purchase() {},
    back() {
      window.history.back();
    },
    onScllo(index) {
      this.sel = index;
    },
    goCart() {
      this.$router.push({
        path: "/cart",
        query: {
          id: this.$route.query.id,
        },
      });
    },
    adCart() {
      // console.log(this.$route.query.id)
      //加购
      addCart({
        product_id: this.$route.query.id,
      }).then((res) => {
        console.log(res);

        if (res.code == 201) {
          this.show = true;
        }

        setTimeout(() => {
          this.show = false;
        }, 1000);
      });

      //获取
      getUserCart({
        page: 1,
        pageSize: 30,
      }).then((res) => {
        console.log(res);
        this.$store.dispatch("getCart", res.data);
        this.cartNum = res.data.length;
      });
    },
  },
  mounted() {
    // let id = this.$route.query.id;
    getDetailsData({
      goodsId: this.$route.query.id,
    }).then((res) => {
      console.log(res.data[0]);
      // console.log(res.data[3][1].comment_body);
      this.content1 = res.data[0];
      this.content2 = res.data[1];
      this.content3 = res.data[3][0];
      this.icondata = res.data[2]; //no
      this.img1 = res.data[3][1].comment_img;
      this.pinglun = res.data[3][1].comment_body;
    });
  },
};
</script>

<style scoped>
.comment2_content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0px 100px;
}
.cart {
  position: relative;
}
.addcart {
  width: 200px;
  height: 100px;
  background: yellow;
  line-height: 100px;
}
.addcartNum {
  position: absolute;
  top: -70px;
  right: -20px;
  display: block;
  width: 30px;
  height: 30px;
  background: red;
  border-radius: 50%;
}
.purchase {
  width: 150px;
  height: 100px;
  background: violet;
  line-height: 100px;
}
.footer {
  width: 100%;
  height: 110px;
  background: white;
  position: fixed;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
.active {
  color: plum;
}
.header {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
  position: fixed;
  top: 0px;
  margin-bottom: 100px;
}
.header span {
  font-size: 30px;
}
.myhtml {
  margin-top: 100px;
}
.myhtml >>> img {
  width: 100%;
}

.xiaoliang {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.yanchibipei {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.yanchibipei img {
  vertical-align: middle;
}
.merchant {
  width: 100%;
  height: 300px;
  /* background: rgb(7, 195, 241); */
  display: flex;
  justify-content: space-around;
}

.comment {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 50px;
  box-sizing: border-box;
}
.comment2 {
  width: 100%;
  height: 300px;
  /* background: palevioletred; */
}
.comment2 div img {
  width: 100px;
  /* border-radius: 60px; */
}
</style>
