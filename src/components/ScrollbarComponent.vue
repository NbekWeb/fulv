<script setup>
const props = defineProps({
  height: String,
});
const emits = defineEmits(["getData"]);
const scroll = (e) => {
  const clientH = e.target.clientHeight;
  const scrollTop = e.target.scrollTop;
  const scrollH = e.target.scrollHeight;
  const page = props.page + 1;
  if (
    Math.ceil(clientH + scrollTop + 1) >= scrollH &&
    page < props.totalPages &&
    !props.loading
  ) {
    emits("getData", page);
  }
};
</script>

<template>
  <div
    class="scrollbar-content"
    :style="{ height: height }"
    id="scrollbar-content"
    @scroll="scroll"
  >
    <slot name="content"></slot>
  </div>
</template>

<style scoped>

</style>
