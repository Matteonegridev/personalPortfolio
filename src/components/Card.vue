<script setup lang="ts">
const props = defineProps<{
  image: string;
  description: string;
  title: string;
  tech: string[];
  web: string;
  github: string;
}>();
</script>

<template>
  <div
    class="bg-dark border-dark-variant mt-5 h-auto border p-2 transition-all duration-200 ease-in will-change-transform hover:-translate-y-3 hover:scale-105 hover:shadow-[2px_3px_10px_#5639fa]/30"
  >
    <div class="space-y-2 p-2">
      <h2 class="title-mobile-h4 lg:title-h3 text-secondary">{{ title }}</h2>
      <p class="note-details-mobile lg:note-details-desktop text-white">
        {{ description }}
      </p>
    </div>
    <div class="px-2 py-4">
      <img
        :src="props.image"
        loading="lazy"
        class="aspect-[4/3] h-auto w-full object-contain lg:aspect-video"
      />
    </div>
    <div class="flex justify-between p-2">
      <div class="flex items-center gap-2">
        <span v-for="tech in props.tech">
          <v-icon
            :key="tech"
            :name="tech"
            scale="1.5"
            class="bg-dark border-dark-variant rounded-full border p-1"
          />
        </span>
      </div>
      <div class="inline-flex gap-2">
        <a @click.stop :href="props.github" target="_blank" class=""
          ><v-icon name="bi-github" scale="1.5" class="text-white"
        /></a>
        <a @click.stop :href="props.web" target="_blank" class=""
          ><v-icon name="md-language" scale="1.5" class="text-white"
        /></a>
      </div>
    </div>
  </div>
</template>
