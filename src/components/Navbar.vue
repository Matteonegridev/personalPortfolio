<script setup lang="ts">
import { ref } from "vue";
import Logo from "../utils/LogoColor.vue";
import LogoWhite from "../utils/LogoWhite.vue";
import { easeIn, easeOut, motion } from "motion-v";

const navLinks = ["About Me", "Projects", "Contact Me"];

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const container = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6,
    },
  },
};

const navbar = {
  hidden: {
    x: "-100%",
    transition: {
      easeOut,
      duration: 0.2,
      delay: 0.4,
    },
  },
  open: {
    x: 0,
    transition: {
      easeIn,
      duration: 0.5,
    },
  },
};
</script>

<template>
  <header class="fixed top-0 right-0 left-0 z-50">
    <nav class="relative flex items-center justify-between p-8">
      <div v-if="!isMenuOpen" class="inline">
        <Logo />
      </div>
      <div v-else class="z-50">
        <LogoWhite />
      </div>
      <button
        class="z-50 flex flex-col gap-1 lg:hidden"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <span class="h-1 w-8 bg-white"></span>
        <span class="h-1 w-8 bg-white"></span>
        <span class="h-1 w-8 bg-white"></span>
      </button>
    </nav>

    <motion.nav
      :variants="navbar"
      initial="hidden"
      :animate="isMenuOpen ? 'open' : 'hidden'"
      class="bg-primary absolute top-0 flex h-[100dvh] w-full items-center justify-center lg:hidden"
    >
      <ul class="space-y-12 text-center">
        <motion.li
          initial="hidden"
          :animate="isMenuOpen ? 'show' : 'hidden'"
          :variants="container"
          v-for="link in navLinks"
          :key="link"
          class="title-mobile-h2 w-full px-10 py-5 text-white"
        >
          <a href="#">{{ link }}</a>
        </motion.li>

        <div class="flex justify-around">
          <p>socialink</p>
          <p>socialink</p>
        </div>
      </ul>
    </motion.nav>
  </header>
</template>
