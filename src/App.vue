<script setup>
import { Analytics } from '@vercel/analytics/vue'
import { SpeedInsights } from '@vercel/speed-insights/vue'
import { Toaster } from '@/components/ui/sonner'

const route = useRoute()

useHead({
  title: () => (route.meta?.title || ''),
  titleTemplate: () => route.meta?.title ? '%s | Tsui Tools.' : 'Tsui Tools.',
  link: [
    {
      rel: 'shortcut icon',
      type: 'image/x-icon',
      sizes: 'any',
      href: '/favicon.ico'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/img/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/img/favicon-16x16.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/img/apple-touch-icon.png'
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest'
    }
  ],
  meta: [
    {
      name: 'description',
      content: () => (route.meta?.description || 'Tsui Tools')
    },
    {
      name: 'theme-color',
      content: '#ffffff'
    },
    {
      name: 'color-scheme',
      content: 'dark light'
    }
  ],
  script: [
    {
      'src': 'https://stats.tsuiqg.me/script.js',
      'defer': true,
      'data-website-id': '6b04f2c0-8c7a-4a15-8975-c9ac8caa3ed4'
    }
  ]
})
</script>

<template>
  <Toaster class="pointer-events-auto" />
  <RouterView />
  <Analytics />
  <SpeedInsights />
</template>
