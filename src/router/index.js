import Vue from 'vue'
import Router from 'vue-router'

//导入对应的路由组件
import HomeContainer from '@/components/HomeContainer.vue'
import MemberContainer from '@/components/MemberContainer.vue'
import SearchContainer from '@/components/SearchContainer.vue'
import ShopcarContainer from '@/components/ShopcarContainer.vue'
import NewsList from '@/components/news/NewsList.vue'
import NewsInfo from '@/components/news/NewsInfo.vue'
import PhotoList from '@/components/photos/PhotoList.vue'
import PhotoInfo from '@/components/photos/PhotoInfo.vue'
import GoodsList from '@/components/goods/GoodsList.vue'
import GoodsInfo from '@/components/goods/GoodsInfo.vue'
import GoodsDesc from '@/components/goods/GoodsDesc.vue'
import GoodsComment from '@/components/goods/GoodsComment.vue'

Vue.use(Router)

export default new Router({
  routes: [//路由规则
    {path:'/',redirect:'/home'}, 

    {path:'/home',component:HomeContainer},
    {path:'/search',component:SearchContainer},
    {path:'/member',component:MemberContainer},
    {path:'/shopcar',component:ShopcarContainer},
    {path:'/home/newslist',component:NewsList},
    {path:'/home/newsinfo/:id',component:NewsInfo},
    {path:'/home/photolist',component:PhotoList},
    {path:'/home/photoinfo/:id',component:PhotoInfo},
    {path:'/home/goodslist',component:GoodsList},
    {path:'/home/goodsinfo/:id',component:GoodsInfo,name:'goodsinfo'},
    {path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc'},
    {path:'/home/goodscomment/:id',component:GoodsComment,name:'goodscomment'},

  ],
  linkActiveClass:'mui-active'//覆盖默认路由高亮的类，默认的类叫router-link-active
})
