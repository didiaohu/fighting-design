<script lang="ts" setup name="FWatermark">
  import { Props } from './watermark'
  import { createBase64 } from '../../_utils'
  import { ref, onMounted } from 'vue'
  import { useFilterProps } from '../../_hooks/useFilterProps'
  import type { Ref, CSSProperties } from 'vue'
  import type { FPropsType } from './watermark'
  import type { CSSPropertiesInterface as a } from './interface'
  import type { createBase64NeedWatermarkPropsInterface as b } from '../../_interface'

  const prop = defineProps(Props)

  const watermarkStyleList: Ref<CSSProperties> = ref<CSSProperties>(
    null as unknown as CSSProperties
  )

  const baseWatermark: a = (): CSSProperties => {
    const needProps: b = useFilterProps<FPropsType, b>(prop, [
      'content',
      'width',
      'height',
      'fontSize',
      'fontColor'
    ]).getProps()

    const watermark: string = createBase64(needProps)

    return {
      backgroundImage: `url(${watermark})`
    } as CSSProperties
  }

  const imageWatermark: a = (): CSSProperties => {
    const { image, width, height } = prop

    return {
      backgroundImage: `url(${image})`,
      backgroundSize: `${width}px ${height}px`
    } as CSSProperties
  }

  onMounted((): void => {
    watermarkStyleList.value = prop.image ? imageWatermark() : baseWatermark()
  })
</script>

<template>
  <div
    :class="['f-watermark', { 'f-watermark-block': block }]"
    :style="[watermarkStyleList, { zIndex }]"
  >
    <slot />
  </div>
</template>
