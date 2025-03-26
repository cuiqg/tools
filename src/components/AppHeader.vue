<script setup>
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from '@/components/ui/breadcrumb'
</script>

<template>
  <header class="flex h-[64px] w-full items-stretch justify-center border-b border-zinc-200 px-4 dark:border-zinc-800">
    <div class="mx-auto flex w-full flex-row items-stretch justify-between gap-x-2">
      <div class="inline-flex items-center justify-center gap-x-2">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink as-child>
                <RouterLink to="/">
                  首页
                </RouterLink>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <template v-if="$route.path !== '/'">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{{ $route.meta.title }}</BreadcrumbPage>
              </BreadcrumbItem>
            </template>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div class="inline-flex items-center justify-center">
        <ThemeProvider />
      </div>
    </div>
  </header>
</template>
