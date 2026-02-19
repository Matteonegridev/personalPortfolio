<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const containerRef = ref<HTMLElement | null>(null);

const cards = [
  {
    title: "Frontend",
    items: ["React.js", "Vue.js", "Three.js", "Motion", "GSAP"],
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
    items: ["User Interface", "User Experience", "Figma", "Accessibility"],
    color: "from-[rgba(212,198,253,0.16)] to-[rgba(86,57,250,0.12)]",
  },
  {
    title: "Systems",
    items: ["Design Systems", "Git", "CI/CD"],
    color: "from-[rgba(221,250,57,0.36)] to-[rgba(86,57,250,0.32)]",
  },
];

let tl: gsap.core.Timeline | null = null;

onMounted(() => {
  const cards = gsap.utils.toArray(".card") as gsap.TweenTarget[];

  gsap.set(cards, {
    x: (i) => i * -3,
    y: window.innerHeight + 100,
    rotation: 0,
    zIndex: (i) => i,
  });

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.value,
      start: "top top",
      end: `+=${cards.length * 100}%`,
      pin: true,
      scrub: 1,
    },
  });

  cards.forEach((card, i) => {
    if (!tl) return;

    tl.to(card, {
      y: i * 6,
      scale: 1 - i * 0.01,
      duration: 1,
      ease: "power2.out",
    });

    tl.to(
      card,
      {
        rotation: i % 2 === 0 ? 2 : -2,
        duration: 0.8,
        ease: "power1.out",
      },
      ">-0.1",
    );
  });
});

onUnmounted(() => {
  tl?.scrollTrigger?.kill();
  tl?.kill();
});
</script>

<template>
  <section ref="containerRef" class="relative">
    <div
      class="flex h-[100dvh] items-center justify-center overflow-hidden perspective-[1000px]"
    >
      <div
        class="relative flex h-[400px] w-full max-w-4xl items-center justify-center"
      >
        <div
          v-for="(card, i) in cards"
          :key="card.title"
          class="card absolute flex h-96 w-full flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br p-8 shadow-2xl backdrop-blur-xl"
          :class="card.color"
        >
          <!-- content -->
          <div>
            <div
              class="md:note-details-desktop note-details-mobile mb-2 tracking-[3px] text-white/50 uppercase"
            >
              {{ card.title }}
            </div>
            <div
              class="w-full"
              :class="
                card.items.length > 3
                  ? 'card-grid-cols [--col-min-width:350px]'
                  : 'card-grid-one-col'
              "
            >
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
        </div>
      </div>
    </div>
  </section>
</template>
