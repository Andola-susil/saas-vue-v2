<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
};
</script>

<style scoped>
/* Scoped styles for AuthLayout component */
</style>
