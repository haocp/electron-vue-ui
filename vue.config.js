const path = require('path');
const defaultSettings = require('./src/config/settings.js');

const name = defaultSettings.title || '管理系统';// 标题

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    runtimeCompiler: true,
    publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
    // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
    outputDir: 'dist',
    // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    assetsDir: 'static',
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    // 代理服务
    devServer:{
        hot:true,
        hotOnly: true, // 是否热更新
        host: '0.0.0.0',
        //public: '172.20.3.3:8080',
        //port:8080,
        //open: true // 配置自动启动浏览器
        proxy:{
            [process.env.VUE_APP_BASE_API]: {
                ws:true,// 是否启用websockets
                target: `http://192.168.43.101:8082`, //对应自己的接口
                secure:true ,//接受对方是https的接口
                //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        disableHostCheck: true,
    },
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            externals: ['my-native-dep'],
            nodeModulesPath: ['../../node_modules', './node_modules'],
            // 加载预执行文件
            preload: 'src/config/preload.js',
            builderOptions: {
                // 设置为 true 可以把自己的代码合并并加密
                "asar": true,
                "appId": "com.example.app",
                "productName": "app",//项目名，也是生成的安装文件名，即aDemo.exe
                "copyright": "Copyright © 2020",//版权信息
                "directories": {
                    "output": "./dist"//输出文件路径
                },
                "win": {//win相关配置
                    "icon": "./public/seam.ico",//图标，当前图标在根目录下，注意这里有两个坑
                    "target": [
                        {
                            "target": "nsis",//利用nsis制作安装程序
                            "arch": [
                                "x64",//64位
                                //"ia32"//32位
                            ]
                        }
                    ]
                },
                "linux": { // linux
                    "icon": "./public/seam.ico",
                    "target": [
                        "AppImage"
                    ]
                },
                "nsis": {
                    "oneClick": false, // 是否一键安装
                    "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    "allowToChangeInstallationDirectory": true, // 允许修改安装目录
                    "installerIcon": "./public/seam.ico",// 安装图标
                    "uninstallerIcon": "./public/seam.ico",//卸载图标
                    "installerHeaderIcon": "./public/seam.ico", // 安装时头部图标
                    "createDesktopShortcut": true, // 创建桌面图标
                    "createStartMenuShortcut": true,// 创建开始菜单图标
                    "shortcutName": "electron", // 图标名称
                },
            }
        }
    },
    chainWebpack(config) {
        config.plugin('preload').tap(() => [
            {
                rel: 'preload',
                // to ignore runtime.js
                // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
                fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
                include: 'initial'
            }
        ]);
        config.plugins.delete('prefetch'); // TODO: need test

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end();
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end();
    },
    /* css: {
         loaderOptions: {
             scss: {
                 prependData: `@import "~@/assets/styles/_mixin.scss";`
                 // 相当于@import"./src/assets/scss/global.scss"
             },
             sass: {
                 prependData: `@import "~@/assets/styles/_mixin.scss";`
                 // 相当于@import"./src/assets/scss/global.scss"
             }
         }
     },*/
}