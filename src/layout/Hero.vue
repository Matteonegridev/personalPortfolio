<script setup lang="ts">
import Button from "../components/Button.vue";
import HeroBackground from "../animations/HeroBackground.vue";
import { easeOut, motion, useTime, useTransform } from "motion-v";

// Button Effect:
const time = useTime();
const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });
const rotateBg = useTransform(rotate, (r) => {
  return `conic-gradient(from ${r}deg,  #d4c6fd, #5639fa)`;
});

const navTo = () => {
  window.open("mailto:matteonegridev@gmail.com");
};

// Title Effect:
const titleName = ["Matteo", "Negri"];

const parentTitle = {
  closed: {},
  open: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const childTitle = {
  open: {
    y: 0,
    opacity: 1,
    bounce: 1,
    transition: {
      duration: 0.5,
      ease: [0.11, 0.97, 0.91, 0.19],
    },
  },
  closed: {
    y: -20,
    opacity: 0,
    transition: {
      duration: 0.7,
      delay: 0.6,
      easeOut,
    },
  },
};

// Subtitle Effect:
const subtitleVariant = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.8,
    },
  },
};
</script>

<template>
  <section class="h-[100dvh]">
    <HeroBackground />
    <div class="flex h-full flex-col justify-center max-md:mt-5">
      <motion.h1
        :variants="parentTitle"
        while-in-view="open"
        initial="closed"
        class="title-h1 mb-2 text-white md:text-8xl lg:mb-6 lg:w-[8ch] lg:text-9xl"
      >
        <motion.span
          class="block"
          :variants="childTitle"
          v-for="name in titleName"
          :key="name"
          >{{ name }}</motion.span
        >
      </motion.h1>

      <motion.p
        :variants="subtitleVariant"
        initial="closed"
        while-in-view="open"
        class="title-mobile-h3 lg:body-font-desktop mb-8 w-[13ch] text-pretty text-white lg:w-full"
      >
        Web Developer UX Designer
        <span class="text-secondary">&</span> Videoscribe Specialist.
      </motion.p>

      <div class="relative self-start lg:hidden">
        <Button
          variant="secondary"
          label="Get In Touch"
          class="bg-dark active:text-secondary active:border-secondary focus-visible:outline-secondary relative z-10 w-[12.5ch] cursor-pointer px-4 py-3 transition-all duration-250 ease-in-out focus-visible:outline active:scale-95"
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
