module.exports = {
    'root': true,
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaVersion': 2017,
        'sourceType': 'module'
    },
    'env': {
        'browser': true,
        'node': true,
        'es6': true
    },
    extends: ['standard'],
    rules: {
        'indent': ['error', 4],
        'space-before-function-paren': ['error', 'never'],
        'semi': ['error', 'always'],
        'block-spacing': ['error', 'always'],
        'space-unary-ops' : 'off'
    }
};
