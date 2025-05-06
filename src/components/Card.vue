<script setup lang="ts">
const props = defineProps(["image"]);
</script>

<template>
  <section class="grid place-content-center rounded-2xl border border-white">
    <div class="grid-area-1-1">
      <picture>
        <img :src="props.image" alt="" class="rounded-2xl" />
      </picture>
    </div>
    <div class="grid-area-1-1">
      <h1 class="text-white">Project:</h1>
      <p class="text-white">Project Name</p>
      <p class="text-white">Technologies used:</p>
    </div>
  </section>
</template>
