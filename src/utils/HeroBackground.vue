<template>
  <div class="absolute inset-0 z-0">
    <canvas ref="canvas" class="h-full w-full"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import * as THREE from "three";

const canvas = ref(null);
let renderer, scene, camera, animationId;

onMounted(() => {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const particles = new THREE.BufferGeometry();
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xddfa39,
    size: 0.02,
  });

  const pointCloud = new THREE.Points(particles, material);
  scene.add(pointCloud);

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    pointCloud.rotation.y += 0.001;
    renderer.render(scene, camera);
  };

  animate();

  // Handle resize
  window.addEventListener("resize", onWindowResize);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onWindowResize);
  renderer.dispose();
});
</script>

<style scoped>
canvas {
  display: block;
}
</style>
