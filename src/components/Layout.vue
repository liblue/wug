<template>
  <div id="layout">
     <div class="aside">
    <v-menu ></v-menu>
    </div>
    <!-- <header><v-header></v-header></header> -->
    <div class="content">
    
    <keep-alive><router-view></router-view></keep-alive>
    <footer>
      <div class="footer-con">
      © 2018-2019
      </div>
            </footer>
    </div>
  </div>
</template>

<script>
import  Menu from './Menu.vue'
export default {
  name: 'Layout',
  data () {
  },
   components:{ 
    'v-menu':Menu,
     }
  ,methods:{
     },
     mounted(){
 if(!sessionStorage.getItem('sessionid')){
      this.$router.push({  
           path:'/login',
          });
    }

     },
     created(){
   
     }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


/* header{
    height: 60px;
    display: flex;
    box-shadow: 0 2px 1px 1px rgba(100,100,100,0.1);
    padding: 0 20px;

} */

#layout{
  height: 100%;
  display: flex;
  flex-direction:row;
}
.aside{
  height: 100%;
  /* float: left; */
  background-color:#495060;
}
.content{
    height: 96%;
  /* float:left; */
    width:100%;
    overflow-y:scroll;
}

footer{
  box-sizing: border-box;
   height:4%;
   width:100%;
   position:fixed; bottom:0;
   border-top: 1px solid #e7eaec;
   overflow: hidden;
   padding-top: 15px;
   padding-bottom: 15px;
  
  }
  .footer-con{
    padding-right:25px ;
    position:fixed; 
    right:0;
    display:table-cell;      /*按照单元格的样式显示元素*/
    vertical-align:middle;
  }
</style>
