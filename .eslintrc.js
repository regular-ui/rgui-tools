module.exports = {
    envs: ['browser', 'commonjs', 'es6'],
    globals: [],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
    },
    rules: {
        // Possible Errors
        'comma-dangle': [2, 'always-multiline'],
        'no-cond-assign': [2, 'except-parens'],
        'no-console': [2, { allow: ['warn', 'error'] }],
        'no-constant-condition': [2],
        'no-control-regex': [2],
        'no-debugger': [2],
        'no-dupe-args': [2],
        'no-dupe-keys': [2],
        'no-duplicate-case': [2],
        'no-empty': [2, { allowEmptyCatch: true }],
        'no-empty-character-class': [2],
        'no-ex-assign': [2],
        'no-extra-boolean-cast': [2],
        // @disagreed: 'no-extra-parens',
        'no-extra-semi': [2],
        'no-func-assign': [2],
        // @disagreed: 'no-inner-declarations:': [2, 'both'],
        'no-invalid-regexp': [2],
        'no-irregular-whitespace': [2],
        'no-negated-in-lhs': [2],
        'no-obj-calls': [2],
        // @disagreed: `hasOwnProperty`; 'no-prototype-builtins': [0],
        'no-regex-spaces': [1],
        'no-sparse-arrays': [1],
        'no-unexpected-multiline': [2],
        'no-unreachable': [2],
        'no-unsafe-finally': [2],
        'use-isnan': [2],
        /* @has problem: 'valid-jsdoc': [1, {
            prefer: { 'arg': 'param', 'argument': 'param' },
            preferType: { 'Boolean': 'boolean', 'Number': 'number', 'String': 'string', 'Object': 'object' },
            requireReturn: false,
        }], */
        'valid-typeof': [2],

        // Best Practices
        // @TODO: 'accessor-pairs',
        'array-callback-return': [2],
        'block-scoped-var': [2],
        // @useless: complexity
        // @what's fuck: 'consistent-return': [2, { "treatUndefinedAsUnspecified": true }],
        'curly': [2, 'multi-or-nest'],
        'default-case': [2],
        'dot-location': [2, 'property'],
        'dot-notation': [1, {allowKeywords: false}],
        'eqeqeq': [2, 'always'],
        // @uncertain: 'guard-for-in',
        'no-alert': [1],
        'no-caller': [2],
        'no-case-declarations': [2],
        'no-div-regex': [2],
        // @disagreed: 'no-else-return',
        'no-empty-function': [1],
        'no-empty-pattern': [2],
        'no-eq-null': [2],
        'no-eval': [2],
        // @disagreed: 'no-extend-native',
        'no-extra-bind': [1],
        'no-extra-label': [2],
        // @uncertain: 'no-fallthrough',
        'no-floating-decimal': [2],
        // @disagreed: 'no-implicit-coercion',
        // @uncertain: 'no-implicit-globals',
        'no-implied-eval': [2],
        // @has problem: 'no-invalid-this: [0],
        'no-iterator': [2],
        'no-labels': [1],
        // @disagreed: 'no-lone-blocks',
        // @has problem: while(a) {a = find(() => ...)} 'no-loop-func': [2],
        'no-magic-numbers': [1, { ignore: [0, 1], enforceConst: true }],
        'no-multi-spaces': [2],
        'no-multi-str': [2],
        'no-native-reassign': [2],
        // @disagreed: 'no-new',
        'no-new-func': [2],
        'no-new-wrappers': [2],
        'no-octal': [2],
        'no-octal-escape': [2],
        // @disagreed: 'no-param-reassign',
        'no-proto': [2],
        'no-redeclare': [2],
        // @disagreed: 'no-return-assign': 'except-parens',
        'no-script-url': [2],
        'no-self-assign': [2],
        'no-self-compare': [2],
        'no-sequences': [2],
        'no-throw-literal': [2],
        'no-unmodified-loop-condition': [1],
        'no-unused-expressions': [2, { allowShortCircuit: true, allowTernary: true }],
        'no-unused-labels': [2],
        'no-useless-call': [2],
        'no-useless-concat': [1],
        'no-useless-escape': [2],
        'no-void': [2],
        // @disagreed: 'no-warning-comments',
        'no-with': [2],
        'radix': [2, 'as-needed'],
        // @disagreed: 'vars-on-top',
        'wrap-iife': [2, 'inside'],
        'yoda': [2, 'never', { exceptRange: true }],

        // Strict Mode
        // @uncertain: strict,

        // Variables
        // @uncertain: 'init-declarations',
        'no-catch-shadow': [2],
        'no-delete-var': [2],
        'no-label-var': [2],
        // @TODO: 'no-restricted-globals',
        // @disagreed: 'no-shadow',
        'no-shadow-restricted-names': [2],
        'no-undef': [2],
        'no-undef-init': [2],
        // @uncertain: 'no-undefined',
        'no-unused-vars': [1, { args: 'none' }],
        'no-use-before-define': [2],

        // Node.js and CommonJS
        // @TODO: 'callback-return',
        // @TODO: 'global-require',
        // @TODO: 'handle-callback-err',
        // @TODO: 'no-mixed-requires',
        // @TODO: 'no-new-require',
        // @TODO: 'no-path-concat',
        // @TODO: 'no-process-env',
        // @TODO: 'no-process-exit',
        // @TODO: 'no-restricted-modules',
        // @TODO: 'no-sync',

        // Stylistic Issues
        'array-bracket-spacing': [2, 'never'], // @TODO
        'block-spacing': [2, 'never'],
        'brace-style': [2, '1tbs', { allowSingleLine: true }],
        'camelcase': [2],
        'comma-spacing': [2],
        // @TODO: 'comma-style',
        'computed-property-spacing': [1],
        'consistent-this': [1, 'self'],
        'eol-last': [2],
        // @useless: 'func-names',
        'func-style': [2, 'expression', { allowArrowFunctions: true }],
        // @useless: 'id-blacklist',
        // @useless: 'id-length',
        // @useless: 'id-match',
        'indent': [2, 4],
        // @useless: 'jsx-quotes',
        'key-spacing': [2],
        'keyword-spacing': [2],
        'linebreak-style': [2],
        // @TODO: 'lines-around-comment',
        // @useless: 'max-depth',
        // @useless: 'max-len',
        // @useless: 'max-lines',
        // @useless: 'max-nested-callbacks',
        // @useless: 'max-params',
        // @useless: 'max-statements',
        // @useless: 'max-statements-per-line',
        'new-cap': [2],
        'new-parens': [1],
        // @uncertain: 'newline-after-var',
        // @uncertain: 'newline-before-return',
        // @disagreed: 'newline-per-chained-call',
        'no-array-constructor': [2],
        // @disagreed: 'no-bitwise',
        // @useless: 'no-continue',
        // @useless: 'no-inline-comments',
        // @disagreed: 'no-lonely-if',
        // @TODO: 'mixed-operators'
        'no-mixed-spaces-and-tabs': [2],
        'no-multiple-empty-lines': [1, { max: 1, maxEOF: 1, maxBOF: 0 }],
        'no-negated-condition': [1],
        'no-nested-ternary': [2],
        'no-new-object': [2],
        // @useless: 'no-plusplus',
        // @TODO: 'no-restricted-syntax',
        'no-spaced-func': [2],
        // @useless: 'no-ternary',
        'no-trailing-spaces': [2],
        // @disagreed: 'no-underscore-dangle',
        'no-unneeded-ternary': [2, { defaultAssignment: false }],
        'no-whitespace-before-property': [2],
        // @has problem:'object-curly-newline': [1, { multiline: true, minProperties: 1}],
        'object-curly-spacing': [2, 'always'],
        // @disagreed: 'object-property-newline',
        // @TODO: 'one-var',
        // @TODO: 'one-var-declaration-per-line',
        // @TODO: 'operator-assignment',
        'operator-linebreak': [2, 'before'], // @TODO
        // @TODO: 'padded-blocks',
        'quote-props': [1, 'as-needed', { keywords: true }],
        'quotes': [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        // @TODO: 'require-jsdoc',
        'semi': [2, 'always', { omitLastInOneLineBlock: false }],
        'semi-spacing': [2],
        // @useless: 'sort-vars',
        'space-before-blocks': [2],
        'space-before-function-paren': [2, { anonymous: 'always', named: 'never' }],
        'space-in-parens': [2, 'never'],
        // @has problem: 2*4>>0;'space-infix-ops': [2],
        'space-unary-ops': [2],
        'spaced-comment': [1],
        'unicode-bom': [2],
        // @disagreed: 'wrap-regex',

        // ECMAScript 6
        'arrow-body-style': [1, 'as-needed'],
        'arrow-parens': [2, 'always'],
        'arrow-spacing': [2],
        'constructor-super': [2],
        // @TODO: 'generator-star-spacing'
        'no-class-assign': [2],
        // @uncertain: 'no-confusing-arrow',
        'no-const-assign': [2],
        'no-dupe-class-members': [2],
        'no-duplicate-imports': [1],
        'no-new-symbol': [2],
        // @TODO: 'no-restricted-imports'
        'no-this-before-super': [2],
        'no-useless-computed-key': [1],
        'no-useless-constructor': [2],
        'no-useless-rename': [2],
        'no-var': [2],
        'object-shorthand': [2, 'always'],
        'prefer-arrow-callback': [1],
        'prefer-const': [2, { destructuring: 'all'}],
        // @TODO: 'prefer-reflect',
        'prefer-rest-params': [2],
        'prefer-spread': [2],
        // @has problem: abc + ''; prefer-template': [1],
        // @TODO: 'require-yield',
        'rest-spread-spacing': [2, 'never'],
        // @useless: 'sort-imports',
        'template-curly-spacing': [2, 'never'],
        // @TODO: 'yield-star-spacing',
    },
}
