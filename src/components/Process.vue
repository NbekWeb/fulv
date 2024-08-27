<script setup>
import ScrollbarComponent from "@/components/ScrollbarComponent.vue";
import { ref, reactive } from "vue";

import Cancel from "@/components/icons/Cancel.vue";
import Check from "@/components/icons/Check.vue";

const open = ref(false);

const openModal = () => {
  open.value = !open.value;
};

const process = [
  [
    {
      start_time: "09:00",
      end_time: "11:30",
      text: "Косметическая хиджама",
    },
    {
      start_time: "12:30",
      end_time: "15:00",
      text: "Косметическая хиджама",
    },
    {
      start_time: "18:30",
      end_time: "21:00",
      text: "Косметическая хиджама",
    },
  ],
  [
    {
      start_time: "09:00",
      end_time: "09:00",
      text: "",
    },
    {
      start_time: "09:30",
      end_time: "09:30",
      text: "",
    },
    {
      start_time: "13:30",
      end_time: "13:30",
      text: "",
    },
    {
      start_time: "16:00",
      end_time: "16:00",
      text: "",
    },
  ],
  [
    {
      start_time: "09:30",
      end_time: "11:00",
      text: "Хиджама",
    },
    {
      start_time: "12:00",
      end_time: "13:30",
      text: "Массаж",
    },
  ],
  [
    {
      start_time: "11:00",
      end_time: "12:00",
      text: "Скан биоп lorem insum",
    },
  ],
  [
    {
      start_time: "09:00",
      end_time: "11:30",
      text: "Косметическая хиджама",
    },
    {
      start_time: "12:30",
      end_time: "15:00",
      text: "Косметическая хиджама",
    },
    {
      start_time: "18:30",
      end_time: "21:00",
      text: "Косметическая хиджама",
    },
  ],
  [
    {
      start_time: "09:00",
      end_time: "09:00",
      text: "",
    },
    {
      start_time: "09:30",
      end_time: "09:30",
      text: "",
    },
    {
      start_time: "13:30",
      end_time: "13:30",
      text: "",
    },
    {
      start_time: "16:00",
      end_time: "16:00",
      text: "",
    },
  ],
  [
    {
      start_time: "09:30",
      end_time: "11:00",
      text: "Хиджама",
    },
    {
      start_time: "12:00",
      end_time: "13:30",
      text: "Массаж",
    },
  ],
];

