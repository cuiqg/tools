import path from 'node:path'
import { unheadVueComposablesImports } from '@unhead/vue'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import Icons from 'unplugin-icons/vite'
import Unfonts from 'unplugin-fonts/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'
import Autoprefixer from 'autoprefixer'
import Tailwind from 'tailwindcss'
import Imagemin from 'unplugin-imagemin/vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  css: {
    postcss: {
      plugins: [
        Tailwind(),
        Autoprefixer()
      ]
    }
  },
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue()
      }
    }),
    VueRouter({
      dts: false
    }),
    Layouts(),
    AutoImport({
      imports: [
        'vue',
        'vue-i18n',
        '@vueuse/core',
        unheadVueComposablesImports,
        VueRouterAutoImports
      ],
      resolvers: [
      ],
      dirs: [
        './src/composables'
      ],
      dts: false,
      eslintrc: {
        enabled: true,
        globalsPropValue: 'readonly'
      },
      vueTemplate: true
    }),
    Components({
      dts: false,
      resolvers: [
        IconsResolver({
          enabledCollections: ['lucide', 'fluent-emoji-flat']
        }),
        VueUseComponentsResolver()
      ]
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true
    }),
    Imagemin(),
    Unfonts({
      google: {
        preconnect: true,
        preconnectUrl: 'https://use.sevencdn.com',
        fontBaseUrl: 'https://use.sevencdn.com/css2',
        display: 'swap',
        families: [
          {
            name: 'ZCOOL+XiaoWei',
            styles: 'wght@400',
            defer: false
          },
          {
            name: 'Noto+Sans+SC',
            styles: 'wght@100..900',
            defer: false
          }
        ]
      }
    })
  ]
})
