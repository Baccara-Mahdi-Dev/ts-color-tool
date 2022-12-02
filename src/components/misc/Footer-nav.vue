<script lang="ts">
export const componentName = "Footer-Nav";
export default {
  name: componentName,
  inheritAttrs: false,
  customOptions: {},
  components: {},
};
</script>
<script setup lang="ts">
import { ref } from "vue";
import { PaintBrush16Filled } from "@vicons/fluent";
import { WaterDropSharp, InvertColorsFilled } from "@vicons/material"; //!material icons slow down build, find alternative!
const spin_clk = ref(false);
const drop_shw = ref(false);
const spinning = () => {
  spin_clk.value = true;
  drop_shw.value = !drop_shw.value;
  setTimeout(() => {
    spin_clk.value = false;
  }, 1000);
};
</script>
<template>
  <div
    :class="[drop_shw ? 'min-h-[69px]' : 'h-[48px]']"
    class="fixed bottom-0 left-0 z-10 w-full bg-black border-t-2 mono h-fit rounded-xl border-t-white"
  >
    <div class="relative flex justify-end w-full h-full">
      <button
        :class="{ 'animate-spin duration-75 ease-in': spin_clk }"
        @click="spinning"
        class="absolute top-0 h-auto px-2 py-1 -my-8 text-white bg-black border-2 border-white rounded-full hover:duration-300 hover:ease-in-out w-fit hover:text-emerald-200 hover:border-emerald-200"
      >
        <n-icon
          class="rotate-45 transform-gpu"
          :component="PaintBrush16Filled"
          size="48"
        />
      </button>
    </div>
    <Transition name="bounce">
      <div
        v-show="drop_shw"
        class="flex justify-between w-full h-full min-h-[69px]"
      >
        <router-link
          @click="
            () => {
              drop_shw.value = false;
            }
          "
          :to="{ name: 'home' }"
          class="min-h-[69px] flex items-center justify-center text-center w-1/3 h-full border-r-2 py-3 rounded-tl-xl border-x-white hover:bg-white hover:text-black hover:fill-black"
        >
          <div>
            <n-icon
              class="text-emerald-400"
              :component="WaterDropSharp"
              size="36"
            />
            <p>Mono-chrome</p>
          </div>
        </router-link>
        <router-link
          @click="
            () => {
              drop_shw.value = false;
            }
          "
          :to="{ name: 'mix' }"
          class="min-h-[69px] flex items-center justify-center text-center w-1/3 h-full border-l-2 py-3 rounded-tr-xl border-x-white hover:bg-white hover:text-black hover:fill-black"
        >
          <div>
            <div class="relative">
              <n-icon
                class="translate-l-1 text-rose-500 translate-b-1"
                :component="InvertColorsFilled"
                size="30"
              />
              <div
                class="absolute inset-0 top-0 z-10 flex items-center justify-center"
              >
                <n-icon
                  class="text-emerald-400 mirror"
                  :component="InvertColorsFilled"
                  size="36"
                />
              </div>
            </div>
            <p>Mixin-chrome</p>
          </div>
        </router-link>
      </div>
    </Transition>
  </div>
</template>
<style>
.mirror {
  transform: scale(-1, 1);
}
.smooth-enter-active,
.smooth-leave-active {
  transition: max-height 0.5s;
}
.smooth-enter,
.smooth-leave-to {
  max-height: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
