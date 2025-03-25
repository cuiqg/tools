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
  }).url('请输入正确的 URL 地址'),
  algorithm: z.enum(['sha256', 'sha384', 'sha512'], {
    required_error: '哈希算法不能为空'
  }).default('sha384')
}))

const form = useForm({
  validationSchema: formSchema
})

const htmlRes = ref('')
const plainRes = ref('')
const isError = ref(false)

const digestName = (hashAlgorithm) => {
  let algorithm = ''
  switch (hashAlgorithm) {
    case 'sha256':
      algorithm = 'SHA-256'
      break
    case 'sha512':
      algorithm = 'SHA-512'
      break
    case 'sha384':
    default:
      algorithm = 'SHA-384'
      break
  }

  return algorithm
}

const parseContentType = (contentType) => {
  if (!contentType) {
    return null
  }
  const fileType = contentType.split(';')
  const isStylesheet = /^text\/css$/.test(fileType[0])
  const isScript = /^application\/javascript$/.test(fileType[0])

  if (isScript) {
    return 'script'
  }

  if (isStylesheet) {
    return 'style'
  }

  return null
}

const hashText = async (buffer, algorithm) => {
  const digest = await crypto.subtle.digest(
    digestName(algorithm),
    buffer
  )

  return digest
}

const integrityMetadata = async (buffer, algorithm) => {
  const hashBuffer = await hashText(buffer, algorithm)
  const base64string = btoa(
    String.fromCharCode(...new Uint8Array(hashBuffer))
  )

  return `${algorithm}-${base64string}`
}

let htmlEL = ''

const displayError = async (message = '无法获取资源') => {
  isError.value = true
  htmlEL = message
  plainRes.value = htmlEL
  htmlRes.value = await codeToHtml(htmlEL, {
    lang: 'text',
    theme: 'vitesse-light',
    defaultColor: false
  })
}

const displayResult = async (url, contentType, integrity) => {
  if (contentType) {
    switch (contentType) {
      case 'script':
        htmlEL = `<script src="${encodeURI(url)}" integrity="${integrity}"  crossorigin="anonymous"><\/script>`
        break
      case 'style':
        htmlEL = `<link href="${encodeURI(url)}" integrity="${integrity}" rel="stylesheet" crossorigin="anonymous"\/>`
        break
    }

    plainRes.value = htmlEL
    htmlRes.value = await codeToHtml(htmlEL, {
      lang: 'html',
      theme: 'vitesse-light',
      defaultColor: false
    })
  }
  else {
    displayError('类型不被支持')
  }
}

const onCopy = () => {
  navigator.clipboard.writeText(plainRes.value)
  toast.success('复制成功')
}

const onSubmit = form.handleSubmit(async (values) => {
  const { url, algorithm } = values

  plainRes.value = ''
  htmlRes.value = ''
  isError.value = false
  // eslint-disable-next-line no-console
  console.info('Trying: ', url)

  await fetch(url).then(async (response) => {
    // eslint-disable-next-line no-console
    console.info('Response: ', response)
    if (response.status === 200) {
      const type = response.headers.get('content-type')
      const contentType = parseContentType(type)
      const buffer = await response.arrayBuffer()
      const integrity = await integrityMetadata(buffer, algorithm)
      displayResult(url, contentType, integrity)
    }
    else {
      displayError()
    }
  }).catch(async (error) => {
    console.error('Fetch Error: ', error)
    displayError()
  })
})
</script>

<template>
  <div class="flex size-full items-center justify-center px-4 py-2">
    <div class="grid w-full max-w-screen-md gap-y-4">
      <form
        class="grid w-full grid-rows-3 gap-3 md:grid-cols-[1fr_auto_auto] md:grid-rows-none"
        @submit="onSubmit"
      >
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
                placeholder="资源 URL"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="algorithm"
        >
          <FormItem>
            <Select
              v-bind="componentField"
              default-value="sha384"
            >
              <FormControl>
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="选择哈希方式" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="sha256">
                    SHA-256
                  </SelectItem>
                  <SelectItem value="sha384">
                    SHA-384
                  </SelectItem>
                  <SelectItem value="sha512">
                    SHA-512
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button>
          <i-lucide:mouse-pointer-click />
          <span>生成哈希</span>
        </Button>
      </form>
      <div
        v-if="htmlRes && plainRes"
        class="grid w-full gap-y-3"
      >
        <Label class="text-muted-foreground">生成结果：</Label>
        <div class="relative">
          <div
            editable
            class="h-auto w-full max-w-screen-md rounded-md border border-zinc-200 p-3 text-sm leading-6 shadow-sm transition-colors selection:bg-zinc-900 selection:text-zinc-100 hover:cursor-copy dark:border-zinc-800 dark:selection:bg-zinc-100 dark:selection:text-zinc-900 [&_pre]:whitespace-pre-line [&_pre]:break-all [&_pre]:rounded-md [&_pre]:!bg-transparent [&_pre]:!text-current"
            :class="{
              'border-red-400': isError,
              'dark:border-red-800': isError,
            }"
            @dblclick="onCopy"
            v-html="htmlRes"
          />
          <Button
            v-if="plainRes && !isError"
            size="icon"
            variant="ghost"
            class="absolute bottom-1.5 right-1.5 [&_svg]:size-3"
            @click="onCopy"
          >
            <i-lucide:copy />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: SrihashPage
meta:
  title: SRI 哈希生成器
  description: 生成 SRI 哈希值
</route>
