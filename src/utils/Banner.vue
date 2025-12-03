<script setup lang="ts">
import { motion } from "motion-v";

const tech = ["React.js", "Vue.js", " Three.js", "Tailwind", "Node.js", "Scss"];
const duplicatedTech = [...tech, ...tech];
const skills = [
  "UI/UX Design",
  "Web Development",
  "Motion Design",
  "Accessibility",
  "Design Systems",
];
const duplicatedSkills = [...skills, ...skills];

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
    <!-- Upper Line -->
    <div class="bg-primary mb-4 max-w-full overflow-hidden">
      <motion.div :animate="animateTitle" class="flex w-max py-3 text-white">
        <span
          class="title-mobile-h4 tracking-[15px] text-nowrap uppercase"
          v-for="(el, i) in duplicatedTech"
          :key="el"
          >{{ el }} &#x2022;<span v-if="i !== duplicatedTech.length - 1"
            >&nbsp;</span
          >
        </span>
      </motion.div>
    </div>
    <!-- Below Line -->
    <div class="bg-primary max-w-full overflow-hidden">
      <motion.div
        :animate="animateTitleBelow"
        class="flex w-max py-3 text-white"
      >
        <span
          v-for="(el, i) in duplicatedSkills"
          :key="el"
          class="title-mobile-h4 flex-nowrap tracking-[15px] uppercase"
        >
          {{ el }} &#x2022;<span v-if="i !== duplicatedSkills.length - 1"
            >&nbsp;</span
          >
        </span>
      </motion.div>
    </div>
  </section>
</template>
