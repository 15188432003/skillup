const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

  publicPath: "./", //输出路径,(相对,绝对)
  outputDir: "dist", //输出文件名
  assetsDir: "static", //静态资源存放文件
  lintOnSave: false, //语法检查
  productionSourceMap: false, //输出map文件
  parallel: false, //向 PWA 插件传递选项
  transpileDependencies: true, // Babel 显式转译列表

  devServer:{

  },
  //对内部的webpack配置
  chainWebpack: (config) => {
    // set worker-loader
    config.module
      .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .options({
        inline: 'fallback',
        filename: 'workerName.[hash].worker.js',
      })
      .end();
    // 解决：worker 热更新问题
    config.module.rule('js').exclude.add(/\.worker\.js$/);
    // 删除splitChunks 请勿删除
    config.optimization.delete('splitChunks');

    config.plugin('define').tap((args) => {
      const [define] = args;

      Object.assign(define, {
        IS_APPLET: JSON.stringify(true),
      });
      return args;
    });
  },

})
