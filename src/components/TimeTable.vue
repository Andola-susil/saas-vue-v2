<template>
  <div class="container mx-auto p-4">
    <div class="bg-blue-600 text-white p-4 rounded-lg">
      <h1 class="text-center text-2xl">Timesheet</h1>
    </div>
    <div class="bg-blue-800 text-white p-4 rounded-lg mt-4">
      <div class="grid grid-cols-10 gap-4 text-center">
        <div class="col-span-3">
          <h4>Project-Task</h4>
        </div>
        <div><h4>Mon</h4></div>
        <div><h4>Tue</h4></div>
        <div><h4>Wed</h4></div>
        <div><h4>Thu</h4></div>
        <div><h4>Fri</h4></div>
        <div><h4>Sat</h4></div>
        <div><h4>Sun</h4></div>
        <div><h4>Total</h4></div>
        <div>
          <span class="glyphicon glyphicon-wrench more-toolbar" aria-hidden="true"></span>
        </div>
      </div>
    </div>
    <div class="bg-white p-4 rounded-lg mt-4">
      <div v-for="(task, index) in tasks" :key="index" class="grid grid-cols-10 gap-4 text-center items-center mt-2">
        <div class="col-span-3">
          <button class="bg-gray-200 text-gray-700 p-2 rounded-lg w-full">Select Project and Task</button>
        </div>
        <div v-for="day in days" :key="day">
          <input type="text" class="form-input p-2 border border-gray-300 rounded-lg" placeholder="8.00" />
        </div>
        <div>
          <button class="bg-green-500 text-white p-2 rounded-lg w-full">40</button>
        </div>
        <div>
          <button class="bg-gray-200 text-gray-700 p-2 rounded-lg w-full">
            <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
    <div class="bg-white p-4 rounded-lg mt-4">
      <div class="grid grid-cols-12 gap-4 text-center items-center">
        <div class="col-span-1">
          <button class="bg-blue-500 text-white p-2 rounded-lg w-full">
            <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"> New</span>
          </button>
        </div>
        <div class="col-span-1">
          <button class="bg-blue-500 text-white p-2 rounded-lg w-full">
            <span class="glyphicon glyphicon-floppy-open" aria-hidden="true"> Save</span>
          </button>
        </div>
        <div class="col-span-1"></div>
        <div v-for="day in days" :key="day" class="col-span-1">
          <button class="bg-blue-500 text-white p-2 rounded-lg w-full">8.00</button>
        </div>
        <div class="col-span-1">
          <button class="bg-green-500 text-white p-2 rounded-lg w-full">40.00</button>
        </div>
        <div class="col-span-1">
          <button class="bg-red-500 text-white p-2 rounded-lg w-full">
            <span class="glyphicon glyphicon-trash" aria-hidden="true"> All</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [{}, {}],
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    };
  }
};
</script>

<style>

.more-toolbar {
  margin-top: 10px;
}

.more {
  margin-top: 3px;
}

.more:last-child {
  margin-bottom: 0px;
}

.more p {
  font-weight: 350;
}

.p {
  text-align: center;
}
</style>
