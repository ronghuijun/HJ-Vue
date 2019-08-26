<template>
   
    <div class="mui-numbox" data-numbox-min='1' >
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" :value="initcount" 
                    @change="countChange" ref="numbox"/>
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
            //数量改变
        }
    }
       
    
}
</script>
<style lang="scss" scoped>

</style>