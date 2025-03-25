<script setup>
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
  CardTitle
} from '@/components/ui/card'

import { cn } from '@/lib/utils'
</script>

<template>
  <div class="flex size-full items-center justify-center font-serif">
    <Card :class="cn('w-[420px]', 'shadow-none')">
      <CardHeader>
        <CardTitle class="text-center text-4xl slashed-zero tracking-widest">
          404
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-center text-xl">
          Page Not Found.
        </div>
      </CardContent>
      <CardFooter>
        <RouterLink
          v-slot="{ href, navigate }"
          custom
          to="/"
        >
          <Button
            class="flex w-full gap-x-2"
            @click="navigate"
          >
            <i-lucide:square-arrow-out-up-left class="size-4" />
            <span class="font-sans">返回首页</span>
          </Button>
        </RouterLink>
      </CardFooter>
    </Card>
  </div>
</template>

<route lang="yaml">
name: NotFoundPage
meta:
  title: Page Not Found
  layout: 404
</route>
