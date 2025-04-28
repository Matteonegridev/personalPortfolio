<script setup lang="ts">
const navLinks = ["About Me", "Projects", "Contact Me"];
</script>

<template>
  <header>
    <nav>
      <ul v-for="link in navLinks">
        <li>
          <a href="#">{{ link }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>
