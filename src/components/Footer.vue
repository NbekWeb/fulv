<script setup>
import Logout from "@/components/icons/Logout.vue";
</script>
<template>
  <div
    class="px-6 bg-white h-[74px] flex items-center opacity-50 font-sf-pro justify-between"
  >
    <div class="flex items-center gap-2 text-light-black">
      <img src="@/assets/img/logo.png" class="w-11 h-11" />
      <div class="text-xs">
        <p class="mb-0">
          <span class="underline underline-offset-1">MISSOFF®</span> ЛК АПОДИТ
        </p>
        <span>Версия 1.0.1 </span>
      </div>
    </div>
    <div class="flex gap-20 text-sm text-light-dark">
      <div class="flex items-center">
        <router-link to="/" class="px-7">Документы компании</router-link>
        <router-link to="/" class="px-7">Поддержка</router-link>
      </div>
      <div class="flex items-center gap-2 px-5" >
        <span>Выйти</span>
        <logout />
      </div>
    </div>
  </div>
</template>
<style></style>
