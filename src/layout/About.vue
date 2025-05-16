<script setup lang="ts">
import Button from "../components/Button.vue";
import { motion } from "motion-v";
const navTo = () => {
  window.open("https://www.linkedin.com/in/matteonegri17/", "_blank");
};

// parent effect:
const parentEffect = {
  closed: {},
  open: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

// paragraph effect
const childrenEffect = {
  closed: {
    opacity: 0,
    x: 100,
    y: 5,
    transition: {
      duration: 0.5,
    },
  },
  open: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};
</script>

<template>
  <h2 class="text-secondary title-mobile-h4 lg:title-h3 mb-14">About</h2>
  <section class="mb-8 lg:grid lg:h-[135dvh] lg:grid-cols-2" id="About">
    <div class="lg:place-content-start">
      <h3 class="title-mobile-h4 lg:title-h4 mb-2 text-white">
        Developer. Designer. Italian. I build sleek digital things and eat pizza
        like it's a side quest.
      </h3>
      <Button
        variant="primary"
        label="Follow My Linkedin!"
        class="body-font-mobile hover:bg-dark hover: mt-2 cursor-pointer transition-all duration-400 ease-in-out hover:shadow-[0px_0px_10px_2px_rgba(221,_250,_57,_0.8)] hover:outline hover:outline-white max-lg:hidden"
        @click="navTo"
      />
    </div>
    <motion.div
      :variants="parentEffect"
      initial="closed"
      while-in-view="open"
      class="body-font-mobile lg:body-font-desktop relative overflow-hidden text-pretty text-white lg:place-content-end"
    >
      <motion.p :variants="childrenEffect">
        I'm Matteo — a developer and UX designer based in Italy. From my humble
        beginnings with Microsoft Paint, I’ve mastered modern tools like React,
        Vue, Tailwind, Astro, and Vite.
      </motion.p>
      <motion.p :variants="childrenEffect" class="mt-6">
        Over the years, I’ve explored a broad spectrum: graphic design, web
        development, animation, UX thinking, and product work. Each project, big
        or small, has sharpened my problem-solving skills and deepened my
        user-centered design approach. This journey has made me adaptable and
        pragmatic, balancing creativity with technical rigor.
      </motion.p>
      <motion.p :variants="childrenEffect" class="mt-6">
        I design minimal, bold digital experiences that are visually striking,
        intuitive, and purposeful. What excites me most is creating solutions
        that genuinely solve problems and improve how people interact with
        technology. I believe great design is about clarity, usability, and
        delivering real value — not just aesthetics. If you’re looking for a
        developer-designer who blends technical expertise with strong design
        sense and a passion for impactful UX, let’s talk.
      </motion.p>
    </motion.div>
    <Button
      variant="primary"
      label="Follow My Linkedin!"
      class="body-font-mobile hover:bg-dark active:bg-dark mt-12 cursor-pointer transition-all duration-400 ease-in-out hover:shadow-[0px_0px_10px_2px_rgba(221,250,57,0.8)] hover:outline hover:outline-white focus-visible:shadow-[0px_0px_10px_2px_rgba(221,250,57,0.9)] focus-visible:outline focus-visible:outline-white active:scale-95 active:shadow-[0px_0px_8px_2px_rgba(221,250,57,0.9)] lg:hidden"
      @click="navTo"
    />
  </section>
</template>
