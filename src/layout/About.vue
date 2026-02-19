<script setup lang="ts">
import Button from "../components/Button.vue";
import Cube from "../animations/Cube.vue";
import { motion } from "motion-v";
import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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

let triggers: ScrollTrigger[] = [];

onMounted(() => {
  const highlights = gsap.utils.toArray<HTMLElement>(".text-highlight");

  highlights.forEach((el) => {
    const st = ScrollTrigger.create({
      trigger: el,
      start: "-50px center",
      toggleClass: "active",
      // onEnter: () => el.classList.add("active"),
    });
    triggers.push(st);
  });
});

onUnmounted(() => {
  triggers.forEach((st) => st.kill());
});
</script>

<template>
  <h2 class="text-secondary title-mobile-h4 lg:title-h3 mt-20 mb-10" id="About">
    About
  </h2>
  <section class="mb-12 grid grid-cols-1 md:gap-2 lg:grid-cols-2 lg:gap-16">
    <div class="">
      <h3 class="title-mobile-h4 lg:title-h4 mb-2 text-white">
        I'm Matteo, Frontend Developer <span class="text-secondary">&</span> UX
        Designer based in London.<mark class="text-highlight"
          >I build purposeful</mark
        >
        digital experiences with a touch of Italian craft.
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
      class="body-font-mobile lg:body-font-desktop relative overflow-hidden text-pretty text-white max-sm:pt-4 lg:content-center"
    >
      <motion.p :variants="childrenEffect">
        I specialize in modern front-end ecosystems, mainly React and Vue,
        pairing them with workflows that
        <mark class="text-highlight"
          >keep design and technical execution tightly aligned</mark
        >.
      </motion.p>

      <motion.p :variants="childrenEffect" class="mt-6">
        With a background spanning graphic design, animation, and product
        design, I bring a pragmatic, adaptable approach to problem-solving. I
        don't just build things to look good; I’m driven by building intuitive,
        purposeful solutions that
        <mark class="text-highlight"
          >genuinely improve how people interact with technology</mark
        >.
      </motion.p>

      <motion.p :variants="childrenEffect" class="mt-6">
        For me,
        <mark class="text-highlight"
          >great design is about clarity, usability, and delivering measurable
          value</mark
        >. If you’re looking for a hybrid developer-designer who balances
        creative exploration with technical rigor,
        <mark class="text-highlight">let’s connect</mark>.
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
