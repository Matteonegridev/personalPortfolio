<script setup lang="ts">
const props = defineProps<{
  image: string;
  description: string;
  title: string;
  tech: string[];
}>();
</script>

<template>
  <div
    class="from-primary to-dark border-primary mt-5 h-auto cursor-pointer rounded-xl border-b-4 bg-linear-to-br to-30% p-2 transition-all duration-200 ease-in will-change-transform hover:-translate-y-3 hover:scale-105"
  >
    <div class="py-2">
      <h2 class="title-mobile-h4 text-white">Project Name</h2>
      <p class="text-white">Project description</p>
    </div>
    <div class="p-4">
      <img
        :src="props.image"
        loading="lazy"
        class="aspect-square h-auto w-full rounded-xl object-cover lg:aspect-video"
      />
    </div>
    <div class="flex justify-between py-2">
      <p class="text-white">Technologies used</p>
      <div class="inline-flex">
        <a class="text-white">GitHub</a>
        <a class="text-white">Check Website</a>
      </div>
    </div>
  </div>
</template>
