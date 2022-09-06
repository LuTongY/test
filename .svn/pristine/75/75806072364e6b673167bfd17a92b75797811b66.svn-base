module.exports = {
	 publicPath: "/", 
    // outputDir: 'dist',  //build输出目录
    // assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "192.168.60.190", //表示启动的时候使用的域名，默认可以不写，则是使用localhost和本机IP
        port: '8081', // 设置端口号
        https: false,  //是否使用https协议
        hotOnly: false, //是否开启热更新
		// proxy:'http://192.168.60.153:8000'
         proxy: {
         '/api':{
           target:'http://192.168.60.153:8000/',  //请求的第三方接口
           changeOrigin:true, //在本地会创建一个虚拟服务端，然后发送请求的数据
           pathRewrite:{
             '^/api':''       //替换target中的请求地址
           }
         }
       },
    }
}
