import { defineStore } from 'pinia';

export const timeSheetInfo = defineStore('main', {
  state: () => ({
    count: 0,
    current_page: '',
    name: 'Pinia Store',
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    updateCurrentPage(page){
        this.current_page = page;
    },
  },
});
