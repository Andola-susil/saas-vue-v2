<template>
  <AuthLayout>
    <SignUpForm />
  </AuthLayout>
</template>

<script>
import SignUpForm from '../components/auth/SignUpForm.vue';
import AuthLayout from '../layout/AuthLayout.vue';

export default {
  components: {
    SignUpForm,
    AuthLayout,
  },
};
</script>

<style scoped>
/* Scoped styles for SignUp view */
</style>
