<script setup>
import "vue3-carousel/carousel.css";
import Card from "../components/Card.vue";
import {
  Carousel,
  Slide,
  Navigation as CarouselNavigation,
} from "vue3-carousel";

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: `https://unsplash.it/800/600`,
}));

const config = {
  autoplay: 5000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
  gap: 20,
};
</script>

<template>
  <section class="mt-100 mb-11">
    <div>
      <h2 class="text-secondary title-mobile-h2 lg:title-h2 lg:mb-14">
        Projects
      </h2>
    </div>
    <Carousel
      v-bind="config"
      breakpoint-mode="viewport"
      :breakpoints="{
        300: {
          itemsToShow: 1,
          snapAlign: 'center',
        },
        500: {
          itemsToShow: 1.5,
          snapAlign: 'center',
        },
        1000: {
          itemsToShow: 2.5,
          snapAlign: 'center',
        },
      }"
    >
      <Slide v-for="image in images" :key="image.id">
        <Card :image="image.url" />
      </Slide>

      <template #addons>
        <CarouselNavigation>
          <template #prev>
            <span class="text-primary">←</span>
          </template>
          <template #next>
            <span class="text-primary">→</span>
          </template>
        </CarouselNavigation>
      </template>
    </Carousel>
  </section>
</template>
