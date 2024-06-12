<script setup>
import Sidebar from './layout/Sidebar.vue'
import './assets/styles/common.css';
import Breadcrumbs from '../src/components/Breadcrumbs.vue';

</script>

<template>
  <div id="app">
    <div class="main-container">
      <aside class="sidebar">
        <!-- Your sidebar content here -->
        <Sidebar />
        </aside>
        <main class="content">
          <div class="breadcrumb-div">
            <Breadcrumbs />
          </div>
          <router-view></router-view>
        </main>
    </div>
  </div>
</template>


<style scoped>
</style>
