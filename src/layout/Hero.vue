<script setup lang="ts">
import Button from "../components/Button.vue";
</script>

<template>
  <section class="h-[100dvh]">
    <div class="flex h-full flex-col justify-center">
      <h1 class="title-h1 mb-2 text-white lg:mb-6 lg:w-[8ch] lg:text-9xl">
        Matteo Negri
      </h1>
      <p
        class="title-mobile-h3 lg:body-font-desktop mb-8 w-[13ch] text-pretty text-white lg:w-full"
      >
        Web Developer UX Designer & Videoscribe Specialist.
      </p>
      <Button
        variant="secondary"
        label="Get In Touch"
        class="self-start lg:hidden"
      />
    </div>
  </section>
</template>
