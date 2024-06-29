<template>
  <AuthLayout/>
  <ResetPasswordForm/>
</template>

<script>
import ResetPasswordForm from '../components/auth/ResetPasswordForm.vue';
import AuthLayout from '../layout/AuthLayout.vue';

export default {
  components: {
    ResetPasswordForm,
    AuthLayout,
  },
  name: 'resetpassword',
  path: '/resetpassword',
  methods: {
    
  },
  mounted() {
    // Access query parameter 'token' from the URL
    const token = this.$route.query.token;

    // Store the token in local storage
    if (token) {
      localStorage.setItem('reset_token', token);
    }

    // Remove the token from the URL
    const urlWithoutToken = window.location.origin + window.location.pathname;
    history.replaceState({}, document.title, urlWithoutToken);

  }
};
</script>

<style scoped>
/* Scoped styles for SignUp view */
</style>
