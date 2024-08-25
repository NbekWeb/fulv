<script setup>
import ScrollbarComponent from "@/components/ScrollbarComponent.vue";
import { ref } from "vue";

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
console.log(result);

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
  const left = current.split(":")[0] - -current.split(":")[1] / 60 - 9;
  return {
    left: `${left * 72}px`,
  };
};
const current = "10:45";
</script>
<template>
  <scrollbar-component height="calc(100vh - 200px)">
    <template #content>
      <div class="w-full pt-4 pl-5 bg-blue-l rounded-xl font-sf-pro">
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
                <div class="flex flex-col w-full pr-1 overflow-y-auto gap-y-1 max-h-50 scroll-y">
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
                      <div class="flex justify-between ">
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
          <div
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
                  <svg
                    width="12"
                    height="15"
                    viewBox="0 0 12 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.80291 11.6405C3.3172 11.636 4.8315 11.6376 6.34579 11.6376C7.84969 11.6376 9.35359 11.6347 10.8575 11.6418C11.0209 11.6426 11.0492 11.5943 11.0483 11.4436C11.0417 10.4359 11.0479 9.42866 11.0434 8.42099C11.0413 7.94338 11.0662 7.46578 11.0167 6.98901C10.8837 5.70693 10.3257 4.65845 9.27667 3.90269C8.11746 3.06782 6.81189 2.84047 5.41776 3.05491C3.21575 3.39386 1.65031 5.21392 1.64449 7.44246C1.64075 8.78741 1.64574 10.1328 1.64075 11.4777C1.64034 11.6068 1.6736 11.641 1.80291 11.6405ZM6.88839 4.32783C6.91958 4.19292 7.03434 4.11713 7.18485 4.14753C7.49128 4.20957 7.78109 4.32158 8.05509 4.4694C8.86172 4.90495 9.43301 5.5512 9.76481 6.40772C9.7831 6.4556 9.79474 6.50599 9.80347 6.53597C9.79932 6.66797 9.74568 6.74417 9.6434 6.78289C9.5382 6.82286 9.44798 6.78997 9.37937 6.70711C9.34736 6.66838 9.32823 6.61758 9.30869 6.57011C8.90039 5.58201 8.18523 4.9366 7.15824 4.64054C7.1283 4.6318 7.09795 4.62472 7.06885 4.61431C6.93247 4.56601 6.86012 4.45025 6.88839 4.32783Z"
                      fill="#59ADD0"
                    />
                    <path
                      d="M11.844 13.2617C11.6864 12.9798 11.4236 12.8799 11.1113 12.8799C7.91644 12.8795 4.72154 12.8774 1.52663 12.8757C1.21105 12.8757 0.977377 13.0131 0.836426 13.295C0.543712 13.8801 0.912099 14.4743 1.56863 14.4751C3.16109 14.4768 4.75314 14.4755 6.3456 14.4755C7.94804 14.4755 9.5509 14.4747 11.1533 14.4764C11.4411 14.4764 11.6714 14.3723 11.819 14.1224C11.9837 13.8434 12.0045 13.5486 11.844 13.2621V13.2617Z"
                      fill="#59ADD0"
                    />
                    <path
                      d="M5.10848 3.37327C5.50971 3.27625 5.92009 3.28291 6.37871 3.26709C6.73296 3.27125 7.1371 3.28666 7.53418 3.36827C7.68386 3.39909 7.71172 3.34787 7.70922 3.21504C7.69841 2.61168 7.30882 2.0787 6.72422 1.90131C6.60864 1.86634 6.58161 1.81595 6.58618 1.70769C6.59367 1.53697 6.59658 1.365 6.58577 1.19428C6.57662 1.04937 6.60198 0.977335 6.7737 0.991076C6.95332 1.00523 7.0581 0.903217 7.06101 0.757479C7.06392 0.606744 6.95374 0.512223 6.76788 0.510974C6.50885 0.509308 6.24981 0.510557 5.99078 0.510974C5.74131 0.510974 5.63071 0.583843 5.62821 0.749151C5.62572 0.913627 5.72842 0.99066 5.98329 0.993575C6.08391 0.994408 6.10387 1.0323 6.10138 1.12182C6.09597 1.31878 6.09472 1.51615 6.10138 1.7131C6.10512 1.81595 6.081 1.86259 5.9704 1.89507C5.37001 2.07245 4.95963 2.64291 4.97834 3.24918C4.98125 3.33912 4.98956 3.402 5.10848 3.37327Z"
                      fill="url(#paint0_linear_247_623)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_247_623"
                        x1="6.34355"
                        y1="0.510132"
                        x2="6.34355"
                        y2="3.3803"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#A10808" />
                        <stop offset="1" stop-color="#EA0202" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span class="">Хиджама</span>
                </div>
                <div class="flex gap-3">
                  <img
                    src="@/assets/img/user.png "
                    class="object-cover w-5 h-5 rounded-full"
                  />
                  <span>Алия Хиджамова</span>
                </div>
              </div>
            </div>
            <div class="flex gap-5 pt-8 mb-10">
              <div class="flex flex-col gap-2">
                <span class="px-4 text-bor2">Имя</span>
                <span
                  class="w-48 h-10 border border-bor2 rounded-[20px] flex items-center px-4"
                  >Светлана</span
                >
              </div>
              <div class="flex flex-col gap-2">
                <span class="px-4 text-bor2">Номер телефона</span>
                <span
                  class="w-48 h-10 border border-bor2 rounded-[20px] flex items-center px-4"
                  >+7 (924) 333-33-57</span
                >
              </div>
            </div>
            <div class="flex flex-col items-center">
              <span
                @click="openModal"
                class="w-48 h-10 border border-bor2 rounded-[20px] flex items-center px-4 hover:cursor-pointer"
                >Отменить запись</span
              >
              <span
                @click="openModal"
                class="w-48 h-10 bg-blue rounded-[20px] flex items-center px-4 text-white mt-5 hover:cursor-pointer"
                >Перенести запись
              </span>
            </div>
          </div>
          <template #footer> </template>
        </a-modal>
      </div>
    </template>
  </scrollbar-component>
</template>
<style>

</style>
