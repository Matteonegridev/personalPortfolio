<script setup lang="ts">
import { ref } from "vue";
import Logo from "./LogoColor.vue";

const navLinks = ["About Me", "Projects", "Contact Me"];

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <header class="fixed top-0 right-0 left-0 z-50">
    <nav class="relative flex items-center justify-between p-8">
      <div class="inline">
        <Logo />
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
    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <nav v-if="isMenuOpen" class="bg-primary absolute top-0 w-full lg:hidden">
        <ul class="mt-22 flex flex-col gap-8 p-6">
          <li
            v-for="link in navLinks"
            :key="link"
            class="title-mobile-h4 w-full text-white"
          >
            <a href="#">{{ link }}</a>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>
