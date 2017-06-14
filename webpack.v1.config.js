var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = [
    // Configurations

    // [Browser-single-js-file]: Packing a library Javascript file.
    {
        entry: {
            koapp: './src/app'
        },
        output: {
            library: 'KoApp',
            libraryTarget: 'var',
            filename: '[name].js',
            path: './dist',
            devtoolModuleFilenameTemplate: void 0
        },
        module: {
            preLoaders: [{
                test: /\.[tj]sx?$/,
                loader: 'source-map-loader'
            }],
            loaders: [{
                test: /\.tsx?$/,
                loader: 'babel-loader!ts-loader?' + JSON.stringify({
                    configFileName: 'tsconfig-webpack-dist.json'
                }),
                exclude: /node_modules[\/\\](?!knockout-webpack-ts-quickstart).*$/
            }, {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules[\/\\](?!knockout-webpack-ts-quickstart).*$/
            },  {
                test: /\.json$/,
                loader: 'json-loader'
            },  {
                test: /\.html?(\?.+)?$/,
                loader: 'html-loader'
            }, {
                test: /\.(css|scss)$/,
                loader: 'to-string-loader!css-loader!postcss-loader!sass-loader'
            }, {
                test: /\.(jpg|jpeg|png|ttf|otf|eot|svg|woff2?)(\?.+)?$/,
                loader: 'url-loader?limit=1000'
            }],
            postcss: [
                require('postcss-custom-properties')(),
                require('postcss-nested')(),
                require('autoprefixer')({ browsers: ['last 2 versions'] })
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss', '.css', '']
        },
        devtool: 'source-map'
    },

    // [Single-stylesheet-file]: Packing a library CSS file.
    {
        entry: {
            style: './src/assets/scss/main.scss'
        },
        output: {
            filename: '[name].css',
            path: './dist',
            devtoolModuleFilenameTemplate        : void 0,
            devtoolFallbackModuleFilenameTemplate: void 0
        },
        module: {
            loaders: [{
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader?sourceMap=true',
                    'postcss-loader?sourceMap=true',
                    'sass-loader?sourceMap=true'
                )
            }, {
                test: /\.(jpg|jpeg|png|ttf|otf|eot|svg|woff2?)(\?.+)?$/,
                loader: 'url-loader?limit=1000'
            }]
        },
        resolve: {
            // [FIX]: Add extensions for fixing following error.
            // Module not found: Error: Cannot resolve 'file' or 'directory' node_modules/style-loader/lib
            //                   @ ./~/style-loader/lib/addStyles.js 44:14-31
            extensions: ['.scss', '.css', '', '.js']
        },
        postcss: [
            require('postcss-custom-properties')(),
            require('postcss-nested')(),
            require('autoprefixer')({ browsers: ['last 2 versions'] })
        ],
        plugins: [
            new ExtractTextPlugin('style.css')
        ],
        devtool: 'source-map'
    }
];
