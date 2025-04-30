<script setup lang="ts">
import Button from "../components/Button.vue";
</script>

<template>
  <section class="mb-10 lg:grid lg:h-[70dvh] lg:grid-cols-2" id="About Me">
    <div class="lg:place-content-start">
      <h2 class="text-secondary title-mobile-h2 lg:title-h2 mb-14">About Me</h2>
      <h3 class="title-mobile-h3 lg:title-h3 mb-2 text-white">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, dolorem.
      </h3>
      <Button
        variant="primary"
        label="Follow My Linkedin!"
        class="body-font-mobile hover:bg-dark hover: mt-2 cursor-pointer transition-all duration-400 ease-in-out hover:shadow-[0px_0px_10px_2px_rgba(221,_250,_57,_0.8)] hover:outline hover:outline-white max-lg:hidden"
      />
    </div>
    <p
      class="body-font-mobile lg:body-font-desktop text-white lg:place-content-end"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur dolores
      incidunt consequuntur numquam quisquam. Corrupti eos dolorem tempore
      accusantium in. Deserunt voluptate minus repellat distinctio neque numquam
      assumenda odit eos.
    </p>
  </section>
</template>
