<template>
  <div class="absolute inset-0 z-0">
    <canvas ref="canvas" class="h-full w-full"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { useMouse } from "@vueuse/core";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const canvas = ref(null);
let renderer, scene, camera, animationId;

let { x, y } = useMouse({ touch: false });

onMounted(() => {
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xffffff, 0.015);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 5;

  // Render:
  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Add particles
  const particles = new THREE.BufferGeometry();
  // const particleCount = 4000;
  // const positions = new Float32Array(particleCount * 3);
  const vertices = [];
  const sprite = new THREE.TextureLoader().load("../assets/texture/disc.png");

  for (let i = 0; i < 10000; i++) {
    const x = THREE.MathUtils.randFloatSpread(500);
    const y = THREE.MathUtils.randFloatSpread(500);
    const z = THREE.MathUtils.randFloatSpread(500);

    vertices.push(x, y, z);
  }

  // for (let i = 0; i < particleCount * 3; i++) {
  //   positions[i] = (Math.random() - 0.5) * 10;
  // }

  particles.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3),
  );

  const material = new THREE.PointsMaterial({
    color: 0xddfa39,
    size: 2,
    map: sprite,
    transparent: true,
    alphaTest: 0.5,
  });

  const pointCloud = new THREE.Points(particles, material);
  scene.add(pointCloud);

  // Orbit Controls:
  const controls = new OrbitControls(camera, canvas.value);
  controls.autoRotate = true;
  controls.enableDamping = true;
  controls.enableZoom = false;

  // Handle resize
  window.addEventListener("resize", onWindowResize);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  const moveParticles = () => {
    const targetX = (x.value / window.innerWidth - 0.5) * 2;
    const targetY = -(y.value / window.innerHeight - 0.5) * 2;

    camera.position.x += (targetX * 100 - camera.position.x) * 0.005;
    camera.position.y += (targetY * 100 - camera.position.y) * 0.005;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  };

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    pointCloud.rotation.y += 0.001;
    renderer.render(scene, camera);
    moveParticles();
  };

  animate();
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
