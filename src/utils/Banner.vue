<script setup lang="ts">
import { motion } from "motion-v";

const animateTitle = {
  x: ["100%", "-100%"],
  transition: {
    repeat: Infinity,
    duration: 20,
    ease: "linear",
  },
};

const animateTitleBelow = {
  x: ["-100%", "100%"],
  transition: {
    repeat: Infinity,
    duration: 20,
    ease: "linear",
  },
};
</script>

<template>
  <section class="absolute right-0 left-0 -z-10 mt-30 w-screen max-w-none">
    <div
      class="bg-secondary -skew-y-[8deg] overflow-hidden px-4 py-3 lg:-skew-y-[6deg]"
    >
      <motion.h3
        :animate="animateTitle"
        class="title-mobile-h4 w-fit tracking-[15px] text-nowrap uppercase"
      >
        React.js &#x2022; Vue.js &#x2022; Astro.js &#x2022; Tailwind &#x2022;
        Node.js &#x2022; Scss
      </motion.h3>
    </div>

    <div
      class="relative -z-20 -translate-y-[60px] skew-y-[8deg] overflow-hidden bg-[#404525] px-4 py-3 lg:-translate-y-[50px] lg:skew-y-[6deg]"
    >
      <motion.h3
        :animate="animateTitleBelow"
        class="title-mobile-h4 w-fit tracking-[15px] text-nowrap uppercase"
      >
        UI/UX Design &#x2022; Web Development &#x2022; Motion Design &#x2022;
        Accessibility &#x2022; Design Systems
      </motion.h3>
    </div>
  </section>
</template>
