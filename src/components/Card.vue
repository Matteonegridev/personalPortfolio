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
  <div @click.stop>
    <div class="space-y-2 p-2">
      <h2
        class="title-mobile-h4 lg:title-h5 from-primaryDark-variant via-primaryLight-variant1 to-primary inline-block bg-gradient-to-r bg-clip-text text-transparent"
      >
        {{ props.title }}
      </h2>
      <p class="note-details-mobile lg:note-details-desktop text-white">
        {{ props.description }}
      </p>
    </div>
    <div class="px-2 py-4">
      <img
        :src="props.image"
        loading="lazy"
        class="aspect-[4/3] h-auto w-full object-contain lg:aspect-video"
      />
    </div>
    <div class="flex justify-between px-2 py-2 lg:px-4">
      <div class="flex flex-wrap items-center gap-2">
        <span v-for="tech in props.tech">
          <v-icon
            :key="tech"
            :name="tech"
            scale="1.5"
            class="bg-dark border-dark-variant rounded-full border p-1 text-white"
          />
        </span>
      </div>
      <div class="inline-flex gap-2">
        <a :href="props.github" target="_blank" rel="noopener noreferrer"
          ><v-icon name="bi-github" scale="1.5" class="text-white"
        /></a>
        <a :href="props.web" target="_blank" rel="noopener noreferrer"
          ><v-icon name="md-language" scale="1.5" class="text-white"
        /></a>
      </div>
    </div>
  </div>
</template>
