# vue-cms

> A Vue.js project

## Build Setup

###制作首页App组件
1.完成Header区域，使用的是Mint-UI的Header组件
2.制作底部的Tabbar区域，使用的是MUI的Tabba.html
    2.1在制作我们购物车小图标的时候，操作相对多:
       +先把拓展图标css样式考到项目中MUI
       +拷贝我们拓展字体库ttf文件，到项目中
       +在main中 引用css的文件
       +为购物车小图标添加样式
3.要在中间区域放置一个router-view来展示路由匹配到的组件

##改造tabbar为router-link

##设置路由高亮

##点击tabbar中的路由链接，展示对应的路由组件

##制作首页轮播图布局

##加载首页轮播图数据
1.获取数据，然后获取数据，使用vue-resource
2.使用vue-resource的this.$http.get获取数据
3.获取到的数据，要保存到data上
4.使用v-for循环渲染每个item项

##改造九宫格区域的样式

##构造新闻资讯路由文件

##新闻资讯页面制作
1.绘制界面，使用Mui中的media-list.html
2.使用vue-resource获取数据
3.渲染真实数据

##实现新闻资讯列表点击跳转到新闻详情
1.把列表中的每一项改造为router-link，同时在跳转的时候应该提供唯一的id标识符
2.创建新闻详情组件页面 NewInfo.vue
3.在路由模块中，将新闻详情的路由地址和组件页面对应起来

##实现新闻详情的页面和数据渲染


##单独封装一个comment.vue评论子组件
1.先创建一个单独的comment.vue组件模板
2.在需要使用comment组件的页面中，手动导入comment组件
 +'import comment from './comment.vue'
3.在父组件中，使用components属性，将刚才导入的comment组件，注册为自己的子组件
4.将注册子组件时候的，注册名称以标签的形式在页面中引用即可

##获取所有的评论数据显示到页面


##实现点击加载更多评论的功能
1.为加载更多按钮，绑定点击事件，在事件中请求下一页数据
2.点击加载更多让pageIndex++，重新调用this.getComments方法，重新获得最新一页数据
3.为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候，每当获取到新数据，应该让老数据调用
    数组的concat方法，把新数据拼接上老数据

##发表评论
1.把文本框，做双向数据绑定
2.为方便按钮绑定事件
3.校验评论内容是否为空，如果为空，Toast提示用户，评论内容不能为空
4.提供vue-resource发表一个请求，把评论内容提交给服务器
5.当发表评论好了后，重新刷新列表，以查看最新的评论
    +如果调用getComments方法重新刷新评论列表的话，可能只能得到最后一页的评论，前几页获取不到
    +换一种思路：当评论成功后，在客户端手动拼接出最新的评论对象，然后调用数组的unshift方法，把最新的评论
     加载到data中comments的开头，注意就实现刷新列表评论需求

##改造图片分享按钮为路由的链接并显示对应的组件页面

##绘制图片列表组件页面结构并美化样式
1.制作顶部的滑动条
2.制作底部的图片列表
###制作顶部滑动条
1.需要借助于MUI中的tab-top-webview-main-html
2.需要把slider区域的mui-fullscreen类去掉
3.滑动条无法触发滑动，提供检查官方文档，发现这是js组件要被初始化
    +导入js组件
    +调用官方提供的方式初始化
    mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
4.我们在初始化滑动条的时候导入了mui.js,但是控制台报错
    Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
    经过我们合理推测，觉得可能是mui.js用到了 'caller', 'callee', and 'arguments' ，但是webpack打包好多build.js，默认启用严格模式，所有冲突了
    +解决方案：1.把mui.js中的非严格模式的代码改掉，但是不现实
              2.把webpack打包时候的严格模式禁用
    +严格模式禁用过程见博客
5.刚进入图片分析页面的时候，滑动条无法正常工作，经过我们认真分析，发现如果要初始化滑动条，必须要等Dom元素初始完毕，所有我们把初始化滑动条的代码搬到mounted生命周期函数
6.当滑动条调试ok后，发现tabbar无法正常工作了，这时候我们需要把每个tabbar样式中'mui-tab-item'重新改名
7.获取所有分类，并渲染分类列表

###制作图片列表区域
1.图片列表需要使用懒加载技术，我们可以使用Mini-ui提供的现成的组件lazy-load
2.根据lazy-load使用文档，尝试使用
3.渲染图片列表数据

###实现图片列表的懒加载改造和样式美化

##点击图片跳转到了图片详情页面
1.在改造li成router-link时需要使用tag标签指定要渲染为哪种元素

##实现详情页面的布局和美化，同时获取数据渲染页面

##实现图片详情的缩略图功能
1.使用vue-preview这个缩略图插件
2.获取到所有的图片列表，然后使用v-for指令渲染
3.img上的class属性不能去掉
4.每个图片数据对象必须有w和h属性

##绘制商品列表页面

##尝试在手机上进行项目预览和测试
1.保证手机和开发项目电脑处于同一个wifi环境中，也就是说手机可以访问到电脑ip
2.打开自己的项目中package.json文件在dev脚本添加--host指令，把当前电脑主机wifi ip地址设为--host指令值
    +然后查看自己电脑wifi的ip，在cmd运行ipconfig

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
