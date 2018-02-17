const presets = [
    ['@babel/preset-env', {
        debug: false,
        useBuiltIns: false,
        targets: {
            browsers: ['> 1%', 'ie 10', 'edge 15'],
        },
    }],
    '@babel/preset-react',
]

const plugins = [
    '@babel/plugin-proposal-class-properties',
    [
        '@babel/plugin-proposal-object-rest-spread',
        { useBuiltIns: true },
    ],
]

module.exports = {
    presets,
    plugins,
}
