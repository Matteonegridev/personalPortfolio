<script setup lang="ts">
import { easeOut, motion } from "motion-v";

const titleWords = ["Let's", "talk", "to", "collaborate."];

const containerVariants = {
  closed: {},
  open: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const titleVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  closed: {
    y: 20,
    opacity: 0,
    transition: {
      duration: 0.6,
      easeOut,
      delay: 0.4,
    },
  },
};
</script>

<template>
  <section class="mt-33 mb-10 lg:grid" id="Collaboration">
    <div class="lg:mb-16">
      <h2 class="text-secondary title-mobile-h4 lg:title-h3 mb-14">
        Collaboration
      </h2>
      <motion.h3
        :variants="containerVariants"
        initial="closed"
        while-in-view="open"
        class="title-h3 mb-8 w-full text-left text-balance text-white lg:text-center lg:lg:text-9xl"
      >
        <motion.span
          v-for="(word, i) in titleWords"
          :key="i"
          :variants="titleVariants"
          class="inline-block"
        >
          {{ word }}<span v-if="i !== titleWords.length - 1">&nbsp;</span>
        </motion.span>
      </motion.h3>
      <p
        class="title-mobile-h5 lg:title-h5 text-primaryLight-variant1 text-pretty lg:text-center"
      >
        Your dream website is one click away. Let’s make it real — get in touch!
      </p>
    </div>

    <!-- email + others block -->
    <div
      class="body-font-mobile lg:body-font-desktop mt-7 space-y-2 text-white lg:flex lg:justify-around"
    >
      <!-- email block -->
      <div class="flex items-center gap-1">
        <span>Email</span>:
        <v-icon name="ri-share-box-fill" class="text-secondary" /><a
          href="mailto:matteonegridev@gmail.com"
          class="group relative"
          >matteonegridev@gmail.com<span
            class="bg-secondary absolute top-1/2 left-0 h-[3px] w-full origin-left scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100"
          ></span
        ></a>
      </div>

      <!-- others block -->
      <div class="flex gap-1">
        <span>Others</span>:
        <div class="flex items-center gap-1">
          <v-icon name="ri-share-box-fill" class="text-secondary" />
          <a
            href="https://www.linkedin.com/in/matteonegri17/"
            target="_blank"
            rel="noreferrer"
            class="group relative"
          >
            LinkedIn
            <span
              class="bg-secondary absolute top-1/2 left-0 h-[3px] w-full origin-left scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100"
            ></span>
          </a>
        </div>
        <span>/</span>
        <div class="flex items-center gap-1">
          <v-icon name="ri-share-box-fill" class="text-secondary" />
          <a
            href="https://github.com/Matteonegridev"
            target="_blank"
            rel="noreferrer"
            class="group relative"
          >
            GitHub
            <span
              class="bg-secondary absolute top-1/2 left-0 h-[3px] w-full origin-left scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100"
            ></span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
