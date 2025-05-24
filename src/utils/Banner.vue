<script setup lang="ts">
import { motion } from "motion-v";

const animateTitle = {
  x: ["0%", "-50%"],
  transition: {
    repeat: Infinity,
    duration: 20,
    ease: "linear",
  },
};

const animateTitleBelow = {
  x: ["-50%", "0%"],
  transition: {
    repeat: Infinity,
    duration: 20,
    ease: "linear",
  },
};
</script>

<template>
  <section
    class="-mx-[var(--margin-mobile)] mt-35 lg:-mx-[var(--margin-desktop)]"
  >
    <div class="bg-primary mb-4 max-w-full overflow-hidden">
      <motion.div :animate="animateTitle" class="flex w-max py-3 text-white">
        <span class="title-mobile-h4 tracking-[15px] text-nowrap uppercase">
          React.js &#x2022; Vue.js &#x2022; Astro.js &#x2022; Tailwind &#x2022;
          Node.js &#x2022; Scss
          <span class="inline-block w-8"></span>
        </span>
        <span class="title-mobile-h4 tracking-[15px] text-nowrap uppercase">
          React.js &#x2022; Vue.js &#x2022; Astro.js &#x2022; Tailwind &#x2022;
          Node.js &#x2022; Scss
          <span class="inline-block w-8"></span>
        </span>
      </motion.div>
    </div>
    <div class="bg-primary max-w-full overflow-hidden">
      <motion.div
        :animate="animateTitleBelow"
        class="flex w-max py-3 text-white"
      >
        <span class="title-mobile-h4 tracking-[15px] text-nowrap uppercase">
          UI/UX Design &#x2022; Web Development &#x2022; Motion Design &#x2022;
          Accessibility &#x2022; Design Systems
          <span class="inline-block w-8"></span>
        </span>
        <span class="title-mobile-h4 tracking-[15px] text-nowrap uppercase">
          UI/UX Design &#x2022; Web Development &#x2022; Motion Design &#x2022;
          Accessibility &#x2022; Design Systems
          <span class="inline-block w-8"></span>
        </span>
      </motion.div>
    </div>
  </section>
</template>
