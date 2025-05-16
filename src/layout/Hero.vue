<script setup lang="ts">
import Button from "../components/Button.vue";
import HeroBackground from "../utils/HeroBackground.vue";
import { motion, useTime, useTransform } from "motion-v";

// Button Effect:
const time = useTime();
const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });
const rotateBg = useTransform(rotate, (r) => {
  return `conic-gradient(from ${r}deg,  #d4c6fd, #5639fa)`;
});

const navTo = () => {
  window.open("mailto:matteonegridev@gmail.com");
};
</script>

<template>
  <section class="h-[100dvh]">
    <HeroBackground />
    <div class="flex h-full flex-col justify-center">
      <h1 class="title-h1 mb-2 text-white lg:mb-6 lg:w-[8ch] lg:text-9xl">
        Matteo Negri
      </h1>

      <p
        class="title-mobile-h3 lg:body-font-desktop mb-8 w-[13ch] text-pretty text-white lg:w-full"
      >
        Web Developer UX Designer & Videoscribe Specialist.
      </p>

      <div class="relative self-start lg:hidden">
        <Button
          variant="secondary"
          label="Get In Touch"
          class="bg-dark relative z-10 border-2"
          @click="navTo"
        />
        <motion.div
          class="absolute -inset-[1px] -z-20"
          :style="{ background: rotateBg, filter: 'blur(10px)' }"
        />
      </div>
    </div>
  </section>
</template>
