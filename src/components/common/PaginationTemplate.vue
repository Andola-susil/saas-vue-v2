<template>
  <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <a
        href="#"
        @click.prevent="prevPage"
        :class="['relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50', { 'cursor-not-allowed opacity-50': currentPage === 1 }]"
      >
        Previous
      </a>
      <a
        href="#"
        @click.prevent="nextPage"
        :class="['relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50', { 'cursor-not-allowed opacity-50': currentPage === totalPages }]"
      >
        Next
      </a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          {{ ' ' }}
          <span class="font-medium">{{ startItem }}</span>
          {{ ' ' }}
          to
          {{ ' ' }}
          <span class="font-medium">{{ endItem }}</span>
          {{ ' ' }}
          of
          {{ ' ' }}
          <span class="font-medium">{{ totalItems }}</span>
          {{ ' ' }}
          results
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <a
            href="#"
            @click.prevent="prevPage"
            :class="['relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0', { 'cursor-not-allowed opacity-50': currentPage === 1 }]"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </a>
          <span v-if="pages.length > 0"><a
            v-for="page in pages"
            :key="page"
            href="#"
            @click.prevent="goToPage(page)"
            :class="['relative inline-flex items-center px-4 py-2 text-sm font-semibold', page === currentPage ? 'bg-indigo-600 text-white z-10' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50', { 'focus:z-20 focus:outline-offset-0': true }]"
          >
            {{ page }}
          </a></span>
          <span class="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-not-allowed opacity-50" v-else>0</span>
          <a
            href="#"
            @click.prevent="nextPage"
            :class="['relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0', { 'cursor-not-allowed opacity-50': currentPage === totalPages }]"
          >
            <span class="sr-only">Next</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
export default {
  name: 'PaginationComponent',
  components: {
    ChevronLeftIcon,
    ChevronRightIcon
  },
  props: {
    paginationData: Object,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
    }
  },
  computed: {
    totalItems() {
      return this.paginationData.total_items;
    },
    totalPages() {
      this.itemsPerPage = this.paginationData.items_per_page;
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    startItem() {
      this.currentPage = this.paginationData.current_page;
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    endItem() {
      return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    },
    pages() {
      const pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.emitPageChange();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.emitPageChange();
      }
    },
    goToPage(page) {
      this.currentPage = page;
      this.emitPageChange();
    },
    emitPageChange() {
      this.$emit('page-changed', this.currentPage);
    }
  }
}
</script>
