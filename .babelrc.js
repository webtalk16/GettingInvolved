module.exports = {
    presets: [
        ['@babel/preset-env', {
            // useBuiltIns: 'usage'
        }]
    ],
    plugins: [
        ['@babel/plugin-transform-runtime', {
            // absoluteRuntime: false,
            // corejs: false,
            helpers: true,
            regenerator: true
        }]
    ]
};