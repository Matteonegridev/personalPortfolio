<script setup lang="ts">
import { ref, watchEffect } from "vue";
import Logo from "../utils/LogoColor.vue";
import LogoWhite from "../utils/LogoWhite.vue";
import Button from "./Button.vue";
import { easeIn, easeOut, motion, useTime, useTransform } from "motion-v";
import clsx from "clsx";

const navLinks = ["About Me", "Projects", "Contact Me"];

const time = useTime();
const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });
const rotateBg = useTransform(rotate, (r) => {
  return `conic-gradient(from ${r}deg,  #d4c6fd, #5639fa)`;
});

const isMenuOpen = ref(false);
const isWindowScrolling = ref(false);

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

watchEffect(() => {
  const handleScroll = () => {
    isWindowScrolling.value = window.scrollY > 100;
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header class="fixed top-0 right-0 left-0 lg:mx-[var(--margin-desktop)]">
    <nav
      :class="
        clsx('relative flex items-center justify-between p-8', {
          'backdrop-blur-sm transition duration-150 ease-in':
            isWindowScrolling && !isMenuOpen,
        })
      "
    >
      <div :class="isMenuOpen ? 'z-50' : ''">
        <component :is="isMenuOpen ? LogoWhite : Logo" />
      </div>
      <!-- Desktop -->
      <ul
        class="body-font-desktop flex items-center gap-10 font-bold max-lg:hidden"
      >
        <li
          class="hover:text-secondary cursor-pointer text-white"
          v-for="link of navLinks"
        >
          {{ link }}
        </li>
      </ul>
      <div class="relative ml-auto max-lg:hidden">
        <Button
          variant="secondary"
          label="Get In Touch"
          class="hover:text-secondary bg-dark hover:border-secondary button-effect relative z-10 w-[12.5ch] cursor-pointer transition-all duration-250 ease-in hover:pr-10 hover:pl-5"
        />
        <motion.div
          class="absolute -inset-[1px]"
          :style="{ background: rotateBg, filter: 'blur(10px)' }"
        />
      </div>
      <button
        :class="clsx('z-50 flex flex-col gap-1 lg:hidden')"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <span class="h-1 w-8 bg-white"></span>
        <span class="h-1 w-8 bg-white"></span>
        <span class="h-1 w-8 bg-white"></span>
      </button>
    </nav>
    <!-- Mobile -->
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
          <a :href="'#' + link" @click="toggleMenu">{{ link }}</a>
        </motion.li>

        <div class="flex justify-around">
          <p>socialink</p>
          <p>socialink</p>
        </div>
      </ul>
    </motion.nav>
  </header>
</template>
