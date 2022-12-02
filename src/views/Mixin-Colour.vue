<script lang="ts">
export const componentName = "Mixin-Colours";
export default {
  name: componentName,
  inheritAttrs: false,
  customOptions: {},
  components: {},
};
</script>
<script setup lang="ts">
import { ref, onBeforeMount, watch } from "vue";
import {
  hslArrayToHslString,
  rndHslColour,
  hueReverse,
} from "@/types/ColorCollection";
import { useNotification, NotificationType } from "naive-ui";
const notification = useNotification();

// eslint-disable-next-line
import { GithubAlt } from "@vicons/fa";
// eslint-disable-next-line
import {
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowNarrowLeft,
  ArrowNarrowRight,
  ArrowNarrowUp,
  ArrowUpLeft,
  ArrowUpRight,
} from "@vicons/tabler";
// eslint-disable-next-line
import {
  ClipboardCode24Regular,
  Info24Filled,
  Clipboard24Regular,
  ArrowSplit20Regular,
  ArrowRepeatAll20Filled,
} from "@vicons/fluent";
type color_t = "hsl" | "rgb" | "hex";
let h: color_t = "hex";
const current_type = ref(h);
const cl_1 = ref("");
const cl_2 = ref("");
const bg = ref("");
const deg = ref(
  ((Math.random() * 10) % 2 ? "" : "-") +
    Math.floor(Math.random() * (360 - 1 + 1) + 1)
);
/* yoinked from my own site */
/** could be rename to random and keep shuffle for inversion */
const shuffleBg = () => {
  const hsl = rndHslColour(100);
  cl_1.value = "hsl(" + hsl[0] + "," + hsl[1] + "%," + hsl[2] + "%)";
  deg.value =
    ((Math.random() * 10) % 2 ? "" : "-") +
    Math.floor(Math.random() * (360 - 1 + 1) + 1);
  cl_2.value =
    "hsl(" + hueReverse(hsl[1], hsl[0]) + "," + hsl[1] + "%," + 70 + "%)";
};
const copy = (msg = "some text"): void => {
  const storage = document.createElement("textarea");
  storage.style.display = "none";
  storage.value = msg;
  storage.select();
  storage.setSelectionRange(0, 99999);
  navigator.clipboard
    .writeText(storage.value)
    .then(() => {
      notify("Copied!", "info");
    })
    .catch((e) => {
      //:c something went wrong
      console.error(e);
      notify(":c something went wrong", "error");
    });
  storage.remove();
};
// eslint-disable-next-line
const notify = (title: string, type: NotificationType, sub = ""): void => {
  notification[type]({
    content: title,
    meta: sub,
    duration: 2500,
    keepAliveOnHover: true,
  });
};
const degSet = (grad: number): void => {
  deg.value = grad;
};
onBeforeMount(() => {
  let rndHsl = rndHslColour();

  cl_1.value = hslArrayToHslString(rndHsl);
  rndHsl = [
    parseFloat(hueReverse(rndHsl[0], rndHsl[1]).toFixed(2)),
    parseFloat(rndHsl[1].toFixed(2)),
    parseFloat(rndHsl[2].toFixed(2)),
  ];
  cl_2.value = hslArrayToHslString(rndHsl);
  bg.value = `linear-gradient( ${deg.value}deg, ${cl_1.value}, ${cl_2.value})`;
});
watch(deg, () => {
  bg.value = `linear-gradient( ${deg.value}deg, ${cl_1.value}, ${cl_2.value})`;
});
watch(cl_1, () => {
  bg.value = `linear-gradient( ${deg.value}deg, ${cl_1.value}, ${cl_2.value})`;
});
watch(cl_2, () => {
  bg.value = `linear-gradient( ${deg.value}deg, ${cl_1.value}, ${cl_2.value})`;
});
</script>
<template>
  <div class="my-4 mx-3 md:mx-2 h-fit min-h-[80vh] text-slate-100">
    <n-space justify="center" class="relative mb-5">
      <h1 class="z-10 text-9xl mono gradient-text">TCT</h1>
    </n-space>
    <div class="w-full h-full md:flex md:flex-row-reverse md:justify-evenly">
      <!-- ========== START OPTION AREA BUTTONS ========== -->
      <n-space justify="center" class="\w-full px-10 mb-5 md:my-auto md:px-0">
        <div
          :style="{ background: bg }"
          class="grid align-middle place-items-center w-[400px] px-4 py-8 \w-fit h-[400px] border-2 md:border-4 rounded-tl-[3rem] my-auto rounded-br-[3rem]"
        >
          <p
            @click="copy(bg)"
            class="py-3 mx-auto text-xs font-bold text-center border-2 border-white w-fit h-fit bg-slate-900 bg-opacity-20 backdrop-blur-xl mono"
          >
            {{ bg }}
          </p>
        </div>
      </n-space>
      <div
        class="relative flex px-6 py-2 mx-auto my-5 text-center align-middle border-2 md:my-auto md:flex md:px-3 md:flex-col w-fit h-fit md:-order-last border-slate-400 rounded-xl gap-y-3 md:gap-y-0 text-slate-400"
      >
        <h3 class="my-auto">Options</h3>

        <n-popover trigger="hover">
          <template #trigger>
            <n-button
              class="mx-auto md:scale-125 md:my-auto lg:scale-150 lg:my-6"
              strong
              secondary
              circle
              type="info"
              size="large"
              color="#FFFFFF"
              @click="copy(bg)"
            >
              <n-icon :component="ClipboardCode24Regular" size="32"> </n-icon>
            </n-button>
          </template>
          <span>Copy the css needed </span>
        </n-popover>
        <n-popover trigger="hover">
          <template #trigger>
            <n-button
              disabled
              class="mx-auto md:scale-125 md:my-auto lg:scale-150 lg:my-6"
              strong
              secondary
              circle
              type="info"
              size="large"
              color="#FFFFFF"
            >
              <n-icon :component="Info24Filled" size="32"> </n-icon>
              <!-- how does it work -->
            </n-button>
          </template>
          <span>Something something... </span>
        </n-popover>
        <n-popover trigger="hover">
          <template #trigger>
            <n-button
              class="mx-auto md:scale-125 md:my-auto lg:scale-150 lg:my-6"
              strong
              secondary
              circle
              type="info"
              size="large"
              color="#FFFFFF"
              @click="shuffleBg()"
            >
              <n-icon :component="ArrowRepeatAll20Filled" size="32"> </n-icon>
              <!-- how does it work -->
            </n-button>
          </template>
          <span>Shuffle </span>
        </n-popover>
        <n-popover trigger="hover">
          <template #trigger>
            <n-button
              class="mx-auto md:scale-125 md:my-auto lg:scale-150 lg:my-6"
              strong
              secondary
              circle
              type="info"
              @click="
                copy('https://github.com/Baccara-Mahdi-Dev/ts-color-tool')
              "
              size="large"
              color="#FFFFFF"
            >
              <n-icon :component="GithubAlt" size="32"> </n-icon
              ><!-- link to repo -->
            </n-button>
          </template>
          <span>Go to the repo </span>
        </n-popover>
      </div>
      <!-- ========== END OPTION AREA BUTTONS ========== -->
      <!-- ========== START clrs ========== -->
      <div class="block px-8 mx-auto my-5 md:px-2 w-fit \md:w-3/12">
        <fieldset
          class="block w-full px-6 pt-2 pb-4 mx-auto mb-5 align-middle border md:my-auto wrap rounded-xl text-slate-100 overflow-clip"
        >
          <legend class="ml-5">&nbsp;&nbsp;Rotation&nbsp;&nbsp;</legend>
          <n-button-group class="my-5">
            <n-button @click="degSet(0)" round>
              <n-icon :component="ArrowDown" />
            </n-button>
            <n-button @click="degSet(90)" ghost>
              <n-icon :component="ArrowNarrowLeft" />
            </n-button>
            <n-button @click="degSet(180)" ghost>
              <n-icon :component="ArrowNarrowUp" />
            </n-button>
            <n-button @click="degSet(-90)" ghost>
              <n-icon :component="ArrowNarrowRight" />
            </n-button>
            <n-button @click="degSet(200)" ghost>
              <n-icon :component="ArrowUpRight" />
            </n-button>
            <n-button @click="degSet(-330)" ghost>
              <n-icon :component="ArrowDownLeft" />
            </n-button>
            <n-button @click="degSet(330)" ghost>
              <n-icon :component="ArrowUpLeft" />
            </n-button>
            <n-button @click="degSet(-300)" round>
              <n-icon :component="ArrowDownRight" />
            </n-button>
          </n-button-group>
          <n-slider
            v-model:value="deg"
            :default-value="deg"
            keayboard
            :max="360"
            :min="-360"
          >
            <template #thumb>
              <n-icon-wrapper :size="24" :border-radius="12">
                <n-icon :size="18" :component="ArrowSplit20Regular" />
              </n-icon-wrapper>
            </template>
          </n-slider>
        </fieldset>
        <fieldset
          class="block w-full px-6 pt-2 pb-4 mx-auto mb-5 align-middle border md:my-auto wrap rounded-xl text-slate-100 overflow-clip"
        >
          <legend class="ml-5">&nbsp;&nbsp;Mixin&nbsp;&nbsp;</legend>
          <span class="flex flex-row w-full py-2 h-fit">
            <n-color-picker
              :modes="[current_type]"
              class="w-full min-h-[65px] rounded-md"
              v-model:value="cl_1"
              :show-alpha="false"
              :show-preview="true"
              :swatches="[
                '#FFFFFF',
                '#18A058',
                '#2080F0',
                '#F0A020',
                'rgba(208, 48, 80, 1)',
              ]"
            />
            <n-button
              ghost
              color="#EEEEEE"
              class="h-full p-4 mx-3"
              strong
              secondary
              size="large"
              @click="copy(base_colour_hex)"
            >
              <n-icon :component="Clipboard24Regular" size="32"> </n-icon>
            </n-button>
          </span>
          <br />
          <span class="flex flex-row w-full py-2 h-fit">
            <n-color-picker
              :modes="[current_type]"
              class="w-full min-h-[65px] rounded-md"
              v-model:value="cl_2"
              :show-alpha="false"
              :show-preview="true"
              :swatches="[
                '#FFFFFF',
                '#18A058',
                '#2080F0',
                '#F0A020',
                'rgba(208, 48, 80, 1)',
              ]"
            />
            <n-button
              ghost
              color="#EEEEEE"
              class="h-full p-4 mx-3"
              strong
              secondary
              size="large"
              @click="copy(cl_2)"
            >
              <n-icon :component="Clipboard24Regular" size="32"> </n-icon>
            </n-button>
          </span>
        </fieldset>
      </div>
      <!-- ========== END clrs ========== -->
    </div>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<style scoped></style>
