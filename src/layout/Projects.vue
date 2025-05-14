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
  autoplay: 4000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
};
</script>

<template>
  <section class="-mx-[var(--margin-mobile)] mt-100 mb-11">
    <div>
      <h2
        class="text-secondary title-mobile-h2 lg:title-h2 mx-[var(--margin-mobile)] mb-8"
      >
        Projects
      </h2>
    </div>

    <Carousel
      v-bind="config"
      breakpoint-mode="viewport"
      :breakpoints="{
        300: {
          itemsToShow: 1.45,
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
      <Slide
        v-for="value in projects"
        :key="value.name"
        class="border-dark-variant bg-dark border px-2 py-4"
      >
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
            <span class="font-black text-white lg:text-6xl">←</span>
          </template>
          <template #next>
            <span class="font-black text-white lg:text-6xl">→</span>
          </template>
        </CarouselNavigation>
      </template>
    </Carousel>
  </section>
</template>

<style lang="css">
:root {
  --carousel-transition: 300ms;
  --carousel-opacity-inactive: 0.7;
  --carousel-opacity-active: 1;
  --carousel-opacity-near: 0.5;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition:
    opacity var(--carousel-transition),
    transform var(--carousel-transition);
}

.carousel.is-dragging .carousel__slide {
  transition:
    opacity var(--carousel-transition),
    transform var(--carousel-transition);
}

.carousel__slide--prev {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(-15deg) scale(0.9);
}

.carousel__slide--active {
  opacity: var(--carousel-opacity-active);
  transform: rotateY(0) scale(1);
}

.carousel__slide--next {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(15deg) scale(0.9);
}
</style>
