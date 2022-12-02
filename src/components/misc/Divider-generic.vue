<script lang="ts">
export const componentName = "Divider-generic";
export default {
  name: componentName,
  inheritAttrs: false,
  customOptions: {},
};
</script>
<script setup lang="ts">
//eslint-disable-next-line
const props = defineProps({
  title: { type: String, required: true },
  tag: { type: String, default: " " },
  tag_type: { default: "info", type: String },
});
const tagClassToColor = (tag_c: string): string => {
  console.log(tag_c);
  switch (tag_c) {
    case "info":
      return "cyan";
    case "success":
      return "green";
    case "warning":
      console.log("doit");
      return "orange";
    case "error":
      return "red";
    default:
      return "slate";
  }
};
// eslint-disable-next-line
</script>
<template>
  <div class="relative flex mt-5 mb-3">
    <h3 class="px-6 py-1 my-auto text-3xl font-extrabold uppercase">
      <n-text :type="tag_type"> {{ title }} </n-text>
    </h3>
    <hr
      class="my-auto ml-3 border-2"
      :class="[
        tag_type
          ? (() => {
              return `w-3/5 border-` + tagClassToColor(tag_type) + `-300`;
            })()
          : 'border-slate-300 w-4/5 ',
      ]"
    />
    <small
      v-if="tag"
      class="my-auto mono \absolute \top-0 \right-0 block text-xs"
    >
      <n-tag :bordered="true" :type="tag_type"> {{ tag }} </n-tag>
    </small>
  </div>
</template>
