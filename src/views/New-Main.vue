<script lang="ts">
import { defineAsyncComponent } from "vue";
import LoaderSm from "@/components/misc/Loader-small.vue";
export const componentName = "Alt-Vers";
const ShadesComponent = defineAsyncComponent({
  loader: () => import("@/components/Shades-component.vue"),
  loadingComponent: LoaderSm,
  delay: 300,
  errorComponent: LoaderSm,
  timeout: 6000,
});
const OppositeComponent = defineAsyncComponent({
  loader: () => import("@/components/Opposite-component.vue"),
  loadingComponent: LoaderSm,
  delay: 300,
  errorComponent: LoaderSm,
  timeout: 6000,
});
export default {
  name: componentName,
  inheritAttrs: false,
  customOptions: {},
  components: { ShadesComponent, OppositeComponent },
};
</script>
<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
// eslint-disable-next-line
import { GithubAlt } from "@vicons/fa";
// eslint-disable-next-line
import {
  ClipboardCode24Regular,
  Info24Filled,
  Clipboard24Regular,
  ArrowRepeatAll20Filled,
} from "@vicons/fluent";
import { useNotification, NotificationType } from "naive-ui";
import {
  complimentHex,
  hexToRgb,
  hexToHSL,
  getDarkerShadesOfHex,
  getLightenShadesOfHex,
  rgbArrayToRgbString,
  hslArrayToHslString,
  rndHexColour,
} from "@/types/ColorCollection";
const notification = useNotification();
const notify = (title: string, type: NotificationType, sub = ""): void => {
  notification[type]({
    content: title,
    meta: sub,
    duration: 2500,
    keepAliveOnHover: true,
  });
};
//base
const base_colour_hex = ref("#0ab4b0");
const bc_rgb = ref([10, 180, 176]);
const bc_hsl = ref([179, 89.5, 37.3]);
// opposite
const opposite_hex = ref(complimentHex(base_colour_hex.value));
// light shades
const light_shades = ref([""]);
// dark_shades
const dark_shades = ref([""]);

