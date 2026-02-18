<script setup lang="ts">
import { ref } from "vue";
import { motion, useScroll, useTransform } from "motion-v";

const containerRef = ref<HTMLElement | null>(null);

const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end end"],
});

const cards = [
  {
    title: "Frontend",
    items: ["React.js", "Vue.js", "Three.js", "Motion"],
    color: "from-[rgba(86,57,250,0.22)] to-[rgba(149,120,253,0.18)]",
  },
  {
    title: "Styling",
    items: ["Tailwind", "SCSS", "CSS-in-JS"],
    color: "from-[rgba(42,44,234,0.22)] to-[rgba(86,57,250,0.14)]",
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "MongoDB"],
    color: "from-[rgba(4,3,8,0.55)] to-[rgba(86,57,250,0.16)]",
  },
  {
    title: "Design",
    items: ["UI/UX", "Motion", "Accessibility"],
    color: "from-[rgba(212,198,253,0.16)] to-[rgba(86,57,250,0.12)]",
  },
  {
    title: "Systems",
    items: ["Design Systems", "Git", "CI/CD"],
    color: "from-[rgba(221,250,57,0.36)] to-[rgba(86,57,250,0.32)]",
  },
];
const segment = 1 / cards.length;

const cardProgress = cards.map((_, i) =>
  useTransform(scrollYProgress, [i * segment, (i + 1) * segment], [0, 1]),
);

const rotateX = cardProgress.map((p) => useTransform(p, [0, 1], [0, -45]));
const y = cardProgress.map((p) => useTransform(p, [0, 1], [0, -100]));
const opacity = cardProgress.map((p) =>
  useTransform(p, [0, 0.8, 1], [1, 1, 0]),
);
const scale = cardProgress.map((p) => useTransform(p, [0, 1], [1, 0.9]));
</script>

<template>
  <section ref="containerRef" class="relative h-[300vh]">
    <div
      class="sticky top-0 flex h-screen items-center justify-center overflow-hidden perspective-[1000px]"
    >
      <div
        class="relative flex h-[400px] w-full max-w-4xl items-center justify-center"
      >
        <motion.div
          v-for="(card, i) in cards"
          :key="card.title"
          class="absolute flex h-96 w-full flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br p-8 shadow-2xl backdrop-blur-xl"
          :class="card.color"
          :style="{
            zIndex: cards.length - i,
            rotateX: rotateX[i],
            y: y[i],
            opacity: opacity[i],
            scale: scale[i],
          }"
        >
          <!-- content -->
          <div>
            <div
              class="md:note-details-desktop note-details-mobile mb-2 tracking-[3px] text-white/50 uppercase"
            >
              {{ card.title }}
            </div>
            <div class="space-y-3">
              <div
                v-for="item in card.items"
                :key="item"
                class="title-mobile-h5 md:title-h5 tracking-wider text-white uppercase"
              >
                {{ item }}
              </div>
            </div>
          </div>

          <div class="flex items-end justify-between">
            <div class="title-mobile-h3 md:title-h3 text-white/10">
              0{{ i + 1 }}
            </div>
            <div
              class="flex h-12 w-12 items-center justify-center rounded-full border border-white/20"
            >
              <div class="h-2 w-2 rounded-full bg-lime-400" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
</template>
