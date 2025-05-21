<script setup lang="jsx">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const container = ref(null);
const canvas = ref(null);

onMounted(() => {
  if (!container.value) return;

  const width = container.value.clientWidth;
  const height = container.value.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.01, 200);
  camera.position.z = 13; // move back for better view

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: canvas.value,
  });
  renderer.setSize(width, height);

  // Lights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(3, 5, 5);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const controls = new OrbitControls(camera, canvas.value);
  controls.enableZoom = false;
  controls.enableDamping = true;

  // Loader:
  const loader = new GLTFLoader();
  loader.load(
    "/assets/3D/pizza/source/pizza.glb",
    (gltf) => {
      const pizza = gltf.scene;
      pizza.scale.set(4, 4, 4);
      pizza.position.set(0, 0, 0);
      scene.add(pizza);

      const animate = () => {
        requestAnimationFrame(animate);
        pizza.rotation.z -= 0.007;
        renderer.render(scene, camera);
        controls.update();
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
    class="relative h-[300px] w-full max-lg:h-[400px] lg:h-[600px]"
  >
    <canvas class="absolute inset-0 z-0" ref="canvas"></canvas>
    <div class="absolute bottom-0 flex flex-col max-md:pb-10">
      <div class="relative z-10">
        <h1 class="title-mobile-h5 lg:title-h5 text-white">
          Delicious slice of
          <span class="text-primary relative font-bold">
            pizza
            <svg
              viewBox="0 0 110 54"
              class="absolute -top-[0.2em] right-[-1.1em] -z-10 w-[4em]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.66 4.442C19.968 3.87 51.687 7.98 59.806 10.15c8.119 2.17 42.004 11.335 42.193 22.216.19 10.881-23.966 21.44-51.095 18.938C23.775 48.802 2.174 36.415 2.001 25.7 1.828 14.986 19.498 5.55 42.092 2.767c22.595-2.785 62.01 7.677 49.853 28.879"
                stroke="#ddfa39"
                stroke-width="2"
                fill="none"
                fill-rule="evenodd"
              ></path>
            </svg>
          </span>
        </h1>
      </div>
      <div class="flex items-center gap-2.5">
        <h1 class="title-mobile-h5 lg:title-h5 relative z-10 text-white">
          hawaian
          <div
            class="after:bg-secondary after:absolute after:top-1/2 after:right-0 after:left-0 after:h-1 after:content-['']"
          ></div>
        </h1>
        <h1 class="title-mobile-h5 lg:title-h5 z-10 text-white italic">
          pepperoni
        </h1>
      </div>
    </div>
  </div>
</template>
