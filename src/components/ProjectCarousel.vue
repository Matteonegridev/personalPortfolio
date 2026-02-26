<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { projects } from "../utils/data";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import InertiaPlugin from "gsap/InertiaPlugin";
import ProjectCard from "./ProjectCard.vue";
import CustomCursor from "./CustomCursor.vue";

gsap.registerPlugin(Draggable, InertiaPlugin);

const viewportRef = ref<HTMLElement | null>(null);
const cardRefs = ref<HTMLElement[]>([]);
const proxy = document.createElement("div");

const isCursorActive = ref(false);

let draggableInstance: Draggable[] | null = null;
let resizeObserver: ResizeObserver | null = null;

// 1. Reactive Radius to sync JS and HTML
const radius = ref(2000);

const DRAG_SENSITIVITY = 0.0006; // Restored for usability

const currentCardSpread = ref(0);
const currentSnapDistance = ref(0);

const calculateResponsiveConfig = () => {
  const width = window.innerWidth;
  const isMobile = width < 768;

  // Update the radius dynamically based on screen size
  // Using width * 1.5 creates a gentle curve. Adjust multiplier to taste.
  radius.value = Math.max(width * 1.5, 1000);

  currentCardSpread.value = isMobile ? 0.4 : 0.28;
  currentSnapDistance.value = currentCardSpread.value / DRAG_SENSITIVITY;
};

const renderArc = () => {
  if (!cardRefs.value.length) return;

  const proxyX = gsap.getProperty(proxy, "x") as number;
  const proxyRad = proxyX * DRAG_SENSITIVITY;

  const total = cardRefs.value.length;
  const totalSpread = total * currentCardSpread.value;

  // 2. Fixed center index for perfect alignment
  const centerIndex = Math.floor(total / 2);

  const wrapAngle = gsap.utils.wrap(
    -Math.PI / 2 - totalSpread / 2,
    -Math.PI / 2 + totalSpread / 2,
  );

  cardRefs.value.forEach((card, index) => {
    const offsetFromCenter = index - centerIndex;
    const rawAngle =
      -Math.PI / 2 + offsetFromCenter * currentCardSpread.value + proxyRad;
    const angle = wrapAngle(rawAngle);

    // 3. Use the reactive radius for math
    const x = Math.cos(angle) * radius.value;
    const y = Math.sin(angle) * radius.value;

    const distFromTop = Math.abs(angle - -Math.PI / 2);
    const zIndex = Math.round(100 - distFromTop * 100);

    gsap.set(card, {
      x,
      y,
      zIndex,
      xPercent: -50,
      yPercent: -50,
      rotation: (angle + Math.PI / 2) * (180 / Math.PI),
    });
  });
};

const initCarousel = () => {
  if (!viewportRef.value || cardRefs.value.length === 0) return;

  calculateResponsiveConfig();
  gsap.set(proxy, { x: 0, y: 0 });
  renderArc();

  resizeObserver = new ResizeObserver(() => {
    calculateResponsiveConfig();
    renderArc();
  });
  resizeObserver.observe(viewportRef.value);

  draggableInstance = Draggable.create(proxy, {
    type: "x",
    trigger: viewportRef.value,
    inertia: true,
    snap: {
      x: (value) =>
        Math.round(value / currentSnapDistance.value) *
        currentSnapDistance.value,
    },
    maxDuration: 0.6,
    minDuration: 0.2,
    overshootTolerance: 0,
    onDrag: renderArc,
    onThrowUpdate: renderArc,
  });
};

onMounted(initCarousel);

onUnmounted(() => {
  if (resizeObserver && viewportRef.value)
    resizeObserver.unobserve(viewportRef.value);
  if (draggableInstance) draggableInstance[0].kill();
});
</script>

<template>
  <section
    @mouseenter="isCursorActive = true"
    @mouseleave="isCursorActive = false"
    class="carousel-arc -mx-[var(--margin-mobile)] lg:-mx-[var(--margin-desktop)] lg:mb-[20rem]"
  >
    <CustomCursor :active="isCursorActive"> Drag </CustomCursor>
    <div
      ref="viewportRef"
      class="arc__viewport relative h-[100dvh] w-full touch-none overflow-hidden active:cursor-grabbing lg:overflow-visible"
    >
      <div
        class="arc__pivot absolute left-1/2 h-0 w-0"
        :style="{
          top: `calc(50% + ${radius}px)`,
          transform: 'translateX(-50%)',
        }"
      >
        <div
          v-for="value in projects"
          :key="value.name"
          ref="cardRefs"
          class="arc__card absolute will-change-transform"
          style="top: 0; left: 0; transform-origin: center center"
        >
          <ProjectCard
            :name="value.name"
            :image="value.image"
            :description="value.description"
            :tech="value.tech"
            :website="value.website"
            :github="value.github"
          />
        </div>
      </div>
    </div>
  </section>
</template>
