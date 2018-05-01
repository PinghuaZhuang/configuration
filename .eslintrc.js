// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        // parser: 'babel-eslint',
        ecmaVersion: 6,
        sourceType: 'module'
        // allowImportExportEverywhere: true
    },
    env: {
        browser: true,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        // 'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        // 'standard',
        'jquery'
    ],
    // required to lint *.vue files
    plugins: [
        'vue',
        'html'
    ],
    // add your custom rules here
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 缩进
        'indent': [ 'error', 4 ],
        // 使用单引号
        'quotes': [ 'error', 'single' ],
        // window 下的换行 CRLF
        // 'linebreak-style': [ 'error', 'windows' ],
        // 多个空格
        // a  =    19;
        'no-multi-spaces': [ 'error', { exceptions: { 'VariableDeclarator': true } } ],
        // 函数前空格
        'space-before-function-paren': ['error', {
            'anonymous': 'always',      // 匿名函数
            'named': 'always'           // 申明函数
        }],
        // 行尾注释多个空格
        'no-multi-spaces': [ 'error', { ignoreEOLComments: true } ],
        // 与 null 对比较
        'eqeqeq': [ 'error', 'always', { 'null': 'ignore' } ]
    }
}
