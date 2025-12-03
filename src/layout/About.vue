<script setup lang="ts">
import Button from "../components/Button.vue";
import Cube from "../animations/Cube.vue";
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
  <h2 class="text-secondary title-mobile-h4 lg:title-h3 mt-20 mb-14" id="About">
    About
  </h2>
  <section class="mb-12 grid grid-cols-1 md:gap-2 lg:grid-cols-2 lg:gap-16">
    <div class="">
      <h3 class="title-mobile-h4 lg:title-h4 mb-2 text-white">
        Developer<span class="text-secondary">.</span> UX Designer<span
          class="text-secondary"
          >.</span
        >
        Shaping purposeful digital experiences with a touch of Italian craft.
      </h3>
      <Button
        variant="primary"
        label="Follow My Linkedin!"
        class="body-font-mobile hover:bg-dark hover: mt-2 mb-10 cursor-pointer transition-all duration-400 ease-in-out hover:shadow-[0px_0px_10px_2px_rgba(221,_250,_57,_0.8)] hover:outline hover:outline-white max-lg:hidden"
        @click="navTo"
      />
      <Cube />
    </div>

    <motion.div
      :variants="parentEffect"
      initial="closed"
      while-in-view="open"
      class="body-font-mobile lg:body-font-desktop relative overflow-hidden text-balance text-white max-sm:pt-4 lg:place-content-end"
    >
      <motion.p :variants="childrenEffect">
        I'm Matteo, a developer and UX-focused designer based in London. I work
        within modern front-end ecosystems, mainly
        <span class="text-secondary text-bold italic"></span>React and Vue,
        pairing them with workflows that keep design and development tightly
        aligned.
      </motion.p>
      <motion.p :variants="childrenEffect" class="mt-6">
        Over the years, I’ve worked across graphic design, web development,
        animation, UX thinking, and product design. Each project, big or small,
        has strengthened my problem-solving skills and deepened my focus on user
        experience. This range has made me adaptable and pragmatic, able to
        balance creative exploration with technical rigor.
      </motion.p>
      <motion.p :variants="childrenEffect" class="mt-6">
        I create minimal, bold digital experiences that are intuitive, visually
        focused, and purposeful. What drives me is building solutions that
        genuinely improve how people interact with technology. For me, great
        design is about clarity, usability, and delivering measurable value, not
        just aesthetics. If you’re looking for a developer-designer who blends
        technical skill with strong design sense and a commitment to meaningful
        UX,
        <span class="text-secondary italic hover:underline">let’s connect</span
        >.
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
