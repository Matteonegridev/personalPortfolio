<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { projects } from "../utils/data";

import gsap from "gsap";
import Draggable from "gsap/Draggable";
import ProjectCard from "./ProjectCard.vue";

// 1. Dependency Verification
gsap.registerPlugin(Draggable);

// let resizeObserver: ResizeObserver;
let draggableInstance: Draggable | null = null;

onMounted(() => {
  const container = document.querySelector(".gallery-container") as HTMLElement;
  const cards = gsap.utils.toArray<HTMLElement>(".project-card");
  const proxy = document.createElement("div"); // The invisible layer we actually drag

  if (!container || cards.length === 0) return;

  const total = cards.length;
  let rawProgress = 0; // Tracks absolute movement (e.g., -5.2, 10.8)
  const dragDistancePerCard = 300; // Pixels required to move to the next card

  // 2. The Holographic Math Engine
  function updateCards() {
    const wrappedProgress = gsap.utils.wrap(0, total, rawProgress);

    const radius = container.offsetWidth * 0.7;
    const anglePerCard = Math.PI / 5;

    cards.forEach((card, i) => {
      let diff = i - wrappedProgress;

      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      const angle = diff * anglePerCard;

      const xOffset = radius * Math.sin(angle);
      const yOffset = radius * (1 - Math.cos(angle));

      // THE NEW ADDITION: Rotational Mapping
      // Adjust the '15' to increase or decrease the severity of the tilt
      const rotation = diff * 25;

      const alpha = gsap.utils.clamp(0, 1, 2 - Math.abs(diff));
      const scale = 1 - Math.abs(diff) * 0.15;

      gsap.set(card, {
        x: xOffset,
        y: yOffset,
        rotation: rotation, // Re-mapped to the calculated tilt
        scale: scale,
        autoAlpha: alpha,
        zIndex: Math.round(100 - Math.abs(diff) * 10),
      });
    });
  }

  // Initial setup render
  gsap.set(cards, { top: "50%", left: "50%", xPercent: -50, yPercent: -50 });
  updateCards();

  // 3. The Invisible Drag Proxy
  draggableInstance = Draggable.create(proxy, {
    type: "x",
    trigger: container, // Dragging anywhere in the main window triggers the proxy
    inertia: false, // We handle our own snapping
    onDrag: function () {
      // Convert X pixel movement into fractional card progress
      rawProgress = this.x / -dragDistancePerCard;
      updateCards();
    },
    onDragEnd: function () {
      // 4. The Magnetic Snap
      const snappedProgress = Math.round(rawProgress);

      gsap.to(proxy, {
        x: snappedProgress * -dragDistancePerCard,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: function () {
          // Read the tweening X value and continuously update the arc
          rawProgress =
            (gsap.getProperty(proxy, "x") as number) / -dragDistancePerCard;
          updateCards();
        },
      });
    },
  })[0];
});

onUnmounted(() => {
  if (draggableInstance) draggableInstance.kill();
});
</script>

<template>
  <main
    class="gallery-container relative mb-[20rem] flex h-[80dvh] cursor-grab touch-none items-center justify-center overflow-visible active:cursor-grabbing lg:-mx-[var(--margin-desktop)]"
  >
    <ProjectCard
      v-for="value in projects"
      :key="value.name"
      :name="value.name"
      :image="value.image"
      :description="value.description"
      :tech="value.tech"
      :github="value.github"
      :web="value.website"
    />
  </main>
</template>
