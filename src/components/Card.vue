<script setup lang="ts">
const props = defineProps(["image"]);
</script>

<template>
  <div class="mt-5 grid border border-white">
    <div class="grid-area">
      <img :src="props.image" alt="" class="h-[20rem] w-full" />
    </div>
    <div class="grid-area self-end p-4">
      <h1 class="title-mobile-h4 text-white">Project:</h1>
      <p class="text-white">Project Name</p>
      <p class="text-white">Technologies used:</p>
    </div>
  </div>
</template>
