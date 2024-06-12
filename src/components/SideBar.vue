<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 min-h-screen bg-gray-100 p-6">
      <header class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold text-gray-700">Dashboard</h1>
      </header>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';

export default {
  components: {
    Sidebar,
  },
};
</script>

<style scoped>
/* Scoped styles for DashboardLayout */
</style>
