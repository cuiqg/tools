<script setup>
import { codeToHtml } from 'shiki'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem
} from '@/components/ui/select'
import {
  FormControl,
  FormMessage,
  FormItem,
  FormField
} from '@/components/ui/form'

const formSchema = toTypedSchema(z.object({
  url: z.string({
    required_error: 'URL 地址不能为空'
  }).url('请输入正确的 URL 地址').default('https://hnd-jp-ping.vultr.com/vultr.com.100MB.bin'),
  host: z.string({
    required_error: '哈希算法不能为空'
  }).default('npee.cn')
}))

const form = useForm({
  validationSchema: formSchema
})

const htmlRes = ref('')
const plainRes = ref('')
const isError = ref(false)

const switchHost = async (host, url) => {
  let downloadUrl = ''

  switch (host) {
    case 'npee.cn':
      downloadUrl = `https://down.npee.cn/?${encodeURI(url)}`
      break
    case '2sb.org':
      downloadUrl = `https://get.2sb.org/${encodeURI(url)}`
      break
    case '99z.top':
      downloadUrl = `https://99z.top/${encodeURI(url)}`
      break
  }

  return downloadUrl
}

const displayError = async (message = '无法获取资源') => {
  isError.value = true
  plainRes.value = message
  htmlRes.value = await codeToHtml(message, {
    lang: 'text',
    theme: 'vitesse-light'
  })
}

const onCopy = () => {
  navigator.clipboard.writeText(plainRes.value)
  toast.success('复制成功')
}

const onOpen = () => {
  window.open(plainRes.value, '_blank', 'noopener,noreferrer')
}

const onSubmit = form.handleSubmit(async (values) => {
  const { url, host } = values
  isError.value = false

  const downloadUrl = await switchHost(host, url)
  // eslint-disable-next-line no-console
  console.info('Connect Download URL: ', downloadUrl)
  plainRes.value = downloadUrl
  htmlRes.value = await codeToHtml(downloadUrl, {
    lang: 'text',
    theme: 'vitesse-light'
  })
}, () => {
  displayError()
})
</script>

<template>
  <div class="flex size-full items-center justify-center px-4 py-2">
    <div class="grid w-full max-w-screen-md gap-y-20">
      <div class="flex w-full items-center justify-center">
        <h1 class="font-serif text-4xl leading-none  text-foreground">
          {{ $route.meta?.title }}
        </h1>
      </div>
      <form
        class="grid w-full grid-rows-3 gap-3 md:grid-cols-[auto_1fr_auto] md:grid-rows-none"
        @submit="onSubmit"
      >
        <FormField
          v-slot="{ componentField }"
          name="host"
        >
          <FormItem>
            <Select
              v-bind="componentField"
              default-value="npee.cn"
            >
              <FormControl>
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="选择下载HOST" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="99z.top">
                    99z.top
                  </SelectItem>
                  <SelectItem value="2sb.org">
                    2sb.org
                  </SelectItem>
                  <SelectItem value="npee.cn">
                    npee.cn
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="url"
        >
          <FormItem>
            <FormControl>
              <Input
                v-bind="componentField"
                type="url"
                class="w-full"
                placeholder="文件链接"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button>
          <i-lucide:mouse-pointer-click />
          <span>生成下载链接</span>
        </Button>
      </form>
      <div
        v-if="plainRes && htmlRes"
        class="grid w-full gap-y-3"
      >
        <Label class="text-muted-foreground">生成结果：</Label>
        <div class="relative">
          <div
            editable
            class="h-auto w-full max-w-screen-md rounded-md border border-zinc-200 p-3 text-sm leading-6 shadow-sm transition-colors selection:bg-zinc-900 selection:text-zinc-100 hover:cursor-pointer dark:border-zinc-800 dark:selection:bg-zinc-100 dark:selection:text-zinc-900 [&_pre]:whitespace-pre-line [&_pre]:break-all [&_pre]:rounded-md [&_pre]:!bg-transparent [&_pre]:!text-current"
            :class="{
              'border-red-400': isError,
              'dark:border-red-800': isError,
            }"
            @click="onCopy"
            v-html="htmlRes"
          />
          <Button
            v-if="plainRes && !isError"
            size="icon"
            variant="ghost"
            class="absolute right-1.5 top-1/2 -translate-y-1/2 [&_svg]:size-4"
            @click="onOpen"
          >
            <i-lucide:app-window />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: DownloaderPage
meta:
  title: 文件加速下载
  description: 生成加速下载链接
</route>
