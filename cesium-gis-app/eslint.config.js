/* Copyright (c)
 *
 * システム名()
 * ソースファイル名(eslint.config.js)
 * 履歴
 *   NO 日付       Ver.         更新者        内容
 *   1  2025/05/07 1            KKC)渡邉      初版
 */

import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
    js.configs.recommended,
    prettier,
    {
        ignores: ['node_modules/**', 'dist/**', 'build/**', '**/*.min.js'],
    },
    {
        files: ['**/*.js', '**/*.jsx'],
        plugins: {
            jsdoc,
            react,
            'react-hooks': reactHooks,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            // --- 命名規則 ---
            // 変数・関数名をスネークケース（camelCaseを禁止）
            camelcase: ['error', { properties: 'never' }],

            // クラス名にアッパーキャメルケース（パスカルケース）を強制
            'new-cap': ['error', { newIsCap: true }],

            // --- コーディングスタイル ---
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            indent: ['error', 4],
            'no-multiple-empty-lines': ['error', { max: 1 }],
            'no-unused-vars': 'off',
            eqeqeq: ['error', 'always'],

            // --- React Hooks ---
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // --- React ---
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',

            // --- JSDoc ---
            'jsdoc/check-tag-names': [
                'warn',
                { definedTags: ['returns', 'param', 'throws'] },
            ],
            'jsdoc/check-types': 'warn',
            'jsdoc/require-jsdoc': [
                'warn',
                {
                    require: {
                        FunctionDeclaration: true,
                        MethodDefinition: true,
                        ClassDeclaration: true,
                    },
                },
            ],
            'jsdoc/require-description': 'warn',
            'jsdoc/require-param': 'warn',
            'jsdoc/require-param-type': 'warn',
            'jsdoc/require-returns': 'warn',
            'jsdoc/require-returns-type': 'warn',
        },
        settings: {
            react: {
                version: '18',
                'jsx-runtime': 'automatic',
            },
        },
    },
];
