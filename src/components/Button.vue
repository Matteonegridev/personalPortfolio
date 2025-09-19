<script setup lang="ts">
import { clsx } from "clsx";

type ButtonProps = {
  label: string;
  className?: string;
  variant?: "primary" | "secondary";
};

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  className: "",
});

const variantClasses = {
  primary: "bg-primary text-white body-font-desktop font-bold",
  secondary: "border border-white text-white body-font-desktop font-bold",
};
</script>

<template>
  <button
    :class="clsx('px-6 py-4', variantClasses[props.variant], props.className)"
  >
    {{ label }}
    <slot />
  </button>
</template>
