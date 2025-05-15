<script setup lang="ts">
import { ref } from "vue";
import Logo from "../utils/LogoColor.vue";

import Button from "./Button.vue";
import { easeIn, motion, useTime, useTransform } from "motion-v";
import clsx from "clsx";

const navLinks = ["About Me", "Projects", "Contact Me"];

const time = useTime();
const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });
const rotateBg = useTransform(rotate, (r) => {
  return `conic-gradient(from ${r}deg,  #d4c6fd, #5639fa)`;
});

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const variantsUl = {
  open: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
  closed: {
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
};
const variantsLi = {
  open: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  closed: { opacity: 0, x: -20, transition: { duration: 0.5 } },
};

const navbar = {
  open: {
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hidden: {
    x: "-100%",
    transition: { duration: 0.4, ease: "easeIn", delay: 0.5 },
  },
};

const ideaVar = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easeIn,
      delay: 0.8,
    },
  },
  hidden: {
    y: -10,
    opacity: 0,
  },
};

const lineMotion = {
  open: {
    scaleX: 1,
    transition: {
      delay: 0.7,
      duration: 0.3,
      ease: easeIn,
    },
  },
  hidden: {
    scaleX: 0,
    transition: {
      duration: 0.3,
    },
  },
};
</script>

<template>
  <header
    class="bg-dark/40 fixed top-0 right-0 left-0 z-50 flex items-center justify-around px-10 py-5 backdrop-blur-lg"
  >
    <div><Logo /></div>

    <!-- Desktop -->
    <ul
      class="body-font-desktop flex items-center gap-10 font-bold max-lg:hidden"
    >
      <li
        class="group relative cursor-pointer text-white transition-all duration-300 ease-in-out"
        v-for="link of navLinks"
        :key="link"
      >
        <a :href="'#' + link"> {{ link }}</a>
        <span
          class="bg-secondary pointer-events-none absolute top-1/2 left-0 h-[4px] w-0 transition-all duration-500 ease-out group-hover:w-full"
        ></span>
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
      :class="clsx('z-[999] flex flex-col gap-1 lg:hidden')"
      @click="toggleMenu"
      aria-label="Toggle menu"
    >
      <span class="h-1 w-8 bg-white"></span>
      <span class="h-1 w-8 bg-white"></span>
      <span class="h-1 w-8 bg-white"></span>
    </button>
    <motion.nav
      :variants="navbar"
      :initial="false"
      :animate="isMenuOpen ? 'open' : 'hidden'"
      class="bg-primary absolute top-0 z-50 flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-6 lg:hidden"
    >
      <!-- Glowing  -->
      <div
        class="absolute inset-0 -z-10 bg-gradient-to-br from-purple-600 via-indigo-500 to-pink-500 opacity-20 blur-2xl"
      ></div>

      <!-- Navigation Label -->
      <h3 class="note-details-mobile mb-6 font-bold text-gray-400 uppercase">
        Navigation
      </h3>

      <!-- Links -->
      <motion.ul
        :initial="false"
        :animate="isMenuOpen ? 'open' : 'closed'"
        :variants="variantsUl"
        class="mb-10 w-full space-y-6 text-center"
      >
        <motion.li
          :variants="variantsLi"
          v-for="link in navLinks"
          :key="link"
          class="title-mobile-h3 py-3 text-white"
        >
          <a :href="'#' + link" @click="toggleMenu" class="block">
            {{ link }}
          </a>
        </motion.li>
      </motion.ul>
      <motion.div
        :initial="false"
        :variants="lineMotion"
        :animate="isMenuOpen ? 'open' : 'hidden'"
        class="bg-secondary mx-auto h-0.5 w-24 rounded-full"
      />

      <motion.div
        :animate="isMenuOpen ? 'open' : 'hidden'"
        :initial="false"
        :variants="ideaVar"
        class="mt-10 w-full"
      >
        <p
          class="note-details-mobile text-secondary mt-10 max-w-xs text-center"
        >
          Tell me about your idea and let's turn it into code!
        </p>
      </motion.div>
    </motion.nav>
  </header>

  <!-- Mobile -->
</template>
