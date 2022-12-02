<template>
  <n-config-provider :theme="darkTheme" :date-locale="dateItIT">
    <n-global-style />
    <n-notification-provider>
      <router-view />
      <Supsense>
        <template #default> <FooterNav /> </template>
        <template #fallback> <LoaderSm /> </template>
      </Supsense>
    </n-notification-provider>
    <n-alert
      title="Webapp still in beta"
      type="warning"
      class="fixed top-0 left-0 right-0 z-40 font-bold"
      closable
    />
  </n-config-provider>
  <!--
                           .. : : : : : : ..
                         :                   :
                        :   ------   ------   :
                        :    . . .    . . .   :
                        :   :  @  :  :  @  :  :
      -------UUUU---------------- :  : --------------UUUU---------
      |                           :  :                           |
      |                           `--'                           |
      |                                                          |
      |                 Close the editor and enojy the APP!      |
      |                                                          |
      |                       Made by Baccara M.!                |
      |                                                          |
      |    website: https://baccara-dev.netlify.app              |
      |    git: https://github.com/Baccara-Mahdi-Dev             |
      |    LinkedIn: https://it.linkedin.com/in/mahdi-baccara    |
      |                                                          |
      ------------------------------------------------------------
  -->
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import { darkTheme, dateItIT } from "naive-ui";
import LoaderSm from "@/components/misc/Loader-small.vue";

const FooterNav = defineAsyncComponent({
  loader: () => import("@/components/misc/Footer-nav.vue"),
  loadingComponent: LoaderSm,
  delay: 300,
  errorComponent: LoaderSm,
  timeout: 6000,
});
export default defineComponent({
  setup() {
    return {
      darkTheme,
      dateItIT,
    };
  },
  components: {
    FooterNav,
  },
});
</script>
