<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import * as THREE from "three";

const wrapper = ref(null);
const canvas = ref(null);

let renderer, scene, camera, animationId;

onMounted(() => {
  // Scene
  scene = new THREE.Scene();

  // Camera

  const { clientWidth, clientHeight } = wrapper.value;

  camera = new THREE.PerspectiveCamera(
    40,
    clientWidth / clientHeight,
    0.1,
    1000,
  );
  camera.position.z = 7;

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true });
  renderer.setSize(clientWidth, clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Geometry & Material Cube One:
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 0xddfa39,
    roughness: 0.2,
    metalness: 0.8,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 🎯 NEW: Smaller Cube
  const smallGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
  const smallMaterial = new THREE.MeshStandardMaterial({
    color: 0x5639fa,
    roughness: 0.5,
    metalness: 0.5,
  });
  const smallCube = new THREE.Mesh(smallGeometry, smallMaterial);

  // 📌 Position it (X, Y, Z)
  const xOffset = 1 * (clientWidth / clientHeight); // Adjusts with screen size
  smallCube.position.set(xOffset, 1, 0);
  scene.add(smallCube);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(5, 10, 7.5);
  scene.add(light);

  scene.add(new THREE.AmbientLight(0xffffff, 0.3));

  // Animate
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    mesh.rotation.y += 0.01;
    mesh.rotation.x += 0.005;

    smallCube.rotation.y -= 0.02; //  rotate the opposite way
    smallCube.rotation.x -= 0.01;
    renderer.render(scene, camera);
  };

  animate();

  // Handle resize
  function onWindowResize() {
    const { clientWidth, clientHeight } = wrapper.value;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight);
  }
  window.addEventListener("resize", onWindowResize);
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", onWindowResize);
  renderer.dispose();
});
</script>

<template>
  <div ref="wrapper" class="relative h-full max-h-[700px] w-full">
    <canvas ref="canvas" class="h-full w-full"></canvas>
  </div>
</template>
