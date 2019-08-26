<template>
    <div>

          <mt-swipe :auto="4000">
            <!--在组件中使用v-for循环一定要使用key-->
            <!--将来谁使用此轮播图组件 谁为我们传递lunbotuList-->
            <!--此时应该父组件向子组件传值来设置-->
            <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
                <img :src="item.img" alt="" :class="{full:isfull}">
            </mt-swipe-item>
           
        </mt-swipe>
    </div>
    <!--分析:为什么商品评论的轮播图怎么丑-->
    <!--首页中的图片，宽和高都使用100%-->
    <!--在商品详情页面中，轮播图的图片如果也使用宽和高100%，页面不好看-->
    <!--商品详情页面的轮播图，期望高度100%，宽度自适应-->
    <!--经过分析：首页的轮播图和详情的轮播图 分歧点宽度到底是百分百还是自适应-->
    <!--既然这两个轮播图其他方面没有冲突，这是宽度，那么我们可以定义一个属性，让适用轮播图的调用者手动指定是否为100%-->
</template>

<script>
export default {
    props:["lunbotuList","isfull"]
}
</script>

<style lang="scss" scoped>
.mint-swipe{
    height: 200px;

    .mint-swipe-item{
        text-align: center;
       
        img{
           
            height: 100%;
        }
    }
}
.full{
    width: 100%;
}
</style>