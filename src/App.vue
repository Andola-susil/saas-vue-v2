<script setup>
// import AdminLayout from './layout/AdminLayout.vue';
// import AuthLayout from './layout/AuthLayout.vue';
import { useRoute } from 'vue-router';
// import { onMounted } from 'vue';

const route = useRoute();
// Accessing meta information
const layout = route.meta.layout;
const name = route.meta.name;

</script>

<template>
<!-- <AdminLayout /> -->
<router-view></router-view>
</template>

<style scoped>

</style>

