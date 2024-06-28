<template>
  <AuthLayout/>
    <ForgetPasswordForm/>
</template>

<script>
import ForgetPasswordForm from '../components/auth/ForgetPasswordForm.vue';
import AuthLayout from '../layout/AuthLayout.vue';

export default {
  components: {
    ForgetPasswordForm,
    AuthLayout,
  },
  name: 'forgetpassword',
  path: '/forget_password',
};
</script>

<style scoped>
/* Scoped styles for SignUp view */
</style>
