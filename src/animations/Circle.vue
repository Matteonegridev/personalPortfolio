<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";

const container = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!container.value) return;

  const { clientWidth, clientHeight } = container.value;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    clientWidth / clientHeight,
    0.1,
    1000,
  );
  camera.position.z = 4;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(clientWidth, clientHeight);
  container.value.appendChild(renderer.domElement);

  // Glowing Wireframe Sphere
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    color: 0xddfa39,
    wireframe: true,
    transparent: true,
    opacity: 0.7,
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Sparks (flickering light particles)
  const sparkGeometry = new THREE.BufferGeometry();
  const sparkCount = 100;
  const sparkPositions = new Float32Array(sparkCount * 3);

  for (let i = 0; i < sparkCount * 3; i++) {
    sparkPositions[i] = (Math.random() - 0.5) * 3;
  }

  sparkGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(sparkPositions, 3),
  );
  const sparkMaterial = new THREE.PointsMaterial({
    color: 0xddfa39,
    size: 0.03,
    transparent: true,
    opacity: 0.6,
  });
  const sparks = new THREE.Points(sparkGeometry, sparkMaterial);
  scene.add(sparks);

  const animate = () => {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.002;
    sparks.rotation.y -= 0.001;
    renderer.render(scene, camera);
  };

  animate();

  // Handle resize
  window.addEventListener("resize", () => {
    if (!container.value) return;
    const { clientWidth, clientHeight } = container.value;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight);
  });
});
</script>

<template>
  <div ref="container" class="h-full w-full"></div>
</template>
