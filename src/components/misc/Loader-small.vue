<script lang="ts">
export const componentName = "Loader-small";
export default {
  name: componentName,
  inheritAttrs: false,
  customOptions: {},
};
</script>
<template>
  <div class="flex justify-center w-full py-5 my-5h-fit">
    <div
      class="px-4 py-4 border-2 border-white rounded-lg animate-pulse w-fit h-fit"
    >
      <div class="dot-bricks"></div>
      <small class="italic"></small>
    </div>
  </div>
</template>
