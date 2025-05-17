<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const container = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!container.value) return;

  const width = container.value.clientWidth;
  const height = container.value.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.z = 8; // move back for better view

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  container.value.appendChild(renderer.domElement);

  // Lights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(3, 5, 5);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const loader = new GLTFLoader();

  loader.load(
    "/assets/3D/pizza/source/pizza.glb",
    (gltf) => {
      const pizza = gltf.scene;
      pizza.scale.set(3, 3, 3);
      pizza.position.set(0, -1, 0);
      scene.add(pizza);

      const animate = () => {
        requestAnimationFrame(animate);
        pizza.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();
    },
    undefined,
    (error) => {
      console.error("Error loading model:", error);
    },
  );

  window.addEventListener("resize", () => {
    if (!container.value) return;
    const width = container.value.clientWidth;
    const height = container.value.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
});
</script>

<template>
  <div
    ref="container"
    class="relative h-[300px] w-full sm:h-[400px] lg:h-full"
  ></div>
</template>
