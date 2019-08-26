<template>
    <div class="newsinfo-container">
        <!--大标题-->
        <h3 class="title">{{newsinfo.title}}</h3>
        <!--子标题-->
        <p class="subtitle">
            <span>发表时间：{{newsinfo.add_time|dataFormat}}</span>
            <span>点击：{{newsinfo.click}}</span>
        </p>
        <hr>
        <!--内容区域-->
        <div class="content" v-html="newsinfo.content"></div>
        <!--评论子组件区域-->
        <comment-box :id="this.id"></comment-box>
        <h1>11111111</h1>
    </div>
</template>
<script>
//1.导入评论子组件
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,//将Url地址传递来的Id值，挂载到data上，方便使用
            newsinfo:{}//新闻对象
        } 
    },
    components:{
        //用来注册子组件的
        'comment-box':comment,
    },
    
        methods:{
            getNewsInfo(){//获取新闻详情
            this.$http.get('api/getnew/'+this.id).then(result=>{
                if(result.body.status===0){
                    
                    this.newsinfo=result.body.message[0];
                   
                }else{
                    Toast("获取新闻失败");
                }
            })
                
        }
      

    },
      created(){
       
        this.getNewsInfo();
    },
}
</script>
<style lang="scss">
    .newsinfo-container{
        padding: 0 4px;
        .title{
            font-size: 16px;
            text-align: center;
            margin:15px 0;
            color:red;
        }
        .subtitle{
            font-size: 13px;
            color:#226aff;
            display: flex;
            justify-content: space-between;
        }
        .content{
            img{
                width:100%;
            }
        }
    }
</style>