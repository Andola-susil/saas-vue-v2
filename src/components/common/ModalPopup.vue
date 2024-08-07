<template>
  <TransitionRoot as="template" :show="modalProps.open">
    <Dialog class="relative z-10" @close="closePopup">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div>
                <div v-if="iconUrl != '' && colorCode != ''" class="mx-auto flex h-12 w-12 items-center justify-center rounded-full" :class="colorCode">
                  <!-- <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" /> -->
                  <img :src="iconUrl" alt="" class="h-6 w-6">
                </div>
                <div v-else class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <!-- <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" /> -->
                  <img src="/src/assets/images/circle-info.svg" alt="" class="h-6 w-6">
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">{{ modalProps.title }}</DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">{{ modalProps.description }}</p>
                  </div>
                </div>
              </div>
              <div class="mt-5">
                <!-- Conditionally render input field -->
                <div v-if="modalProps.showInputField" class="mt-2">
                  <input type="text" v-model="inputValue" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6" placeholder="write..." />
                  <!-- <input type="text" v-model="inputValue" class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter something..." /> -->
                </div>
                <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3 px-12">
                  <button type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2" :class="modalProps.showInputField && inputValue == '' ? 'cursor-not-allowed' : ''" @click="confirmClosePopup">{{ modalProps.confirmLabel }}</button>
                  <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0" @click="closePopup" ref="cancelButtonRef">{{ modalProps.cancelLabel }}</button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'

const modalProps = defineProps({
  title: String,
  description: String,
  confirmLabel: {
    type: String,
    default: 'Confirm'
  },
  cancelLabel: {
    type: String,
    default: 'Cancel'
  },
  open: {
    type: Boolean,
    default: false,
  },
  showInputField: {
    type: Boolean,
    default: false,
  },
  iconUrl: {
    type: String,
    default: ''
  },
  colorCode: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['openPopup', 'closePopup', 'confirmPopup'])

const inputValue = ref(null)  // Reactive state to store input value

const closePopup = () => {
  inputValue.value = null;
  emit('closePopup')
}

const confirmClosePopup = () => {
  emit('confirmPopup', inputValue.value)
}
</script>
