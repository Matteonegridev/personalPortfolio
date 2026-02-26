<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// 1. Accept an active prop to control visibility
defineProps<{
  active: boolean;
}>();

const x = ref(-100);
const y = ref(-100);
const isOver = ref(false);

// 2. Track mouse globally to prevent lag/stuttering
const updatePosition = (clientX: number, clientY: number) => {
  x.value = clientX;
  y.value = clientY;
};

const handleMouseMove = (e: MouseEvent) => {
  updatePosition(e.clientX, e.clientY);
};

// Trigger the squish on click
const handlePointerDown = () => {
  isOver.value = true;
};

// Release the squish on let-go
const handlePointerUp = () => {
  isOver.value = false;
};

onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  window.addEventListener("mousedown", handlePointerDown);
  window.addEventListener("mouseup", handlePointerUp);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("mousedown", handlePointerDown);
  window.removeEventListener("mouseup", handlePointerUp);
});
</script>

<template>
  <Teleport to="body">
    <div
      class="cursor-tracker"
      :style="{ transform: `translate3d(${x}px, ${y}px, 0)` }"
    >
      <div class="cursor-visual" :class="{ 'is-active': active, over: isOver }">
        <span class="cursor-text"><slot>View</slot></span>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* 1. The Tracker Layer */
.cursor-tracker {
  position: fixed;
  top: -50px;
  left: -30px;
  pointer-events: none; /* CRITICAL: Allows clicking through */
  z-index: 99999;
  /* NO transition property here to prevent lag */
}

/* 2. The Visual & Animation Layer */
.cursor-visual {
  width: 70px; /* Adjust size here */
  height: 70px;
  border-radius: 50%;
  background-color: var(--color-secondary);
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Initial Hidden State */
  opacity: 0;
  transform: scale(0.2); /* Starts tiny */

  /* Snappy custom easing for the scale and fade */
  transition:
    opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
    transform 1s cubic-bezier(0.16, 1, 0.3, 1);
}

/* 3. The Active State */
/* 2. The Active (Idle) State & The "Bounce Back" Route */
.cursor-visual.is-active {
  opacity: 1;
  transform: scale(1);

  /* CRITICAL OVERRIDE: 
    When the '.over' class is removed, the browser reverts to this state.
    It will use THIS specific cubic-bezier to execute the springy bounce back. 
  */
  transition:
    opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

/* 3. The Pointer Down (Squished) State & The "Shrink Down" Route */
.cursor-visual.is-active.over {
  /* Compose the transforms on the GPU */
  transform: scale(1) scale(0.85);

  /* CRITICAL OVERRIDE: 
    When the '.over' class is added, it immediately overwrites the bounce transition 
    with this fast, linear squish. 
  */
  transition: transform 0.2s ease-out;
}

.cursor-text {
  font-weight: bold;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 0.75rem;
  letter-spacing: 3px;
}
</style>
