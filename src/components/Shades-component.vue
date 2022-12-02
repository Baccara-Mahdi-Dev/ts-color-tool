<script lang="ts">
import DividerGeneric from "@/components/misc/Divider-generic.vue";
export const componentName = "Shades-component";
export default {
  name: componentName,
  inheritAttrs: false,
  components: { DividerGeneric },
};
</script>
<script setup lang="ts">
//eslint-disable-next-line
const props = defineProps({
  light_shades: { type: Array, required: true },
  dark_shades: { type: Array, required: true },
});
</script>
<template>
  <DividerGeneric title="Shades*" tag="BETA" tag_type="warning" />
  <n-card
    title="Lighter"
    size="medium"
    class="relative max-w-2xl min-w-[45%] px-2 m-3 overflow-clip"
  >
    <div class="flex py-5 overflow-x-auto gap-x-5">
      <button
        v-for="ls in light_shades"
        :key="ls"
        :style="{
          background: ls,
        }"
        class="flex-none hover:scale-110 ease-linear duration-300 w-[120px] h-[120px] border-2 mx-auto rounded-[1rem] align-middle text-center mono"
      >
        <n-tag class="my-auto bg-opacity-25 backdrop-blur-xl bg-slate-400">
          {{ ls }}
        </n-tag>
      </button>
    </div>
  </n-card>
  <n-card
    title="Darker"
    size="medium"
    class="relative max-w-2xl px-2 m-3 overflow-clip"
  >
    <div class="flex py-5 overflow-x-auto gap-x-5">
      <button
        v-for="ds in dark_shades"
        :key="ds"
        :style="{
          background: ds,
          box,
        }"
        class="flex-none hover:scale-110 ease-linear duration-300 w-[120px] h-[120px] border-2 mx-auto rounded-[1rem] align-middle text-center mono"
      >
        <n-tag class="my-auto bg-opacity-25 backdrop-blur-xl bg-slate-400">
          {{ ds }}
        </n-tag>
      </button>
    </div>
  </n-card>
</template>
