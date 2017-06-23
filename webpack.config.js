var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


var scssRoot = 'src/assets/scss';

var scssDevToolFix = (info) => {
    let search = `/${scssRoot}/`;
    let fi = info.resourcePath.indexOf(search);
    let li = info.resourcePath.lastIndexOf(search);
    let s  = (fi < 0 || fi === li) ? info.resourcePath : info.resourcePath.substring(0, fi) + info.resourcePath.substring(li);
    return `${s}`;
};


module.exports = function (env) { return [
    // Configurations
    // This file contains 3 configurations (Node-single-js-file, Browser-single-js-file, Single-stylesheet-file).

    // [Browser-single-js-file]: Packing a library Javascript file.
    {
        entry: {
            // TODO: YOU SHOULD REPLACE THE LIBRARY OUTPUT NAME!
            koapp: path.resolve(__dirname, 'src/app.ts')
        },
        // TODO: YOU SHOULD MODIFY PATTERN OF EXTERNAL MODULES!
        // If you call "require()" with passing modules paths matched to following pattern,
        // "require()" will be resolved runtime.
        //externals: /^(fs)$/,
        node: {
            fs: "empty",
            console: false,
            process: false,
            global: false,
            __filename: false,
            __dirname: false,
            Buffer: false,
            setImmediate: false,
        },
        output: {
            // TODO: YOU SHOULD REPLACE THE LIBRARY NAME!
            library: 'KoApp',

            libraryTarget: 'var',
            filename: process.env.NODE_ENV === 'production' ? '[name].js' : '[name].js',
            path: path.resolve(__dirname, 'dist'),
            devtoolModuleFilenameTemplate: process.env.NODE_ENV === 'production' ? '[resource-path]' : void 0
        },
        target: "web",
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader?' + JSON.stringify({
                    configFileName: 'tsconfig-webpack-dist.json'
                })],

                // TODO: YOU SHOULD REPLACE THE PACKAGE NAME!
                // exclude 'node_module' directory except myself (refered from other packages)
                exclude: /node_modules[\/\\](?!knockout-webpack-ts-quickstart).*$/
            }, {
                test: /\.jsx?$/,
                use: ['babel-loader'],

                // TODO: YOU SHOULD REPLACE THE PACKAGE NAME!
                // exclude 'node_module' directory except myself (refered from other packages)
                exclude: /node_modules[\/\\](?!knockout-webpack-ts-quickstart).*$/
            }, {
                enforce: 'pre',
                test: /\.[tj]sx?$/,
                use: ['source-map-loader']
            }, {
                test: /\.html?(\?.+)?$/,
                use: ['html-loader']
            }, {
                test: /\.(css|scss)$/,
                use: [
                    // TODO: If you want to get the stylesheets as string, you choose ['to-string-loader', 'css-loader', ...] .
                    //       Or you want to load to dom these, you choose ['style-loader', 'css-loader', ...] .
                    'to-string-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('postcss-custom-properties')(),
                                require('postcss-nested')(),
                                require('autoprefixer')({ browsers: ['last 2 versions'] })
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }, {
                test: /\.(jpg|jpeg|png|ttf|otf|eot|svg|woff2?)(\?.+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'source-map'
    },

    // [Single-stylesheet-file]: Packing a library CSS file.
    {
        entry: {
            style: path.resolve(__dirname, `${scssRoot}/main.scss`)
        },
        output: {
            filename: process.env.NODE_ENV === 'production' ? '[name].css' : '[name].css',
            path: path.resolve(__dirname, 'dist'),
            devtoolModuleFilenameTemplate        : process.env.NODE_ENV === 'production' ? scssDevToolFix : void 0,
            devtoolFallbackModuleFilenameTemplate: process.env.NODE_ENV === 'production' ? scssDevToolFix : void 0
        },
        module: {
            rules: [{
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: () => [
                                    require('postcss-custom-properties')(),
                                    require('postcss-nested')(),
                                    require('autoprefixer')({ browsers: ['last 2 versions'] })
                                ]
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }, {
                test: /\.(jpg|jpeg|png|ttf|otf|eot|svg|woff2?)(\?.+)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: process.env.NODE_ENV === 'production' ? '[name].css' : '[name].css',
                disable: false,
                allChunks: true
            })
        ],
        devtool: 'source-map'
    }

]}
