<template>
    <!--我们不知道什么时候会拿到max值 但总是会拿到
        我们可是使用watch属性监听来监听父组件传递来的max值 不管watch会被触发几次，最后一次肯定是合法数据-->
    <div class="mui-numbox" data-numbox-min='1' style="height:25px">
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" :value="initcount" 
                    @change="countChange" ref="numbox" readonly/>
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
                <!--分析：子组件什么时候把值传递给父组件-->
</template>
<script>
import mui from '../../assets/dist/js/mui.min.js'
export default {
    mounted() {
        //初始化数字选择框组件
        mui(".mui-numbox").numbox();
    },
    methods: {
        countChange(){
            
            //console.log(this.$refs.numbox.value)
            //每当数量值改变，则立即把最新数量同步到购物车的store中覆盖之前的
            this.$store.commit('updateGoodsInfo',{id:this.goodsid,count:this.$refs.numbox.value});
        }
    },
    props:['initcount','goodsid'],
    watch:{
        'max':function(newVal,oldVal){
            mui(".mui-numbox").numbox().setOption('max',newVal);
            
        }
    }
}
</script>
<style lang="scss" scoped>

</style>