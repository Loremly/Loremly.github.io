const config = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    bracketSameLine: true,
}

module.exports = {
    ...config,
    plugins: [
        'prettier-plugin-astro',
        'prettier-plugin-tailwindcss', // MUST come last
    ],
    pluginSearchDirs: false,
}
