<script setup>
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: `https://unsplash.it/800/600`,
}));

const config = {
  height: 400,
  itemsToShow: 1.5,
  gap: 40,
  autoplay: 2000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
};
</script>

<template>
  <section class="mt-130">
    <Carousel
      v-bind="config"
      breakpoint-mode="viewport"
      :breakpoints="{
        700: {
          itemsToShow: 2.5,
          snapAlign: 'center',
        },
        1000: {
          itemsToShow: 3.5,
          snapAlign: 'center',
        },
      }"
    >
      <Slide v-for="image in images" :key="image.id">
        <img :src="image.url" alt="image" />
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </section>
</template>