// eslint-disable-next-line
const copyAll = () => {
  const txt = `
    /*
       hex: ${base_colour_hex.value}
       rgb: ${rgbArrayToRgbString(bc_rgb.value)}
       hsl: ${hslArrayToHslString(bc_hsl.value)}
    */
    `;
  const storage = document.createElement("textarea");
  storage.style.display = "none";
  storage.value = txt;
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
  //// if (window.isSecureContext && navigator.clipboard) { navigator.clipboard .writeText(storage.value) .then(() => { notify("Copied!", "info"); }) .catch((e) => { //:c something went wrong console.error(e); notify(":c something went wrong", "error"); }); } else { try { document.execCommand("copy"); notify("Copied!", "info"); } catch (e) { console.error("Unable to copy to clipboard", e); notify(":c something went wrong", "error"); } }
  storage.remove();
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
const rng = (): void => {
  base_colour_hex.value = rndHexColour();
};
onBeforeMount(() => {
  base_colour_hex.value = rndHexColour();
  const v = base_colour_hex.value;
  bc_rgb.value = hexToRgb(v);
  bc_hsl.value = hexToHSL(v);
  opposite_hex.value = complimentHex(v);
  dark_shades.value = getDarkerShadesOfHex(v, 10);
  light_shades.value = getLightenShadesOfHex(v, 10);
});
watch(base_colour_hex, () => {
  const v = base_colour_hex.value;
  bc_rgb.value = hexToRgb(v);
  bc_hsl.value = hexToHSL(v);
  opposite_hex.value = complimentHex(v);
  dark_shades.value = getDarkerShadesOfHex(v, 10);
  light_shades.value = getLightenShadesOfHex(v, 10);
});
</script>
<template>
  <!--
    TODO LIST:
      + divide in smaller async components
      //+ change cc class to exportable singleton functions { it would make more sense due to the names}
        ?+ find how to concatenate fn eg: aBC().dEF()
      + menu bar on bottom on mobile and on side on big screen
        + menubar content:
          + horiz [ monocromo (logo ) gradient ]
          + vertical [ generic vertical thingy ??? ]
      !kinda.... // ?+ TSC with waves!!!
      + make rgb && hsl interactable
    -----------------------------
    //? opposite on bottom
    ? play around with watch
    ===========LEGGEND==========
    ?+ possibile hing to
    + todos...
    ? should be done ?
    // done
  -->
  <div class="mt-4 mb-8 mx-3 md:mx-2 h-screen min-h-[80vh] text-slate-100">
    <h1 class="z-10 text-center text-9xl mono gradient-text">TCT</h1>
    <div class="w-full lg:flex lg:flex-row-reverse lg:justify-evenly h-fit">
      <n-space justify="center" class="my-5">
        <!-- ========== START MAIN COLOR BOX ========== -->
        <div
          :style="{ background: base_colour_hex }"
          class="w-full min-w-[250px] min-h-[200px] lg:min-w-[300px] h-full border-2 lg:border-4 rounded-tl-[3rem] rounded-br-[3rem]"
        ></div>
        <!-- ========== END MAIN COLOR BOX ========== -->
        <!-- ========== START OPTION AREA BUTTONS ========== -->
        <div
          class="relative flex flex-row px-6 py-2 mx-auto mt-3 text-center align-middle border-2 sm:my-auto sm:flex sm:px-3 sm:flex-col w-fit h-fit sm:-order-last border-slate-400 rounded-xl gap-y-3 sm:gap-y-0 lg:h-full lg:gap-y-3 text-slate-400"
        >
          <h3 class="my-auto">Options</h3>
          <n-popover trigger="hover">
            <template #trigger>
              <n-button
                class="mx-auto my-3 md:scale-125 lg:scale-150"
                strong
                secondary
                circle
                type="info"
                size="large"
                color="#FFFFFF"
                @click="copyAll()"
              >
                <n-icon :component="ClipboardCode24Regular" size="32"> </n-icon>
              </n-button>
            </template>
            <span>Copy hex, rgb and hsl in a click! </span>
          </n-popover>
          <n-popover trigger="hover">
            <template #trigger>
              <n-button
                class="mx-auto my-3 md:scale-125 lg:scale-150"
                disabled
                strong
                secondary
                circle
                type="info"
                size="large"
                color="#FFFFFF"
              >
                <n-icon :component="Info24Filled" size="32"> </n-icon
                ><!-- how does it work -->
              </n-button>
            </template>
            <span>Something something... </span>
          </n-popover>
          <n-popover trigger="hover">
            <template #trigger>
              <n-button
                class="mx-auto my-3 md:scale-125 lg:scale-150"
                strong
                secondary
                circle
                type="info"
                size="large"
                color="#FFFFFF"
                @click="rng()"
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
                class="mx-auto my-3 md:scale-125 lg:scale-150"
                strong
                secondary
                circle
                type="info"
                @click="notify('todo :/', 'warning')"
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
      </n-space>
      <!-- ========== START HEX RGB HSL==========-->
      <div class="px-10 md:px-0">
        <fieldset
          class="flex flex-row w-full px-4 pt-2 pb-4 mx-5 my-auto align-middle border md:mx-2 wrap rounded-xl text-slate-100 overflow-clip"
        >
          <legend class="ml-5">&nbsp;&nbsp;HEX&nbsp;&nbsp;</legend>
          <n-color-picker
            class="w-full min-h-[65px] rounded-md"
            v-model:value="base_colour_hex"
            :modes="['hex']"
            :show-alpha="false"
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
        </fieldset>
        <fieldset
          class="flex min-h-[65px] flex-row px-4 pt-2 pb-4 mx-5 md:mx-2 align-middle border wrap w-full my-auto rounded-xl text-slate-100"
        >
          <legend class="ml-5">&nbsp;&nbsp;HSL&nbsp;&nbsp;</legend>
          <div
            class="text-slate-100 w-full min-w-[42px] h-fit rounded-md flex justify-center py-1 align-middle"
            :style="{ background: base_colour_hex }"
          >
            <div
              :class="[
                bc_hsl[2] > 33
                  ? 'bg-black text-slate-300'
                  : 'bg-slate-300 text-black',
              ]"
              class="min-w-[42px] w-fit h-full text-center flex m-2 py-2 px-4 bg-opacity-30 backdrop-blur-lg"
            >
              <span class="mono">{{ bc_hsl[0] }}°</span>
            </div>
            <div
              :class="[
                bc_hsl[2] > 33
                  ? 'bg-black text-slate-300'
                  : 'bg-slate-300 text-black',
              ]"
              class="min-w-[42px] w-fit h-full text-center flex m-2 py-2 px-4 bg-opacity-30 backdrop-blur-lg"
            >
              <span class="mono">{{ bc_hsl[1] }}%</span>
            </div>
            <div
              :class="[
                bc_hsl[2] > 33
                  ? 'bg-black text-slate-300'
                  : 'bg-slate-300 text-black',
              ]"
              class="min-w-[42px] w-fit h-full text-center flex m-2 py-2 px-4 bg-opacity-30 backdrop-blur-lg"
            >
              <span class="mono">{{ bc_hsl[2] }}%</span>
            </div>
          </div>
          <n-button
            ghost
            color="#EEEEEE"
            class="h-full p-4 mx-3"
            strong
            secondary
            size="large"
            @click="copy(hslArrayToHslString(bc_hsl))"
          >
            <n-icon :component="Clipboard24Regular" size="32"> </n-icon>
          </n-button>
        </fieldset>
        <fieldset
          class="flex min-h-[65px] flex-row px-4 mx-5 md:mx-2 align-middle border wrap w-full my-auto rounded-xl text-slate-100 pt-2 pb-4"
        >
          <!-- :style="{ 'border-color': base_colour_hex ?? '#b4004b' }" -->
          <legend class="ml-5">&nbsp;&nbsp;RGB&nbsp;&nbsp;</legend>
          <div
            class="w-full min-w-[42px] h-fit rounded-md flex justify-center p-1 align-middle"
            :style="{ background: base_colour_hex }"
          >
            <div
              :class="[
                bc_rgb[0] > 42 && bc_rgb[1] > 42 && bc_rgb[2] > 42
                  ? 'bg-black text-slate-300'
                  : 'bg-slate-300 text-black',
              ]"
              class="min-w-[42px] w-fit h-full text-center flex m-2 py-2 px-4 bg-opacity-30 backdrop-blur-lg"
            >
              <span class="mono">{{ bc_rgb[0] }}</span>
            </div>
            <div
              :class="[
                bc_rgb[0] > 42 && bc_rgb[1] > 42 && bc_rgb[2] > 42
                  ? 'bg-black text-slate-300'
                  : 'bg-slate-300 text-black',
              ]"
              class="min-w-[42px] w-fit h-full text-center flex m-2 py-2 px-4 bg-opacity-30 backdrop-blur-lg"
            >
              <span class="mono">{{ bc_rgb[1] }}</span>
            </div>
            <div
              :class="[
                bc_rgb[0] > 42 && bc_rgb[1] > 42 && bc_rgb[2] > 42
                  ? 'bg-black text-slate-300'
                  : 'bg-slate-300 text-black',
              ]"
              class="min-w-[42px] w-fit h-full text-center flex m-2 py-2 px-4 bg-opacity-30 backdrop-blur-lg"
            >
              <span class="mono">{{ bc_rgb[2] }}</span>
            </div>
          </div>
          <n-button
            ghost
            color="#EEEEEE"
            class="h-full p-4 mx-3"
            strong
            secondary
            size="large"
            @click="copy(rgbArrayToRgbString(bc_rgb))"
          >
            <n-icon :component="Clipboard24Regular" size="32"> </n-icon>
          </n-button>
        </fieldset>
      </div>
      <!-- ==========  END HEX RGB HSL==========-->
    </div>
    <!-- ========== START OPPOSITE AND SHADES ========== -->
    <div class="mb-8 md:flex md:justify-center md:gap-x-5 md:flex-wrap">
      <span class="mx-auto w-full md:w-[45%]">
        <ShadesComponent
          :light_shades="light_shades"
          :dark_shades="dark_shades"
        />
      </span>
      <span class="px-5 mx-auto w-full md:w-[45%]">
        <OppositeComponent :opposite_hex="opposite_hex ?? '#0A01A0'" />
      </span>
    </div>
    <br />
    <br />
    <br />
    <br />
    <!-- ========== END OPPOSITE AND SHADES ========== -->
  </div>
</template>
