const webpack = require('webpack');

function configureWebpack(webpackConfig, { env, paths }) {
    // fallbacks
    const fallback = webpackConfig?.resolve.fallback || {};
    Object.assign(fallback, {
        fs: require.resolve('browserify-fs'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util'),
        path: require.resolve('path-browserify'),
        crypto: require.resolve('crypto-browserify'),
        'process/browser': require.resolve('process/browser'),
        vm: require.resolve('vm-browserify')
    });

    const alias = webpackConfig.resolve.alias || {};
    Object.assign(alias, {
        '@mui/styled-engine': '@mui/styled-engine-sc'
    });

    webpackConfig.resolve.fallback = fallback;
    webpackConfig.resolve.alias = alias;

    webpackConfig.plugins = (webpackConfig.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ]);

    webpackConfig.ignoreWarnings = [
        /Failed to parse source map/,
        function ignoreSourcemapsloaderWarnings(warning) {
            return (
                warning.module &&
                warning.module.resource.includes('node_modules') &&
                warning.details &&
                warning.details.includes('source-map-loader')
            );
        }
    ];

    return webpackConfig;
}

function configureCraco() {
    return {
        webpack: {
            configure: configureWebpack
        }
    };
}

module.exports = configureCraco();
