<script setup lang="jsx">
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const container = ref(null);
const canvas = ref(null);

onMounted(() => {
  // import sizes:
  const { clientWidth, clientHeight } = container.value;

  // Initialize scene:
  const scene = new THREE.Scene();

  // Add Object:
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0x5639fa,
    roughness: 0.5,
    metalness: 0.5,
  });

  const sphereMesh = new THREE.Mesh(geometry, material);
  scene.add(sphereMesh);

  // Adjust Light:
  const light = new THREE.DirectionalLight(0xfffff, 1);
  light.position.set(4.5, 12.5, 5.5);
  scene.add(light);

  // Initialize Camera:
  const camera = new THREE.PerspectiveCamera(
    50, // field of view
    clientWidth / clientHeight, // aspect ratio
    0.3, // near
    20, // far
  );

  camera.position.z = 3;

  // Initialize the render:
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
  });
  renderer.setSize(clientWidth, clientHeight);

  const controls = new OrbitControls(camera, canvas.value);
  controls.autoRotate = true;
  controls.enableDamping = true;
  controls.enableZoom = false;

  // Animate:
  const animate = () => {
    const animation = requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
  };

  animate();
});
</script>

<template>
  <div ref="container" class="h-full w-full">
    <canvas ref="canvas"></canvas>
  </div>
</template>
