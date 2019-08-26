<template>
    <div class="shopcar-container">
        <!--商品列表项区域-->
        <div class="goods-list">
            <div class="mui-card"  v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						
                        <mt-switch 
                        v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]"
                                :goodsid="item.id"></numbox>
                                <!--问题：如何从购物车获取商品的数量
                                    1.先创建一个空对象，然后循环购物车所有商品的数据，把当前循环商品的id作为对象的属性名，count作为对象的属性值
                                    当把所有的商品循环一遍，就会得到一个对象{88：2，89：1}-->
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
        </div>
        <!--结算区域-->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价<span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
                        </div>
                         <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
            <p>{{$store.getters.getGoodsSelected}}</p>
    </div>
</template>
<script>
import numbox from '../components/subcomponents/goodsinfo_numbox.vue'
export default {
    data(){
        return{
            goodslist:[],//购物车中所有商品信息
        }
    },
   
    created() {
        this.getGoodsList();
    },
    props:['initcount'],
    methods: {
        getGoodsList(){
            //1.获取到store中所有商品的id，然后拼接出一个用逗号分隔的字符串
            var idArr = [];
           
            this.$store.state.car.forEach(item=>idArr.push(item.id));
            if(idArr.length<=0){

                //如果购物车中没有商品，则不需要请求数据，否则会报错
                return;
            }
            this.$http.get('api/goods/getshopcarlist/'+idArr.join(',')).then(result=>{
                if(result.body.status ===0){
                    
                    this.goodslist=result.body.message;
                }
            });
        },
        remove(id,index){
            //点击删除，把商品从state中根据传递的id删除，把当前组件的goodslist中index对应的商品删除
            this.goodslist.splice(index,1);
            this.$store.commit('removeFormCar',id);
        },
        selectedChange(id,val){
            //每当点击开关把最新的开关状态，同步到store中
            //console.log(id+" 55555"+val);
            this.$store.commit('updateGoodsSelected',{id,selected:val});
        }
    },
    components:{
        numbox,
    }
}
</script>
<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    
    .goods-list{
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;//三个实现换行
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            height: 60px;
            width: 60px;
            
        }
        h1{
            
            font-size: 13px;

        }
        .info{
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color: red;
                font-weight: bold;
            }
        }
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .red{
            color: red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>