function groupByHour(process) {
  const result = [];
  const timeMap = {};

  // Collect all items grouped by hour
  process.forEach((group, groupIndex) => {
    group.forEach((item) => {
      if (item.start_time) {
        const hour = item.start_time.split(":")[0];
        const key = `${hour}_${groupIndex}`;

        if (!timeMap[key]) {
          timeMap[key] = [];
        }

        timeMap[key].push({ ...item, id: groupIndex });
      }
    });
  });

  // Transform timeMap into the result array
  for (let hour = 9; hour <= 20; hour++) {
    const hourKey = hour.toString().padStart(2, "0");

    // Collect all items for the current hour
    const items = Object.values(timeMap)
      .flat()
      .filter((item) => item.start_time.startsWith(hourKey));

    // Group items by start_time and id
    const groupedItems = items.reduce((acc, item) => {
      const key = `${item.start_time}_${item.id}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});

    // Convert grouped items into array format
    result.push(
      Object.values(groupedItems).map((group) =>
        group.length > 1 ? group : group[0]
      )
    );
  }

  // Ensure the result has fixed length from 09:00 to 20:00
  const finalResult = [];
  for (let hour = 9; hour <= 20; hour++) {
    const hourKey = hour.toString().padStart(2, "0");
    finalResult.push(
      result.find((r) => r[0]?.start_time.startsWith(hourKey)) || []
    );
  }

  return finalResult;
}

const result = groupByHour(process);

const getStyle = (item) => {
  const hoursDifference =
    item.end_time.split(":")[0] - item.start_time.split(":")[0];
  const minutesDifference =
    (item.end_time.split(":")[1] - item.start_time.split(":")[1]) / 60;
  const calculatedWidth = hoursDifference * 72 + minutesDifference * 72;

  return {
    top: `${item.id * 32 + item.id * 40}px`,
    width: `${Math.max(calculatedWidth, 36)}px`,
    left: `${item.start_time.split(":")[1] !== "00" ? "36px" : "0px"}`,
  };
};

const timeLine = (current) => {
  const [hours, minutes] = current.split(":").map(Number);

  if (hours > 9 && hours < 21) {
    const left = hours - 9 + minutes / 60;
    return {
      left: `${left * 72}px`,
    };
  } else {
    return {
      opacity: "0",
    };
  }
};
const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

// if (parseInt(hours, 10) > 9) {
//     return `${hours}:${minutes}`;
//   }

const form = reactive({
  name: "Светлана",
  phoneNumber: "+7 (924) 333-33-57",
});

function submitForm() {
  console.log("Form submitted", form);
}

const current = getCurrentTime();
</script>
<template>
  <scrollbar-component height="calc(100vh)">
    <template #content>
      <div class="w-full pt-4 pl-5 bg-blue-l font-sf-pro">
        <div class="flex gap-0 pb-9">
          <div class="pr-3 border-r-2 w-44 border-bor">
            <div class="flex justify-between text-xs text-blue">
              <div class="flex flex-col">
                <span class="text-min">Сегодня</span>
                <span class="text-liner">Среда 10 августа</span>
              </div>
              <div class="flex flex-col">
                <span class="text-min">Время</span>
                <span class="text-liner">{{ current }}</span>
              </div>
            </div>

            <div class="flex flex-col pt-4 gap-y-8">
              <div
                v-for="n of process.length"
                :key="n"
                class="flex items-center w-full h-10 px-3 text-xs font-medium bg-white rounded-lg text-dark"
              >
                Процедурная {{ n }}
              </div>
            </div>
          </div>
          <div
            class="flex relative gap-0 text-white text-min !overflow-x-auto scroll-x overflow-y-hidden pr-2"
          >
            <div
              class="absolute flex flex-col items-center h-full border top-4 text-red"
              :style="timeLine(current)"
            >
              <span class="w-2 h-2 rounded-full bg-red"></span>
              <span class="w-[2px] h-full bg-red mb-4"></span>
            </div>
            <div
              class="h-full border-r-2 w-18 border-bor min-w-18"
              v-for="i of 12"
              :key="i"
            >
              <span class="flex justify-center h-8 text-xs text-bold-blue"
                >{{ i + 8 < 10 ? `0${i + 8}` : i + 8 }}:00
              </span>

              <div class="pt-4 text-min">
                <div class="relative">
                  <div
                    v-for="(item, n) of result[i - 1]"
                    :key="n"
                    class="absolute flex flex-col justify-between h-10 px-2 py-1 rounded-lg hover:cursor-pointer"
                    :class="
                      +current.split(':')[0] > +item.start_time.split(':')[0]
                        ? 'bg-grey-b'
                        : 'bg-bold-blue'
                    "
                    @click="openModal"
                    :style="getStyle(item)"
                  >
                    <span>
                      {{
                        item.start_time == item.end_time
                          ? item.start_time
                          : `${item.start_time} - ${item.end_time} `
                      }}
                    </span>
                    <div class="flex items-center">
                      <img
                        src="@/assets/img/user.png"
                        class="object-cover w-4 h-4 rounded-full"
                      />
                      <span class="limit1 pl-[2px]">{{ item.text }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-xs font-sf-pro">
          <p class="text-lg font-medium text-dark">
            Не забудьте подтвердить запись на завтрашний день
          </p>
          <div class="flex gap-4 pb-2 overflow-x-auto scroll-x">
            <template v-for="(items, i) of process" :key="i">
              <div
                class="flex flex-col items-center p-2 bg-white rounded-lg min-w-60 w-60"
              >
                <span class="pb-2 font-medium text-dark">
                  Процедурная {{ i + 1 }}
                </span>
                <div
                  class="flex flex-col w-full pr-1 overflow-y-auto gap-y-1 max-h-50 scroll-y"
                >
                  <template v-for="(item, j) of items" :key="j">
                    <div
                      class="flex flex-col justify-between w-full p-2 text-white rounded-lg bg-bold-blue h-19 text-ms"
                    >
                      <div class="flex items-center justify-between">
                        <span>
                          {{ item.start_time }} - {{ item.end_time }}
                        </span>
                        <div class="flex gap-1 text-min">
                          <check />
                          <cancel />
                        </div>
                      </div>
                      <div
                        class="flex justify-between w-full pb-1 border-b border-bor"
                      >
                        <div class="flex items-center gap-1">
                          <span class="w-4 h-4">
                            <img
                              class="object-cover w-full h-full"
                              src="@/assets/img/labmic.png"
                              v-if="j % 2 != 0"
                            />
                            <img
                              class="object-cover w-full h-full"
                              src="@/assets/img/xidjama.png"
                              v-else
                            />
                          </span>
                          <span class="font-thin font-sf-pro">{{
                            j % 2 == 0
                              ? "Косметическая  хиджама"
                              : "Гемосканирование"
                          }}</span>
                        </div>
                        <div class="flex items-center gap-1">
                          <img
                            src="@/assets/img/user.png"
                            class="object-cover w-4 h-4 rounded-full"
                          />
                          <span>Алия Х.</span>
                        </div>
                      </div>
                      <div class="flex justify-between">
                        <span>Светлана</span>
                        <span>+7 (924) 333-33-57</span>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </div>

        <a-modal v-model:open="open" class="!w-[720px]">
          <a-form
            :model="form"
            @finish="submitForm"
            layout="vertical"
            class="flex flex-col items-center text-base font-medium opacity-50 font-intro text-dark"
          >
            <span class="text-2xl font-bold">Вы смотрите запись клиента</span>
            <div class="px-5 py-3 border mt-7 border-blue">
              <div class="flex gap-5">
                <span>20.04.2024</span>
                <span>Суббота</span>
                <span class="text-liner">10:00 – 11:00</span>
              </div>
              <p class="mb-4">Стерлитамак, Карла Маркса 124</p>
              <div class="flex gap-48">
                <div class="flex items-center gap-3">
                  <!-- SVG Icon -->
                  <span>Хиджама</span>
                </div>
                <div class="flex gap-3">
                  <img
                    src="@/assets/img/user.png"
                    class="object-cover w-5 h-5 rounded-full"
                  />
                  <span>Алия Хиджамова</span>
                </div>
              </div>
            </div>
            <div class="flex gap-5 pt-8 mb-10">
              <a-form-item label="Имя" class="w-48">
                <a-input
                  v-model:value="form.name"
                  class="h-10 border-bor2 rounded-[20px]"
                />
              </a-form-item>
              <a-form-item label="Номер телефона" class="w-48">
                <a-input
                  v-model:value="form.phoneNumber"
                  class="h-10 border-bor2 rounded-[20px]"
                />
              </a-form-item>
            </div>
            <div class="flex flex-col items-center">
              <span
                @click="openModal"
                class="w-48 h-10 border border-bor2 rounded-[20px] flex items-center px-4 hover:cursor-pointer"
              >
                Отменить запись
              </span>
              <a-form-item class="w-48">
                <a-button
                  type="primary"
                  html-type="submit"
                  class="w-full bg-blue rounded-[20px] text-white mt-5"
                >
                  Перенести запись
                </a-button>
              </a-form-item>
            </div>
          </a-form>
          <template #footer></template>
        </a-modal>
      </div>
    </template>
  </scrollbar-component>
</template>
<style></style>
