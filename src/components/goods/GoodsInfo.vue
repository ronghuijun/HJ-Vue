<template>
    <div class="goodsinfo-container">
        <transition 
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
        <div class="ball" v-show="ballflag" ref="ball"></div>
        </transition>
        
        <!--商品轮播图区域-->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbotuList="lunbotu" :isfull="false"></swiper>

					</div>
				</div> 
        </div>
        <!--商品购买区域-->
        <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：
                            <span class="now_price">￥{{goodsinfo.sell_price}}</span>
                            </p>
                            <p>购买数量：<numbox @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                            <p>
                                <mt-button type="primary" size="small">立即购买</mt-button>
                                <mt-button type="danger" size="small" @click="addToShopCar">进入购物车</mt-button>
                                <!--分析如何实现加入购物车后 拿到选择的数量
                                    1.经过分析发现 按钮属于goodsinfo页面，数字属于number组件
                                    2.由于涉及到父子组件的嵌套，所以无法直接在goodsinfo页面中取得选中商品的数量值
                                    3.解决：子组件向父组件传值 事件调用机制 父向子传递方法，同时把数据当作参数传递给这个方法-->
                            </p>
                        
				    </div>
				</div>
			</div>
        <!--商品参数区域-->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<P>商品货号：{{goodsinfo.goods_no}}</p>
						<P>库存情况：{{goodsinfo.stock_quantity}}件</p>
						<P>上架时间：{{goodsinfo.add_time|dataFormat}}</p>

					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品详情</mt-button>

                    
                </div>
			</div>
            <p>111</p>
    </div>
</template>
<script>
//导入轮播图
import swiper from '../subcomponents/swiper.vue'
//导入 数组选择框组件
import numbox from '../subcomponents/goodsinfo_numbox.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,//将路由参数上的id挂到data上，方便后期调用
            lunbotu:[],//轮播图的数据
            goodsinfo:{},//获取到的商品信息
            ballflag:false,//控制小球的隐藏和显示
            selectedCount:1,//保存用户选中的商品数量，默认认为用户买一个
        }
    },
    created() {
        this.getLunbotu();
        this.getGoodsInfo();
    },
    components:{
        swiper,numbox,
    },
    methods: {
        getLunbotu(){
            this.$http.get('api/getthumimages/' + this.id).then(result=>{
                if(result.body.status===0){
                    //先循环轮播图数组每一项，为item添加img属性，因为我们之前写的轮播图组件中只认识item.img，不认识item.src
                    result.body.message.forEach(element => {
                        element.img=element.src;
                    });
                    this.lunbotu=result.body.message;
                }
            })
        },
        getGoodsInfo(){
            //获取商品信息
            this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                if(result.body.status===0){
                    this.goodsinfo = result.body.message[0];
                }
            });
        },
        goDesc(id){
            //点击使用编程式导航跳转图文介绍
            this.$router.push({name:"goodsdesc",params:{id}});
        },
        goComment(id){
            //点击跳转到评论页面
            this.$router.push({name:"goodscomment",params:{id}});
        },
        addToShopCar(){
            this.ballflag=!this.ballflag;
            //{id:商品id,count:要购买数量,price:商品单价,selected:false}
            //拼接出一个要保存到store中car的商品信息
            var goodsinfo = {
                id:this.id,
                count:this.selectedCount,
                price:this.goodsinfo.sell_price,
                selected:true}
                //调用store中的mutations来将商品加入购物车
                this.$store.commit("addToCar",goodsinfo)
        },
        beforeEnter(el){
            el.style.transform="translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;
            //小球动画优化思路 
            //1.分析导致小球动画不准确的原因 我们把小球动画位置局限在某分辨率下滚动的情况
            //2.只要分辨率和测试时不同，或者滚动条有一定滚动距离 问题就出现了
            //3.因此 我们得出不能把位置的横纵坐标写死 而是根据不同情况动态计算这个坐标值
            //4.思路：先得到徽标的横纵坐标在得到小球的横纵坐标，让y值，x值求差，得到就是横纵坐标要位移的距离
            //5.如何获取徽标和小球的位置domObject.getBoundingClientRect()

            //获取小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            //获取徽标在页面的位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect();

            const xDist = badgePosition.left-ballPosition.left;
            const yDist = badgePosition.top-ballPosition.top;
            
            el.style.transform=`translate(${xDist}px, ${yDist}px)`;
            el.style.transition="all 0.5s cubic-bezier(.1,-0.3,1,.68)";
            done()
        },
        afterEnter(el){
            this.ballflag=!this.ballflag;
        },
        getSelectedCount(count){
            //当子组件把选中的数量传递给父组件的时候，把选中的值保存到data上
            this.selectedCount = count;
            //alert('父组件拿到的数量值为' + this.selectedCount)
        },
        

    },
}
</script>
<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
    .now_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top:390px;
        left: 146px;
    }
}
.mui-card-footer{
    display: block;
    button{
        margin: 15px 0;
    }
    
}
</style>