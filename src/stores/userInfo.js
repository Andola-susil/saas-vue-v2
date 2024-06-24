// stores/user.js
import { defineStore, acceptHMRUpdate } from 'pinia';

/**
 * Simulate a login
 */
function apiLogin(a, p) {
  if (a === 'ed' && p === 'ed') return Promise.resolve({ isAdmin: true });
  if (p === 'ed') return Promise.resolve({ isAdmin: false });
  return Promise.reject(new Error('invalid credentials'));
}

export const useUserStore = defineStore('user', {
  state: () => ({
    'accessToken': '',
    'layout': '',
    'is_admin': false,
    'is_approver': false,
    'is_resource': false,
  }),

  actions: {
    logout() {
      this.$patch({
        name: '',
        isAdmin: false,
      });
    },

    /**
     * Attempt to login a user
     */
    async login(user, password) {
        console.log('Here35');
      try {
        const userData = await apiLogin(user, password);
        this.$patch({
          name: user,
          ...userData,
        });
      } catch (error) {
        throw new Error('Invalid credentials');
      }
    },

    /**
     * Set user data
     */
    setUser(data) {
      this.state.accessToken = data[0].accessToken;
      this.state.layout = data[0].layout;
      this.state.is_admin = data[0].is_admin;
      this.state.is_approver = data[0].is_approver;
      this.state.is_resource = data[0].is_resource;
      console.log(this.state, 'gfgfdf');
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
