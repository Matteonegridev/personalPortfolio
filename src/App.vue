<script setup lang="ts">
import Hero from "./layout/Hero.vue";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div className="mx-[var(--margin-mobile)] lg:mx-[var(--margin-desktop)]">
    <Navbar />
    <Hero />
  </div>
</template>
