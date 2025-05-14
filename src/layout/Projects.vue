<script setup>
import "vue3-carousel/carousel.css";
import Card from "../components/Card.vue";
import { projects } from "../utils/data";
import {
  Carousel,
  Slide,
  Navigation as CarouselNavigation,
} from "vue3-carousel";

const config = {
  height: 600,
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
      <Slide v-for="value in projects" :key="value.name" class="">
        <Card
          :title="value.name"
          :image="value.image"
          :description="value.description"
          :tech="value.tech"
          :github="value.github"
          :web="value.website"
        />
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
