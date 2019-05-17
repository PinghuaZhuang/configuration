const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    /*
        原有的必须在原有的上面修改
        不能使用浅拷贝
    */
    configureWebpack: config => {
        // console.log(config, 'xxxxxxxxxxxxxxxxxxxxx');
        config.resolve.alias['@types'] = '@/types'
        // Object.assign( config, {
        //     resolve: {
        //         alias: {
        //             '@types': '@/types'
        //         }
        //     }
        // } );

        /* 代码抽离 */
        // config 中没有 optimization 选项的
        config.optimization = {
            splitChunks: {
                cacheGroups: {
                    default: false,
                    vendor: false,
                    common: {
                        chunks: "all",
                        test: /common.js/,
                        name: "common",
                        minChunks: 1,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 60
                    },
                    // 优先级高
                    // common2: {
                    //     chunks: "all",
                    //     test: /assets/,
                    //     name: "common2",
                    //     minChunks: 1,
                    //     maxInitialRequests: 5,
                    //     minSize: 0,
                    //     priority: 60
                    // },
                    common3: {
                        chunks: "all",
                        test: /t.js/,
                        name: "common3",
                        minChunks: 1,
                        maxInitialRequests: 5,
                        minSize: 0,
                        priority: 60
                    }
                }
            }
        }
    },

    chainWebpack: config => {
        // config.module
        //   .rule('vue')
        //   .use('vue-loader')
        //     .loader('vue-loader')
        //     .tap(options => {
        //       // 修改它的选项...
        //       return options
        //     })

        // config.resolve.alias
        //     .set('@$', resolve('src'))
        //     .set('assets',resolve('src/assets'))
        //     .set('components',resolve('src/components'))
        //     .set('layout',resolve('src/layout'))
        //     .set('base',resolve('src/base'))

        // console.log( 'xxxx:', config.plugins );

        // 修改模板文件位置
        config
            .plugin('html')
            .tap(args => {
                args[0].template = resolve('./src/index.html')
                return args
            })

        // 全局映入 less 文件
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))

        // 定义全局常量
        config
            .plugin('env')
            .use(require.resolve('webpack/lib/EnvironmentPlugin'), [{ 'XXX': 'aaa' }])
    },

    /* 多页面设置 */
    // pages: {
    //     index: {
    //         // page 的入口
    //         entry: 'src/main.ts',
    //         // 模板来源
    //         template: 'src/index.html',
    //         // 在 dist/index.html 的输出
    //         filename: 'index.html',
    //         // 当使用 title 选项时，
    //         // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //         title: 'Index Page',
    //         // 在这个页面中包含的块，默认情况下会包含
    //         // 提取出来的通用 chunk 和 vendor chunk。
    //         chunks: ['chunk-vendors', 'chunk-common', 'index']
    //     },
    //     // 当使用只有入口的字符串格式时，
    //     // 模板会被推导为 `public/subpage.html`
    //     // 并且如果找不到的话，就回退到 `public/index.html`。
    //     // 输出文件名会被推导为 `subpage.html`。
    //     subpage: 'src/subpage/main.ts'
    // },

    /* 插件 */
    pluginOptions: {
        /* 全局应用 less 变量 */
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/less/params.less')
            ]
        },
        /* 抽离代码, 没有效果 */
        // splitChunks: {
        //     common: {
        //         test: /[\\/]assets[\\/]/,
        //         priority: -10
        //     },
        //     commonxxx: {
        //         test: /[\\/]common.js]/,
        //         priority: -10
        //     }
        // }
    },

    /* 本地服务器 */
    devServer: {
        // proxy: 'http://wthrcdn.etouch.cn',
        before(app) {
            app.get('/local/get',
                function (req, res) {
                    // console.log( 'xxxxxx:', req, res );
                    res.send({
                        color: 'blue'
                    })
                })
        }
    },
}

// 全局使用 less 变量的方法
function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/less/params'),
            ],
        })
}
