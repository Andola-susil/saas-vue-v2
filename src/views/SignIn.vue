<template>
  <AuthLayout />
    <SignInForm />
</template>

<script>
import SignInForm from '../components/auth/SignInForm.vue';
import AuthLayout from '../layout/AuthLayout.vue';

export default {
  components: {
    SignInForm,
    AuthLayout,
  },
  name: 'signin',
  path: '/signin',
  meta: {
    name: 'signin',
    layout: 'Auth',
  },
};
</script>

<style scoped>
/* Scoped styles for SignUp view */
</style>
