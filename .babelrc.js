const presets = [
    ['@babel/preset-env', {
        debug: false,
        useBuiltIns: false,
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
