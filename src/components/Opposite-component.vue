<script lang="ts">
/* eslint-disable */

import DividerGeneric from "@/components/misc/Divider-generic.vue";
export const componentName = "Opposite-component";
export default {
  name: componentName,
  inheritAttrs: false,
  components: { DividerGeneric },
};
</script>
<script setup lang="ts">
import {
  hexToRgb,
  hexToHSL,
  rgbArrayToRgbString,
  hslArrayToHslString,
} from "@/types/ColorCollection";
//eslint-disable-next-line
const props = defineProps({
  opposite_hex: { type: String, required: true },
});
</script>
<template>
  <DividerGeneric title="Opposite*" tag="BETA" tag_type="warning" />
  <n-card size="medium" class="relative max-w-2xl\mx-3">
    <div
      :style="{
        background: opposite_hex,
        color: opposite_hex,
      }"
      class="min-w-[128px] w-[128px] h-[128px] min-h-[128px] border-2 mx-auto rounded-tr-[1rem] rounded-bl-[1rem] flex flex-col"
    >
      <div class="w-full h-full text-center">\[T]/</div>
    </div>
    <div class="mx-auto my-5 text-lg mono align-center">
      HEX: {{ opposite_hex }} <br />
      RGB: {{ rgbArrayToRgbString(hexToRgb(opposite_hex)) }}
      <br />
      HSL: {{ hslArrayToHslString(hexToHSL(opposite_hex)) }}
      <br />
    </div>
  </n-card>
</template>
