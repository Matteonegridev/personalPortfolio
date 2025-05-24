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
  <section
    class="-mx-[var(--margin-mobile)] mt-35 mb-11 lg:-mx-[var(--margin-desktop)]"
    id="Projects"
  >
    <div class="">
      <h2
        class="text-secondary title-mobile-h4 lg:title-h3 mb-14 ml-[2.25rem] lg:ml-[3.5rem]"
      >
        Projects
      </h2>
    </div>
    <div class="relative">
      <div
        class="from-dark pointer-events-none absolute top-0 left-0 z-10 h-full w-6 bg-gradient-to-r to-transparent"
      />
      <div
        class="from-dark pointer-events-none absolute top-0 right-0 z-10 h-full w-6 bg-gradient-to-l to-transparent"
      />
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
              <span
                class="absolute top-1/2 left-4 z-30 -translate-y-1/2 font-black text-white lg:text-6xl"
              >
                ←
              </span>
            </template>
            <template #next>
              <span
                class="absolute top-1/2 right-4 z-30 -translate-y-1/2 font-black text-white lg:text-6xl"
              >
                →
              </span>
            </template>
          </CarouselNavigation>
        </template>
      </Carousel>
    </div>
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
