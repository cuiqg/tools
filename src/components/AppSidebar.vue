<script setup>
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar'
import Logo from '@/assets/img/logo.png'
import LogoDark from '@/assets/img/logo_dark.png'
import menus from '@/data/menus'

import pkgJson from '@/../package.json'

const githubUrl = computed(() => (import.meta.env.VITE_APP_GITHUB))
const appTitle = computed(() => (import.meta.env.VITE_APP_TITLE))

const isDark = useDark()
const pkgLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    pkgLoading.value = false
  }, 1600)
})
</script>

<template>
  <Sidebar collapsible="offcanvas">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:h-auto data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            as-child
          >
            <RouterLink
              v-slot="{ href, navigate }"
              custom
              to="/"
            >
              <a
                :href="href"
                class="grid grid-cols-[auto_1fr] gap-x-2 leading-none"
                @click="navigate"
              >

                <div
                  class="flex aspect-square size-8 items-center justify-center text-sidebar-primary-foreground"
                >
                  <img
                    :src="isDark ? LogoDark : Logo"
                    class="size-full object-contain object-center"
                    alt="logo"
                  >
                </div>
                <div class="gap-0.2 flex flex-row items-center justify-start text-lg font-semibold leading-none">
                  {{ appTitle }}<span class="ml-1 text-3xl text-blue-600">.</span>
                </div>
              </a>
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarSeparator />
    <SidebarContent>
      <SidebarGroup
        v-for="item in Object.keys(menus)"
        :key="item"
      >
        <SidebarGroupLabel>
          {{ item }}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="childItem of menus[item]"
              :key="childItem"
            >
              <RouterLink
                v-slot="{ href, navigate, isActive }"
                custom
                :to="childItem.link"
              >
                <SidebarMenuButton
                  as-child
                  :is-active="isActive"
                >
                  <a
                    :href="href"
                    class="tracking-widest"
                    @click="navigate"
                  >
                    <div
                      v-if="childItem.icon"
                      class="size-4 [&>svg]:size-full"
                      v-html="childItem.icon"
                    />
                    <span>
                      {{ childItem.title }}
                    </span>
                  </a>
                </SidebarMenuButton>
              </RouterLink>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuSkeleton
            v-if="pkgLoading"
            show-icon
          />
          <SidebarMenuButton
            v-else
            as-child
            class="flex select-none flex-row items-center justify-start gap-x-1"
          >
            <a
              :href="githubUrl"
              target="_blank"
            >
              <i-lucide:info class="text-zinc-400" />
              <span class="leading-none text-zinc-600 dark:text-zinc-400">
                {{ `v${pkgJson.version}` }}
              </span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
