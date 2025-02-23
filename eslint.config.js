import eslint from '@eslint/js'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import vuePlugin from 'eslint-plugin-vue'
import globals from 'globals'
import prettierConfig from 'eslint-config-prettier' // 导入 Prettier 配置
import prettierPlugin from 'eslint-plugin-prettier' // 导入 Prettier 插件

export default [
  // 核心推荐规则
  eslint.configs.recommended,

  // 全局配置
  {
    languageOptions: {
      globals: {
        ...globals.browser, // 浏览器全局变量
        ...globals.es2021 // ES2021 全局变量
      },
      parserOptions: {
        ecmaVersion: 2020
      }
    }
  },

  // Vue3 配置
  {
    files: ['**/*.vue'],
    plugins: { vue: vuePlugin },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser // 使用 TypeScript 解析器
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off' // 关闭 Vue 组件名必须多单词的规则
    }
  },

  // TypeScript 配置
  {
    files: ['**/*.ts'],
    plugins: { '@typescript-eslint': tsPlugin },
    languageOptions: {
      parser: tsParser
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-empty-function': 'off'
    }
  },

  // 通用规则
  {
    files: ['**/*.js', '**/*.ts', '**/*.vue'],
    rules: {
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'no-console': 'off',
      'no-debugger': 'off',
      'no-undef': 'off',
      'no-inner-declarations': 'off',
      // 有未使用的变量 发出警告
      'no-unused-vars': 'warn'
    }
  },

  // Prettier 集成
  {
    name: 'prettier-integration',
    ignores: ['**/dist/**'], // 忽略构建目录
    plugins: { prettier: prettierPlugin }, // 使用 Prettier 插件
    // 需要安装 eslint-config-prettier 和 eslint-plugin-prettier
    rules: {
      ...prettierConfig.rules, // 应用 Prettier 配置
      'prettier/prettier': 'error' // 启用 Prettier 规则
    }
  },
  // 忽略检测
  {
    ignores: [
      '**/cache/**', // 忽略缓存文件
      '**/node_modules/**', // 忽略 node_modules
      '**/dist/**' // 忽略构建目录
    ]
  }
]
