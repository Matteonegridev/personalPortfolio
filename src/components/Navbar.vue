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

const variantsUl = {
  open: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

const variantsSocial = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 0.6,
    },
  },
  closed: {
    y: -20,
    opacity: 0,
    transition: {
      duration: 0.2,
      delay: 0,
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
  <header class="fixed top-0 right-0 left-0 z-[1000]">
    <nav
      :class="
        clsx('relative flex items-center justify-between px-10 py-6 lg:px-16', {
          'backdrop-blur-sm transition duration-350 ease-in':
            isWindowScrolling && !isMenuOpen,
        })
      "
    >
      <div><Logo /></div>
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
        :class="clsx('z-[999] flex flex-col gap-1 lg:hidden')"
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
      :initial="false"
      :animate="isMenuOpen ? 'open' : 'hidden'"
      class="bg-primary absolute top-0 flex h-[100dvh] w-full flex-col justify-center gap-8 lg:hidden"
    >
      <motion.ul
        :initial="false"
        :animate="isMenuOpen ? 'open' : 'closed'"
        :variants="variantsUl"
        class="space-y-6 text-left"
      >
        <motion.li
          :variants="variantsLi"
          v-for="link in navLinks"
          :key="link"
          class="title-mobile-h2 w-full px-10 py-5 text-white"
        >
          <a :href="'#' + link" @click="toggleMenu">{{ link }}</a>
        </motion.li>
      </motion.ul>
      <motion.div
        :variants="variantsSocial"
        initial="closed"
        :animate="isMenuOpen ? 'open' : 'closed'"
        class="flex items-center justify-center gap-10"
      >
        <p>socialink</p>
        <p>socialink</p>
      </motion.div>
    </motion.nav>
  </header>
</template>
