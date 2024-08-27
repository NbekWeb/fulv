<script setup>
import { h, ref, onMounted } from "vue";

import ScrollbarComponent from "@/components/ScrollbarComponent.vue";

import Main from "@/components/icons/Main.vue";
import Education from "@/components/icons/Education.vue";
import Kalendar from "@/components/icons/Kalendar.vue";
import News from "@/components/icons/News.vue";
import Order from "@/components/icons/Order.vue";
import Users from "@/components/icons/Users.vue";
import Rocket from "@/components/icons/Rocket.vue";

const selectedKeys = ref(["1"]);
const openKeys = ref([]);

const items = ref([
  {
    key: "1",
    icon: () => h(Main),
    label: "Главная",
    title: "Главная",
  },
  {
    key: "2",
    icon: () => h(Kalendar),
    label: "Расписание",
    title: "Расписание",
  },
  {
    key: "3",
    icon: () => h(Users),
    label: "Специалисты клиники",
    title: "Специалисты клиники",
  },
  {
    key: "4",
    icon: () => h(News),
    label: "Новости компании",
    title: "Новости компании",
  },
  {
    key: "5",
    icon: () => h(Education),
    label: "Обучение",
    title: "Обучение",
  },

  {
    key: "6",
    icon: () => h(Rocket),
    label: "Рекламные материалы",
    title: "Рекламные материалы",
  },
  {
    key: "7",
    icon: () => h(Order),
    label: "Заказы и поставки",
    title: "Заказы и поставки",
  },
]);

const handleClick = (menuInfo) => {
  console.log("click ", menuInfo);
};
onMounted(() => {
  const menuItem = document.querySelector('.ant-menu-item[data-menu-id="4"]');
  if (menuItem) {
    const div = document.createElement("div");
    const span = document.createElement("span");

    div.className = "flex items-center justify-end flex-grow text-xs"; // Add any desired classes to the div
    span.className =
      "bg-blue text-white h-5 w-5 rounded-full flex items-center justify-center";
    span.textContent = "3";

    div.appendChild(span);
    menuItem.appendChild(div);
  }
});
</script>
<template>
  <scrollbar-component height="calc(100vh - 200px)" >
    <template #content>
      <div
        class="pt-4  pb-20 overflow-y-auto bg-white border rounded-2xl h-max xl:pb-4 !min-w-[340px] overflow-x-hidden"
      >
        <a-menu
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          class="!min-w-full "
          mode="vertical"
          :items="items"
          @click="handleClick"
        />
      </div>
    </template>
  </scrollbar-component>
</template>
<style>
</style>
