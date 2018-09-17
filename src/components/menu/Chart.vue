<template>
<div>
   <div id="header">
    <div class="left">
   <i  v-show="isrotate1"  class="fa fa-bars fa-2x fa-rotate-90" aria-hidden="true"  style="color: #606266;"  @click="rotate1()"></i>
   <i  v-show="isrotate2"  class="fa fa-bars fa-2x " aria-hidden="true"  style="color: #606266;"  @click="rotate2()"></i>
     <el-breadcrumb separator="/" >
  <el-breadcrumb-item ><a  @click="routeshouye()">首页</a></el-breadcrumb-item>
  <el-breadcrumb-item>订单统计图</el-breadcrumb-item>
  </el-breadcrumb>
    </div>
  <div class="right">
      <i class="el-icon-rank"  title="全屏"></i>
      <el-dropdown class="faceAndMenu">
        <span class="el-dropdown-link">
          <div class="face">
            <i class="iconfont icon-user"></i>
          </div>
          <span class="username">sdfsdfsdf</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="center"><router-link tag="li" to="adminadd">个人中心</router-link></el-dropdown-item>
          <el-dropdown-item command="logout"><a  @click="logout()">退出登陆</a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>


    <div  id="myChart"   :style="{width: '300px', height: '300px'}"></div>
    </div>
</template>
<script>
export default {
  name: 'hello',
  data () {
    return {
       isrotate1:false,
        isrotate2:true,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    logout(){
     this.$router.push({  
           path:'/',
          });
      },
    rotate1(){//打开侧边栏
      this.isrotate1=false;//使旋转的消失
      this.isrotate2=true;//使不旋转的出现
      },
      rotate2(){//收起侧边栏
      this.isrotate2=false;
      this.isrotate1=true;
      },
      routeshouye(){
        this.$router.push({  
           path:'/shouye',
          });
      },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '图' },
            tooltip: {},
            xAxis: {
                data: ["1","2","33","44","55","6"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
  }
}
</script>

<style  scoped>
#header .icon, #header .left .icon-menu, #header .right .el-icon-rank {
    font-size: 24px;
    transition: 0.2s all ease-in-out;
    cursor: pointer;
    color: #606266;
}

.icon-menu:before {
    content: "\e7f4";
}


#header{
  display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: 60px;
    display: flex;
    box-shadow: 0 2px 1px 1px rgba(100,100,100,0.1);
    padding: 0 20px;
    margin-bottom:10px; 

}
#header>div {
    
    display: flex;
    align-items: center;
}
.el-breadcrumb{
    margin-left: 30px;
}
.username{
  cursor: pointer;
}
</style>
