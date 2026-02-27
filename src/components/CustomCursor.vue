<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, reactive } from "vue";

const currentPosition = reactive({ x: 0, y: 0 });
const targetPosition = { x: 0, y: 0 };
const isOver = ref(false);
const ease = 0.1;

const props = defineProps<{
  isActive: boolean;
}>();

function updateMouse(e: MouseEvent) {
  targetPosition.x = e.clientX;
  targetPosition.y = e.clientY - 10;
}

const animation = () => {
  const newX = targetPosition.x - currentPosition.x;
  const newY = targetPosition.y - currentPosition.y;

  currentPosition.x += newX * ease;
  currentPosition.y += newY * ease;

  requestAnimationFrame(animation);
};

const handlePointOver = () => {
  isOver.value = true;
};

const handlePointUp = () => {
  isOver.value = false;
};

const cursorStyle = computed(() => ({
  transform: `translate3d(${currentPosition.x - 35}px, ${currentPosition.y - 35}px, 0)`,
}));

onMounted(() => {
  window.addEventListener("mousemove", updateMouse, { passive: true });
  window.addEventListener("mousedown", handlePointOver);
  window.addEventListener("mouseup", handlePointUp);

  requestAnimationFrame(animation);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", updateMouse);
  window.removeEventListener("mousedown", handlePointOver);
  window.removeEventListener("mouseup", handlePointUp);
});
</script>

<template>
  <Teleport to="body">
    <div class="cursor-tracker" :style="cursorStyle">
      <div
        class="cursor-visual"
        :class="{ 'active-cursor': isActive, 'drag-cursor': isOver }"
      >
        <span class="cursor-text">Drag</span>
      </div>
    </div>
  </Teleport>
</template>

<style lang="css" scoped>
.cursor-tracker {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 99999;
}
.cursor-visual {
  background: var(--color-secondary);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: scale(0.2);
  /* 1. THE EXIT TRANSITION (Faster, smoother easing out) */
  transition:
    opacity 200ms ease-out,
    transform 200ms ease-out;

  will-change: opacity, transform;
}
.active-cursor {
  opacity: 1;
  transform: scale(1);
  /* enter transition */
  transition:
    opacity 350ms cubic-bezier(0.86, 0.2, 0.37, 0.94),
    transform 350ms cubic-bezier(1, 0.78, 0.61, 0.94);
  animation: squish 2s infinite backwards;
}
.drag-cursor {
  transform: scale(0.85);
  transition: transform 0.2s ease-out;
}
.cursor-text {
  font-family: "Plus Jakarta Sans";
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 0.9rem;
}
@keyframes squish {
  0% {
    transform: scale3d(10px, 20px, 1px);
  }
  100% {
    transform: scale3d(14px, 20px, 1px);
  }
}
</style>
