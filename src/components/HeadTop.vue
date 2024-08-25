<script setup>
import Korzinka from "@/components/icons/Korzinka.vue";
</script>
<template>
  <div
    class="flex items-center justify-between px-6 py-4 text-sm bg-white opacity-50 font-sf-pro"
  >
    <div class="flex gap-3 ml-44 text-grey">
      <div class="border rounded-full w-11 h-11 border-red">
        <img
          src="@/assets/img/user.png"
          class="object-cover w-full h-full rounded-full"
        />
      </div>
      <div>
        <p class="mb-0">Личный кабинет</p>
        <p class="mb-0">Клиники</p>
      </div>
    </div>
    <div class="flex gap-20 text-light-dark">
      <div class="flex">
        <router-link to="#" class="px-7 hover:cursor-pointer hover:text-dark">Записать на прием</router-link>
        <router-link to="#" class="px-7 hover:cursor-pointer hover:text-dark">Каталог</router-link>
      </div>
      <div class="flex items-center gap-1 hover:cursor-pointer hover:text-dark">
        <span>30 000,00₽</span>
        <korzinka class="text-base" />
      </div>
    </div>
  </div>
</template>
<style></style>
