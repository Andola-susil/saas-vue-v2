

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router';
import AdminLayout from './layout/AdminLayout.vue';

export default {
  name: 'App',
  components: {
    AdminLayout,
  },
  setup() {
    const route = useRoute()
    const hideSidebar = computed(() => route.meta.hideSidebar)
    
    return {
      hideSidebar
    }
  }
}
</script>

<template>
   <div id="app">
    <div :class="['main', { 'no-sidebar': hideSidebar }]">
      <AdminLayout v-if="!hideSidebar" />
      <div :class="{ 'content': !hideSidebar, 'full-content': hideSidebar }">
        <router-view v-if="hideSidebar"/>
      </div>
    </div>
  </div>

</template>


<style scoped>

</style>

