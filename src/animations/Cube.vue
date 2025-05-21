<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import * as THREE from "three";
import clsx from "clsx";
const wrapper = ref(null);
const canvas = ref(null);

const props = defineProps(["class"]);

let renderer,
  scene,
  camera,
  animationId,
  angle = 0;

onMounted(() => {
  // Scene
  scene = new THREE.Scene();

  // Camera
  const { clientWidth, clientHeight } = wrapper.value;

  const aspect = clientWidth / clientHeight;

  camera = new THREE.PerspectiveCamera(
    40,
    clientWidth / clientHeight,
    0.1,
    1000,
  );
  camera.position.z = aspect < 1 ? 9 : 6;

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(clientWidth, clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Geometry & Material Cube One:
  const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  const material = new THREE.MeshStandardMaterial({
    color: 0xddfa39,
    roughness: 0.2,
    metalness: 0.8,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = THREE.MathUtils.degToRad(30);
  mesh.rotation.z = THREE.MathUtils.degToRad(30);
  mesh.position.set(-0.5, -0.5, 0);

  mesh.receiveShadow = true;
  mesh.castShadow = true;

  scene.add(mesh);

  // 🎯 NEW: Smaller Cube
  const smallGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
  const smallMaterial = new THREE.MeshStandardMaterial({
    color: 0x5639fa,
    roughness: 0.5,
    metalness: 0.5,
  });
  const smallCube = new THREE.Mesh(smallGeometry, smallMaterial);

  // 📌 Position it (X, Y, Z)
  const xOffset = 0.8 * (clientWidth / clientHeight); // Adjusts with screen size
  smallCube.position.set(xOffset, 0.5, 1);
  smallCube.rotation.y = THREE.MathUtils.degToRad(45);

  smallCube.castShadow = true;
  smallCube.receiveShadow = true;
  scene.add(smallCube);

  // Pointlight:
  const pointLight = new THREE.PointLight(0x5639fa, 400);
  const sphere = new THREE.SphereGeometry(0.1, 16, 10);

  pointLight.add(
    new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x2a2cea })),
  );
  pointLight.position.set(0.1, -3, 0.1);
  scene.add(pointLight);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(5, 10, 7.5);
  light.castShadow = true;
  light.shadow.mapSize.width = 4096;
  light.shadow.mapSize.height = 4096;

  light.shadow.radius = 4;
  light.shadow.bias = -0.001;

  light.shadow.camera.near = 1;
  light.shadow.camera.far = 50;
  light.shadow.camera.left = -5;
  light.shadow.camera.right = 5;
  light.shadow.camera.top = 5;
  light.shadow.camera.bottom = -5;

  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));

  // Animate
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    smallCube.rotation.y += 0.001;
    mesh.rotation.x -= 0.001;
    angle -= 0.007; // Orbit speed (same)

    const orbitRadiusX = 1.5;
    const orbitRadiusZ = 1;
    // Vertical amplitude (Y)
    const orbitHeight = 1.2;

    pointLight.position.x = mesh.position.x + orbitRadiusX * Math.cos(angle);
    pointLight.position.z = mesh.position.z + orbitRadiusZ * Math.sin(angle);
    pointLight.position.y = mesh.position.y + orbitHeight * Math.sin(angle * 2);
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
  <div ref="wrapper" class="relative h-[300px] w-full md:h-[500px]">
    <canvas ref="canvas" class="h-full w-full"></canvas>
  </div>
</template>
