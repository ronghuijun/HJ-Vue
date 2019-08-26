<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.add_time|dataFormat}}</span>
            <span>点击：{{photoinfo.click}}</span>
        </p>
        <hr>
        <!--缩略图区域-->
        <div class="thumbs">
        <vue-preview :slides="list" @close="handleClose"></vue-preview>
        </div>
        <!--图片内容区域-->
        <div class="content" v-html="photoinfo.content"></div>
        <!--放评论子组件-->
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
//导入我们的评论子组件
import comment from '../subcomponents/comment.vue'


export default {
    data(){
        return{
            id:this.$route.params.id,//从路由中获取图片id
            photoinfo:{},//图片详情
            list:[],//缩略图数组
        }
    },
     components:{//注册评论子组件
        "comment-box":comment,
    },
    
    created() {
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods: {
        getPhotoInfo(){//获取图片详情
        this.$http.get('api/getimageInfo/'+this.id).then(result=>{
            if(result.body.status===0){
                
                this.photoinfo = result.body.message[0];
            }
        })

        },
        getThumbs(){
            //获取缩略图
            this.$http.get('api/getthumimages/' + this.id).then(result=>{
                if(result.body.status===0){
                    //循环每个图片的数据，补全图片的宽和高
                    //w是预览时的大图的图片宽度，h属性是预览时的大图的图片高度。src是预览时大图的url，msrc属性是小图的url
                    result.body.message.forEach(element => {
                        element.w=600;
                        element.h=400;
                        console.log(element.src)
                        element.msrc=element.src;
                    });
                    this.list=result.body.message;
                }
            })
        }
    },
   
}
</script>

<style lang="scss" scoped>
.photoinfo-container{
    padding: 3px;
    
    .thumbs {
  /deep/ .my-gallery {
    display: flex;
    flex-wrap: wrap;
    figure {
      width: 30%;
      margin: 5px;
      img {
          margin: 10px;
          box-shadow: 0 0 8px #999;
        width: 100%;
        
      }
    }
  }
}

    h3{
        color: #26A2FF;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content:space-between;
        font-size: 13px;

    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
}
</style>