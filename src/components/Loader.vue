<template>
  <div class="loader" v-if="loading">
    <div class="spinner">
      <img src="/src/assets/images/rolling.gif" alt="" style="height: 50px;width:50px">
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.spinner {
  width: 120px;
  height: 120px;
}
</style>
