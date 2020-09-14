// 按需全局引入 vant组件
import Vue from 'vue'
import {
  Divider,
  Button, List, Icon,
  Cell, Tabbar, TabbarItem, Search,
  Swipe, Field, Form, Lazyload, SwipeItem,
  Tab, Tabs,
  GoodsAction, GoodsActionIcon, GoodsActionButton,
  SubmitBar,
  Checkbox, CheckboxGroup,
  SwipeCell,
  Card,
  Dialog,
  Popup,
  NavBar,
  RadioGroup, Radio,
  PasswordInput, NumberKeyboard

} from 'vant'
Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(Swipe).use(SwipeItem)
Vue.use(Search)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Lazyload)
Vue.use(Form)
Vue.use(Field)
Vue.use(Divider)
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(SubmitBar);
// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true,
});
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(SwipeCell);
Vue.use(Card);
Vue.use(Dialog);
Vue.use(Popup);
Vue.use(NavBar);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(NumberKeyboard);
Vue.use(PasswordInput);



