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
  angle = 0,
  angleTwo = 0;

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
  camera.position.z = aspect < 1 ? 10 : 7.5;

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
  const geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
  const material = new THREE.MeshStandardMaterial({
    color: 0x2b2b2b,
    roughness: 0.85,
    metalness: 0.6,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = THREE.MathUtils.degToRad(30);
  mesh.rotation.z = THREE.MathUtils.degToRad(30);
  mesh.position.set(-0.8, -0.5, 0);

  mesh.receiveShadow = true;
  mesh.castShadow = true;

  scene.add(mesh);

  // 🎯 NEW: Smaller Cube
  const smallGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
  const smallMaterial = new THREE.MeshStandardMaterial({
    color: 0x2b2b2b,
    roughness: 0.85,
    metalness: 0.6,
  });
  const smallCube = new THREE.Mesh(smallGeometry, smallMaterial);

  // 📌 Position it (X, Y, Z)
  const xOffset = 0.8 * (clientWidth / clientHeight); // Adjusts with screen size
  smallCube.position.set(xOffset, 0.5, 1);
  smallCube.rotation.y = THREE.MathUtils.degToRad(45);

  smallCube.castShadow = true;
  smallCube.receiveShadow = true;
  scene.add(smallCube);

  // Pointlight 1:
  const pointLightOne = new THREE.PointLight(0x2a2cea, 50, 15, 2);
  // color, intensity, distance, decay
  pointLightOne.position.set(0.1, -3, 0.1);
  const sphere = new THREE.SphereGeometry(0.1, 32, 10);
  pointLightOne.add(
    new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x2a2cea })),
  );
  scene.add(pointLightOne);

  // Pointlight 2:
  const pointLightTwo = new THREE.PointLight(0xddfa39, 50, 15, 2);
  // color, intensity, distance, decay
  pointLightTwo.position.set(0.6, -3, 0.01);
  const sphereTwo = new THREE.SphereGeometry(0.1, 32, 10);
  pointLightTwo.add(
    new THREE.Mesh(
      sphereTwo,
      new THREE.MeshBasicMaterial({
        color: 0xddfa39,
      }),
    ),
  );
  scene.add(pointLightTwo);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 0.6);
  light.position.set(5, 10, 7.5);
  light.castShadow = true;
  light.shadow.mapSize.width = 2048; // Keep shadow quality decent but not crazy heavy
  light.shadow.mapSize.height = 2048;
  light.shadow.radius = 3;
  light.shadow.bias = -0.002;
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 50;
  light.shadow.camera.left = -6;
  light.shadow.camera.right = 6;
  light.shadow.camera.top = 6;
  light.shadow.camera.bottom = -6;
  scene.add(light);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.03));

  const clock = new THREE.Clock();

  // Animate
  const animate = () => {
    animationId = requestAnimationFrame(animate);

    const delta = clock.getDelta();

    smallCube.rotation.z += delta * 0.1;
    smallCube.rotation.y -= delta * 0.1;
    mesh.rotation.x -= delta * 0.1;

    angle -= 0.008; // Orbit speed (same)
    angleTwo += 0.008;

    const orbitRadiusX = 2.2;
    const orbitRadiusZ = 2;
    // Vertical amplitude (Y)
    const orbitHeight = 1.2;

    const orbitCenterX = (mesh.position.x + smallCube.position.x) / 2;

    // point 1 anmation
    pointLightOne.position.x = orbitCenterX + orbitRadiusX * Math.cos(angle);
    pointLightOne.position.z = mesh.position.z + orbitRadiusZ * Math.sin(angle);
    pointLightOne.position.y =
      mesh.position.y + orbitHeight * Math.sin(angle * 2);
    pointLightOne.intensity = 100 + 100 * Math.sin(angle * 4);

    const orbitRadiusZTwo = 2.3;

    // point 2 animation
    pointLightTwo.position.x = orbitCenterX + orbitRadiusX * Math.cos(angleTwo);
    pointLightTwo.position.z =
      mesh.position.z + orbitRadiusZTwo * Math.sin(angleTwo);
    pointLightTwo.position.y =
      mesh.position.y + orbitHeight * Math.sin(angleTwo * 2);

    pointLightTwo.intensity = 100 + 100 * Math.sin(angleTwo * 4);

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
