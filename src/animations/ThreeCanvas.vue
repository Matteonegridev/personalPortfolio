<!-- <script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { MdHeight } from "oh-vue-icons/icons";
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";

const canvasRef = ref(null);

onMounted(() => {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // 1. Scene
  const scene = new THREE.Scene();

  // 2. Camera (positioned above, looking down the Z axis)
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000,
  );
  camera.position.set(0, 5, 10);
  camera.lookAt(0, 0, 0);

  // 3. Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
  });
  renderer.setSize(sizes.width, sizes.height);

  // 4. Grid (Three.js built-in helper)
  const gridGeometry = new THREE.PlaneGeometry(10, 10);

  const gridMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(0x00ffff) }, // Cyan
    },
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const grid = new THREE.Mesh(gridGeometry, gridMaterial);
  grid.rotation.x = -Math.PI / 2;
  grid.position.y = 0;
  scene.add(grid);

  let clock = new THREE.Clock();
  // 5. Animation loop
  function animate() {
    let elapsedTime = clock.getElapsedTime();
    requestAnimationFrame(animate);

    // Update shader time (flows forever, never resets)
    grid.material.uniforms.time.value += 0.01;

    renderer.render(scene, camera);
  }

  animate();
});
</script>

<template>
  <div class="flex items-center justify-center">
    <canvas ref="canvasRef" class="h-screen" />
  </div>
</template> -->
