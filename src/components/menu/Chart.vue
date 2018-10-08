<template>
<div  class="chart">

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
    <el-button type="primary" @click="onSubmit()">生成图表</el-button>
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
                data: ["1号","2号","3号","4号","5号","6号",'7号','8号','9号','10号','11号','12号','13号','14号','15号','16号','17号','18号','19号','20号','21号','22号','23号','24号','25号','26号','27号','28号','29号','30号','31号']
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

  methods: {
      init(){
      var now = new Date;
      var y = now.getFullYear();
      var m = now.getMonth();
      this.value4=new Date(y, m);
  },
      onSubmit(){
       this.checksession();
       this.option1.series[0].data=this.tableData;
       this.getdata();
       this.drawLine()
      },
        checksession(){
        var vm=this;
         vm.$http.post(vm.api1,{
         cmd:"checkSession",
            data:JSON.stringify({
            account:sessionStorage.getItem('account'),
            sessionid:sessionStorage.getItem('sessionid'),
         })
          }).then((res)=>{
            console.log('检查session');
            console.log(res);
            if(res.data.result.status=='996'){
            vm.$router.push({
            path:'/login',
          });
           }
        }).catch(function(err){
         console.log(err);
          });
      },
      getdata(){
           const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var vm=this; 
        vm.$http.get(vm.api2+'/api/orderchart',{
              params:{
              date:vm.value4,
              userid:vm.input,
              reason:vm.reason,
              }
        }).then((res)=> {

          console.log('chart');
          console.log(res);
         vm.tableData=res.data;
         vm.option1.series[0].data=vm.tableData;
         vm.drawLine();
         this.option1.series[0].data=this.tableData;
         loading.close();
  });
      },
      drawLine(){
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        myChart.setOption(this.option1);
    }
  },
  activated(){
  },
  mounted(){
    
      this.onSubmit()
      this.drawLine();
      this.getdata();
  },
  created(){
      
     this.init();
  },
}
</script>
<style  scoped>
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
</style>
