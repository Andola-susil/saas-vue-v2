<template>
  <div class="bg-white">
    <div class="flex space-x-3">
      <div class="flex-shrink-0">
        <button type="button" class="rounded-full bg-indigo-400 p-1.5 text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 w-full h-4/5 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
          {{ initials }}
        </button>
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-sm font-semibold text-gray-900">
          <a href="#" class="">{{ name }}({{ id }})</a>
        </p>
        <p class="text-sm text-gray-500">
          <a href="#" class="">{{ role }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

const initials = computed(() => {
  if (!props.name) return '';
  const words = props.name.split(' ');
  const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
  return initials;
});
</script>
