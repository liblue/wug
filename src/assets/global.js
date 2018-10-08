

const MyPlugin = {
    // install方法是必需的
//   // 包含两个参数：Vue 构造器，一个可选的选项对象
    install(Vue, options) {
    Vue.prototype.api1 ="http://192.168.0.89:3400/web" ;
    Vue.prototype.api2 ="http://www.wug.com/";
    // Vue.prototype.api1 ="http://120.25.216.139:3300/web" ;     //node   
    // Vue.prototype.api2 ="http://120.25.216.139:8011/";
       
    }
};
export default MyPlugin
