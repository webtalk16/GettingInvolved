const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = function (env) {
    const isDev = env === 'development';
    console.log(`This is a ${isDev ? "development" : "production"} build`);

    const baseConfig = {
        mode: isDev ? 'development' : 'production',
        // entry: './src/js/index.js',
        entry: {
            index: './src/js/index.js',
            // 'service-worker': './src/js/index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: chunk => {
                if (chunk.name === 'index') return 'js/[name].js';
                return '[name].js'
            }
            // filename: 'bundle.js',
            // publicPath: '/dist/'
        },
        devtool: isDev ? 'source-map' : undefined,
        devServer: {
            contentBase: './dist',
            // contentBase: path.resolve(__dirname, 'dist'),
            // contentBase: path.resolve(__dirname, 'src'),
            // publicPath: '/dist/',
            watchContentBase: false,
            hotOnly: true,
            writeToDisk:true,
            disableHostCheck: true,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            // hot: false,
            inline: false,
            liveReload: false,
            overlay: true,
            // host: "0.0.0.0",
            // allowedHosts: ['.local']
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/index.html'
            }),
            new CopyPlugin([
                { from: 'src/css', to: 'css' },
                { from: 'src/images', to: 'images' },
                { from: 'src/posts', to: 'posts' },
                { from: 'manifest.webmanifest', to: '' },
                { from: 'src/favicon.ico', to: '' }
            ]),
            new GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
                // Files to exclude from the precache
                exclude: [/\.map$/, /manifest\.webmanifest$/, /service-worker\.js$/],
                // exclude: [/\.(?:png|jpg|jpeg|svg)$/, /\.map$/, /manifest\.webmanifest$/, /service-worker\.js$/],
                // modifyUrlPrefix: {
                //     '/': ''
                // }
                runtimeCaching: [{
                    handler: 'NetworkFirst',
                    // Match any request that ends with .png, .jpg, .jpeg or .svg.
                    // urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                    urlPattern: new RegExp('\\.(?:png|gif|jpg|jpeg|svg)$'),
                    options: {
                        // Use a custom cache name.
                        // cacheName: 'images',
                      // Fall back to the cache after 10 seconds.
                      networkTimeoutSeconds: 10,
                      // Use a custom cache name for this route.
                    //   cacheName: 'getting-involved-cache'// Only cache 10 images.
                    //   expiration: {
                    //     maxEntries: 10,
                    //   },
                    }
                }]
            })
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: ['file-loader']
                }
            ],
        }
    };

    if (isDev) {
        baseConfig.plugins.push(
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            // new NpmInstallPlugin()
        )
    }
    else {
        // baseConfig.plugins.push(
        //     new CleanWebpackPlugin()
        // )
    
        // baseConfig.module.rules.push(
        //     {
        //         test: /\.js$/,
        //         exclude: /(node_modules)/,
        //         use: {
        //             loader: 'babel-loader'
        //         }
        //     }
        // )
    }

    baseConfig.plugins.push(
        new CleanWebpackPlugin()
    )

    return baseConfig;
};