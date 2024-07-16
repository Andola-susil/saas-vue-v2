<template>
    <FullCalendar :options="calendarOptions" />
  </template>
  
  <script>
  import { defineComponent, ref ,onMounted } from 'vue';
  import FullCalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import listPlugin from '@fullcalendar/list';
  import interactionPlugin from '@fullcalendar/interaction';
  import { getHolidayList } from '../../utils/setting.js' ;



  export default defineComponent({
    components: {
      FullCalendar,
    },
   setup() {
    const calendarOptions = ref({
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      events: [], // Initialize with an empty array
    });

    const fetchEvents = async () => {
      try {
        const data = await getHolidayList();
        const events = data.items.map(item => ({
          id: item.id,
          title: item.description,
          start: item.holiday,
          allDay: true,
        }));
        calendarOptions.value.events = events;
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    onMounted(() => {
      fetchEvents();
    });

    return { calendarOptions };
  },
});
</script>


<style>
.fc-today-button.fc-button.fc-button-primary{
    background-color: #4F46E5;
}
.fc-next-button.fc-button.fc-button-primary{
    background-color: #4F46E5;
}
.fc-prev-button.fc-button.fc-button-primary{
    background-color: #4F46E5;
}
.fc-prev-button.fc-button.fc-button-primary:focus{
    background-color: #4F46E5;
}
.fc-next-button.fc-button.fc-button-primary:focus{
    background-color: #4F46E5;
}
.fc-col-header-cell-cushion{
    font-weight: 500;
}
</style>  