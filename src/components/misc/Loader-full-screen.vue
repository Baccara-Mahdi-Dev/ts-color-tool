<script lang="ts">
export const componentName = "Loader-full-screen";
export default {
  name: componentName,
  inheritAttrs: false,
  customOptions: {},
};
</script>
<template>
  <div class="fixed w-screen h-screen z-[999999999] py-60">
    <div class="flex items-center justify-center my-auto space-x-2">
      <div
        class="px-4 py-4 border-2 border-white rounded-lg animate-pulse w-fit h-fit"
      >
        <div class="dot-bricks"></div>
      </div>
    </div>

    <div class="mt-8 text-xs font-light text-center text-gray-500">
      Please wait...
    </div>
  </div>
</template>
