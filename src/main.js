// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//导入 index.js模块
import router from './router'

//按需导入Mint-UI组件
/*使用懒加载不能按需导入，要全部导入
import {Header,Swipe,SwipeItem,Button,Lazyload} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)
Vue.component(Button.name,Button)
Vue.use(Lazyload)
*/
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


//注册vuew
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站（上次数据会清空） 所以调用main.js在刚调用的时候，先从本地存储把购物车的数据读到car中
var car = JSON.parse(localStorage.getItem('car')||'[]')

var store = new Vuex.Store({
  state:{//this.$store.state.***
    car:car//将购物车中商品的数据用数组存储起来，在car数组中，存储一些商品的对象，
          //咱们可以暂时将这个商品对象设计成 
          //{id:商品id,count:要购买数量,price:商品单价,selected:false}
  },
  mutations:{//this.$store.commit('方法名称','按需传递唯一参数')
    addToCar(state,goodsinfo){
      //点击加入购物车，把商品信息，保存到store的car上
      //1.如果购物车之前就已经有这个对应商品只要更新数量
      //2.如果没有，则直接把商品数据push到car数组中

      //假设在购物车中没有找到对应的商品
      var flag =false;
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count+=parseInt(goodsinfo.count);
          flag=true;
          return true;
        }
      })
      //如果最后循环完毕得到的flag还是false 则直接把商品加入购物车
      if(!flag){
        state.car.push(goodsinfo);
      }
      //当更新car之后 把car数组存储到本地localstorage
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    updateGoodsInfo(state,goodsinfo){
      //修改购物车中商品的数量值
      //分析：
      state.car.some(item=>{
        if(item.id==goodsinfo.id){
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      })
      //当修改完商品的数量，把最新的购物车数据保存到本地存储
      localStorage.setItem('car',JSON.stringify(state.car));

    }, 
    removeFormCar(state,id){
      //根据id，从store中的购物车中删除对应的那条商品数据
      state.car.some((item,i)=>{
        if(item.id==id){
          state.car.splice(i,1);
          return true;
        }
      })
      //将删除完毕后的，最新的购物车数据，同步到本地存储中
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    updateGoodsSelected(state,info){
      state.car.some(item=>{
        if(item.id ==info.id){
          item.selected=info.selected;
        }
      });
      //把最新购物车状态保存到store中
      localStorage.setItem('car',JSON.stringify(state.car));
    }
    
  },
  getters:{//this.$store.getters.***
    //相当于计算属性也相当于filters
    getAllCount(state){
      var c = 0;
      state.car.forEach(item=>{
        c+=item.count;

      })
      return c;
    },
    getGoodsCount(state){
      var o={};
      state.car.forEach(item=>{
        o[item.id]=item.count;
      })
      return o;
    },
    getGoodsSelected(state){
      var o ={}
      state.car.forEach(item=>{
        o[item.id]=item.selected;

      });
      return o;
    },
    getGoodsCountAndAmount(state){
      var o={
        count:0,//勾选的数量
        amount:0//勾选的总件
      };
      state.car.forEach(item=>{
        if(item.selected){
          o.count+=item.count;
          o.amount+=item.price*item.count;
        }
      })
      return o;

    }
  }
})

//2.1导入vue-resource
import VueResource from 'vue-resource'
//2.2安装vue-resource
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//全局设置post时候表单数据格式组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON =true;

//导入时间插件
import moment from 'moment'
//定义全局过滤器
Vue.filter('dataFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern);
})

//导入MUI样式
import './assets/dist/css/mui.min.css'
import './assets/dist/css/icons-extra.css'


Vue.config.productionTip = false
console.log('okkkkkk')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//挂载路由对象到vm实例上
  store,//挂载store状态管理对象
  components: { App },
  template: '<App/>'
})
