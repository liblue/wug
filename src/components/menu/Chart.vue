<template>
<div  class="chart">
   <div id="header">
    <div class="left">
   <i  v-show="isrotate1"  class="fa fa-bars fa-2x fa-rotate-90" aria-hidden="true"  style="color: #606266;"  @click="rotate1()"></i>
   <i  v-show="isrotate2"  class="fa fa-bars fa-2x " aria-hidden="true"  style="color: #606266;"  @click="rotate2()"></i>
     <el-breadcrumb separator="/" >
  <el-breadcrumb-item ><a  @click="routeshouye()">首页</a></el-breadcrumb-item>
  <el-breadcrumb-item><a>统计图</a></el-breadcrumb-item>
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
          <el-dropdown-item command="logout"><a  @click="logout()">退出登录</a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>

    <div class="block"  >
       <!-- <span class="demonstration">选择日期</span> -->


<el-input v-model="input" placeholder="请输入员工ID"  style="width:14%"></el-input>
  <el-select v-model="reason" placeholder="请选择" >
    <el-option
      v-for="item in reasons"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

    <el-date-picker
      v-model="value4"
      type="month"
      placeholder="选择月">
    </el-date-picker>
    <el-button type="primary" @click="onSubmit">生成图表</el-button>
  </div>

    <div class="tuchart">
    <div  id="myChart"  :style="{width: '85%', height: '750px'}">
    <!-- <div  id="myChart"  :style="{width: '20%', height: '800px'}"> -->
    </div>
    <!-- <div  id="YChart" >22222</div> -->
    </div>
    </div>
</template>
<script>
import eventBus from '../../assets/eventBus.js'
export default {
  name: 'hello',
  data () {
    return {
       value4:'',
       isrotate1:false,
       isrotate2:true,
       tableData:[],
       tableData1:[],
       reason:'',
       shuzi:'',
       input:'',
       reasons: [
          {
          value: 'all',
          label: '全部'
        }, {
          value: 'normal',
          label: '正常完成'
        }, {
          value: 'disabled',
          label: '异常完成'
        }, {
          value: 'closed',
          label: '关闭订单'
        }],
       option1:{
            title: { 
              text: ''
              },
            tooltip: {
               trigger: 'axis'
            },
            legend: {
               data:['数量','降水量']
          },
            toolbox: {
            show : true,
            feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
            calculable : true,
            xAxis: {
                data: ["1","2","3","4","5","6",'7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
            },
            yAxis: {},
            series: [{
                name: '数量',
                type: 'bar',
                data: [],
               
            }],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        }
    }
  },
  mounted(){
    this.drawLine();
    this.getdata();

  },
  created(){
  this.getdata();
  },
  methods: {
    logout(){
     this.$router.push({  
           path:'/',
          });
      },
      rotate1(){//打开侧边栏
      eventBus.$emit('myfun','open')
      this.isrotate1=false;//使旋转的消失
      this.isrotate2=true;//使不旋转的出现
      },
      rotate2(){//收起侧边栏
      eventBus.$emit('myfun','close')
      this.isrotate2=false;
      this.isrotate1=true;
      },
      routeshouye(){
        this.$router.push({  
           path:'/shouye',
          });
      },
      onSubmit(){
      this.option1.series[0].data=this.tableData;
       this.getdata();
       this.drawLine()
      },
      getdata(){
        var vm=this; 
        vm.$http.get('http://www.wug.com/api/orderchart',{
              params:{
              date:vm.value4,
              userid:vm.input,
              reason:vm.reason,
              }
        }).then((res)=> {
         vm.tableData=res.data;
         vm.option1.series[0].data=vm.tableData;
         vm.drawLine();

        //  this.option1.series[0].data=[20,30,40,50];
  });
      },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
      //     var option = {
      //     xAxis: {
      //         type: 'category',
      //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      //     },
      //     yAxis: {
      //         type: 'value'
      //     },
      //     series: [{
      //         data: [820, 932, 901, 934, 1290, 1330, 1320],
      //         type: 'bar'
      //     }],
      //     markPoint : {
      //           data : [
      //               {type : 'max', name: '最大值'},
      //               {type : 'min', name: '最小值'}
      //           ]
      //       },
      // };
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        // let Chart = this.$echarts.init(document.getElementById('Chart'))
        // 绘制图表
        // Chart.setOption(option);
        myChart.setOption(this.option1);
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
#myChart {
  float: left;
}
#YChart{
   float: left;
   width:200px;
   height:100px;
}
.tuchart{
margin-top:50px;
}
.block{

  padding-left:10%;
}
.fa{

  cursor: pointer;
}
</style>
