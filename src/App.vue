<script setup lang="ts">
import Hero from "./layout/Hero.vue";
import Navbar from "./components/Navbar.vue";
import About from "./layout/About.vue";
import Banner from "./utils/Banner.vue";
import Projects from "./layout/Projects.vue";
import Contact from "./layout/Contact.vue";
</script>

<template>
  <div class="mx-[var(--margin-mobile)] lg:mx-[var(--margin-desktop)]">
    <Navbar />
    <Hero />
    <About />
    <Banner />
    <Projects />
    <Contact />
  </div>
</template>
