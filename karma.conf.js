module.exports = function (config) {

    var appBase        =     'dist/';    // transpiled app JS and map files
    var appSrcBase     =     appBase;    // app source TS files

    // Testing helpers (optional) are conventionally in a folder called `testing`
    var testingBase    =     appBase;    // transpiled test JS and map files
    var testingSrcBase = testingBase;    // test source TS files

    config.set({
        basePath: '',
        frameworks: ['jasmine'],

        // plugins: [
        //   require('karma-jasmine'),
        //   require('karma-chrome-launcher'),
        //   require('karma-jasmine-html-reporter')
        // ],

        // client: {
        //   builtPaths: [appBase, testingBase], // add more spec base paths as needed
        //   clearContext: false // leave Jasmine Spec Runner output visible in browser
        // },

        customLaunchers: {
            // From the CLI. Not used here but interesting
            // chrome setup for travis CI using chromium
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        files: [
            // Polyfills
            'node_modules/core-js/client/shim.js',
            // ANY OTHER FILES TO LOAD FOR YOUR TESTS
            'https://code.jquery.com/jquery-1.12.4.min.js',
            'https://code.jquery.com/ui/1.11.4/jquery-ui.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.2/js/bootstrap.min.js',
            'http://knockoutjs.com/downloads/knockout-3.4.2.debug.js',

            { pattern: 'test/index.js', watched: false }
        ],

        exclude: [],

        // // Proxied base paths for loading assets
        // proxies: {
        // },

        preprocessors: {
            'test/index.js': ['webpack', 'sourcemap']
        },
        webpack: require('./webpack.v1.config'),

        reporters: [
            'progress',
            // 'kjhtml'
        ],

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true,
        //concurrency: Infinity
    })
}
