<script setup>
import HeadTop from "@/components/HeadTop.vue";
import MenuBar from "@/components/MenuBar.vue";
import FooterComp from "@/components/Footer.vue";
import Process from "@/components/Process.vue";
</script>
<template>
  <div class="h-screen ">
    <head-top />
    <div class="flex gap-3 px-6 py-5 bg-light-grey main_height">
      <menu-bar class="opacity-50 min-w-[340px]" />
      <process class="flex-grow"/>
    </div>
    <footer-comp />
  </div>
</template>
<style >
.main_height{
  height: calc(100vh - 150px);
}
</style>
