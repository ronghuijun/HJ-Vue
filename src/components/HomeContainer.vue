<template>
    <div>
        <!--轮播图区域-->
       <swiper :lunbotuList="this.lunbotuList" :isfull="true"></swiper>

        <!--九宫格到六宫格改造-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                            <router-link to="home/newslist">
                            <img src="..\assets\images\menu1.png">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		                    <router-link to="home/photolist">
                            <img src="..\assets\images\menu2.png">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <router-link to="home/goodslist">
		                    <img src="..\assets\images\menu3.png">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="..\assets\images\menu4.png">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="..\assets\images\menu5.png">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="..\assets\images\menu6.png">
		                    <div class="mui-media-body">联系我们</div></a></li>
		          
		        </ul> 
        <h3>
            HomeContainer

        </h3>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
import swiper from '../components/subcomponents/swiper.vue'


export default {
    data(){
        return{
            lunbotuList:[]//保存轮播图数组
        }
    },
    created() {
        this.getLunbotu();
    },
    components:{
        swiper,
    },
    methods:{
        getLunbotu(){//获取轮播图的数据
    
            this.$http.get('api/getLunbo').then(result=>{
                
                if(result.body.status ===0){
                    this.lunbotuList = result.body.message;
                    
                }else{
                    //失败了
                    Toast('加载轮播图失败');

                }
            })

        }
    }
}
</script>
<style lang="scss" scoped>

.mui-grid-view.mui-grid-9{
    background-color: white;
    border:none;
    img{
        width: 60px;
        height: 60px;
    }
    mui-media-body{
        font-size: 13px;
    }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border:0;
}

</style>