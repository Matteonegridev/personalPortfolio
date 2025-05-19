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

  // Add Orthographic Camera:
  // const ratio = clientWidth / clientHeight;
  // const camera = new THREE.OrthographicCamera(
  //   -1 * ratio, // left
  //   1 * ratio, // right
  //   1, // top
  //   -1, //below
  //   0.3, // near
  //   100, //far
  // );

  camera.position.z = 3;

  // Initialize the render:
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
    // Solution 1 to antialias:
    antialias: true,
  });
  renderer.setSize(clientWidth, clientHeight);
  // Solution 2 to antialias based on the device pixelRatio:
  const maxPixel = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(maxPixel);

  // Orbit controls allow to move the object:
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

  // Resize:
  const resize = () => {
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    // call again setSize:
    renderer.setSize(clientWidth, clientHeight);
  };
  window.addEventListener("resize", resize);
});
</script>

<template>
  <div ref="container" class="h-full w-full">
    <canvas ref="canvas"></canvas>
  </div>
</template>
