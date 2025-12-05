<script setup lang="jsx">
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { emissive } from "three/tsl";

const container = ref(null);
const canvas = ref(null);

onMounted(() => {
  const { clientWidth, clientHeight } = container.value;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    60,
    clientWidth / clientHeight,
    0.1,
    1000,
  );

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(clientWidth, clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // LIGHTS
  scene.add(new THREE.AmbientLight(0xffffff, 2));
  const dir = new THREE.DirectionalLight(0xffffff, 3);
  dir.position.set(5, 10, 10);
  scene.add(dir);

  const loader = new GLTFLoader();

  let root = null;
  let sphere = null;
  let sun = null;
  let roads = null;

  loader.load("/assets/model/scene.gltf", (gltf) => {
    root = gltf.scene;
    scene.add(root);

    // Fix materials
    root.traverse((o) => {
      if (!o.isMesh) return;

      // Always render both sides
      o.material.side = THREE.DoubleSide;

      // --- SUN ---
      if (o.name === "Object_16") {
        const tex = new THREE.TextureLoader().load(
          "/assets/model/textures/Sun.001_emissive.png",
        );

        tex.colorSpace = THREE.SRGBColorSpace;

        o.material = new THREE.MeshStandardMaterial({
          map: tex,
          emissiveMap: tex,
          emissive: new THREE.Color("#ffffff"),
          emissiveIntensity: 5,
          alphaMap: tex,
          transparent: true,
          side: THREE.DoubleSide,
          toneMapped: false,
        });
      }
    });

    // Find objects
    sphere = root.getObjectByName("Sphere_0");
    sun = root.getObjectByName("Sun001_6");

    const r1 = root.getObjectByName("Roundcube003_3");
    const r2 = root.getObjectByName("Roundcube004_4");
    const r3 = root.getObjectByName("Roundcube005_5");

    // Group the roads
    roads = new THREE.Group();
    if (r1) roads.add(r1);
    if (r2) roads.add(r2);
    if (r3) roads.add(r3);
    roads.position.y = 15;

    scene.add(roads);

    // --- CAMERA INSIDE SPHERE ---
    if (sphere) {
      const sphereBox = new THREE.Box3().setFromObject(sphere);
      const center = sphereBox.getCenter(new THREE.Vector3());
      const radius = sphereBox.getSize(new THREE.Vector3()).length() * 0.5;

      // Move camera deeper inside the violet sphere
      const distance = radius * 0.4;

      camera.position.set(center.x, center.z + distance);

      //  POINT CAMERA TOWARD SUN
      const sunWorldPos = new THREE.Vector3();
      sun.getWorldPosition(sunWorldPos);

      camera.lookAt(sunWorldPos);

      if (sun) sun.position.y += size.y * 0.05;
    }
  });

  // ---- ANIMATION ----
  const clock = new THREE.Clock();
  let frameId;

  const animate = () => {
    frameId = requestAnimationFrame(animate);

    const t = clock.getElapsedTime();
    if (roads) {
      roads.rotation.x = t * 0.1;
    }
    if (sun) {
      sun.position.y = Math.sin(t * 0.05) * 11;
    }

    renderer.render(scene, camera);
  };

  animate();

  // RESIZE
  const handleResize = () => {
    if (!container.value) return;
    const { clientWidth, clientHeight } = container.value;

    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight);
  };
  window.addEventListener("resize", handleResize);

  onBeforeUnmount(() => {
    cancelAnimationFrame(frameId);
    window.removeEventListener("resize", handleResize);
    renderer.dispose();
  });
});
</script>

<template>
  <div
    ref="container"
    class="absolute inset-0 -z-10 -mx-[var(--margin-mobile)] lg:-mx-[var(--margin-desktop)]"
  >
    <canvas ref="canvas" class="h-full w-full"></canvas>
  </div>
</template>
