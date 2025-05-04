<script setup lang="ts">
const props = defineProps(["image"]);
</script>

<template>
  <section class="rounded-2xl border border-white">
    <div>
      <picture>
        <img :src="props.image" alt="" class="rounded-2xl" />
      </picture>
    </div>
    <div>
      <h1 class="text-white">hello</h1>
    </div>
  </section>
</template>
