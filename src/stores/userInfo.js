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
    name: '',
    isAdmin: false,
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
      this.$patch(data);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
