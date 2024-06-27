<script>
  import {TabulatorFull as Tabulator} from 'tabulator-tables'; //import Tabulator library
  import { PlusIcon,BarsArrowUpIcon, UsersIcon } from '@heroicons/vue/20/solid'
  import Loader from '../components/Loader.vue';
  import { useRoute } from 'vue-router';
  import ModalPopup from '../components/common/ModalPopup.vue';
  import { toast } from 'vue3-toastify';
  import { submitTimeSheet,getTimeSheet,getWeekTimeSheetForWeek,reviewTimeSheet } from '../utils/timelog.js';
  import { getResourceInfoById } from '../utils/resource.js';
  import axios from 'axios';
  import moment from 'moment';
  import WeekFilter from '../components/common/WeekFilter.vue';
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import UserInfo from '../components/common/UserInfo.vue';
  import DateRangePicker from 'vue2-daterange-picker'
  export default {
    data() {
      return {
        tabulator: null, //variable to hold your table
        id_count : 1,
        table_columns: [],
        tableData: [
            { 
              id: 1,
              project_name: "",
              project_id: 0,
              task_name: "",
              task_id: 0,
              date_logged: "2024-06-25",
              monday: 0.0,
              tuesday: 0.0,
              wednesday: 0.0,
              thursday: 0.0,
              friday: 0.0,
              saturday: 0.0,
              sunday: 0.0,
              total: 0.0 ,
              rejection_reason:"",
            }
          ],//data for table to display
        isLoading:false,
        json_output:null,
        showPopup : false,
        modalContent: {
          title : '',
          description: '',
          confirmLabel: '',
          cancelLabel: '',
          showInputField: false,
        },
        timeSheetId : null,
        isModalOpen :false,
        currentWeekNumber: null,
        weekStartDate: null,
        weekEndDate: null,
        resource_id : null,
      }
    },
    props: {
      id: {
        type: String,
        default: null,
      },
    },
    components: {
        Loader,
        ModalPopup,
        WeekFilter,
        Datepicker,
        UserInfo,
        DateRangePicker
    },
    methods: {
      cellEditedCallback(cell) {
        let row = cell.getRow();
        let data = row.getData();
        let total = this.totalHrscustomMutator(null, data);
        row.update({ total: total });
      },
      totalHrscustomMutator(value, data, type, params, component) {
        return parseFloat(data.monday) + parseFloat(data.tuesday) + parseFloat(data.wednesday) + parseFloat(data.thursday) + parseFloat(data.friday) + parseFloat(data.saturday) + parseFloat(data.sunday);
      },
      deleteIcon(cell, formatterParams, onRendered) {
        return '<img src="/src/assets/images/trash-can.svg" alt="" class="h-5 w-5">';
      },
      approvalActions(cell, formatterParams, onRendered){
        return '<div class="flex"><div class="px-1"><img src="/src/assets/images/circle-check-blank.svg" alt="" class="h-6 w-6 " data-action="approve"></div><div class="px-1"><img src="/src/assets/images/circle-x.svg" alt="" class="h-6 w-6" data-action="reject"></div></div>';
      },
      addRowToTable() {
        this.id_count ++;
        this.tabulator.addRow({ id:this.id_count,project_id: 0,project_name: "", task_id: 0, task_name: "", monday: 0.0, tuesday: 0.0, wednesday: 0.0, thursday: 0.0, friday: 0.0, saturday: 0.0, sunday: 0.0, total: 0.0 , action:""})
          .then((row) => {
            // row - the row component for the row updated or added
            // run code after data has been updated
            // console.log("Row added:", row);
          })
          .catch((error) => {
            // handle error updating data
            // console.error("Error adding row:", error);
          });
      },
      dateEditor(cell, onRendered, success, cancel) {
        // Create and style input
        var cellValue = DateTime.fromFormat(cell.getValue(), "dd/MM/yyyy").toFormat("yyyy-MM-dd");
        var input = document.createElement("input");

        input.setAttribute("type", "date");
        input.style.padding = "4px";
        input.style.width = "100%";
        input.style.boxSizing = "border-box";
        input.value = cellValue;

        onRendered(function () {
          input.focus();
          input.style.height = "100%";
        });

        function onChange() {
          if (input.value !== cellValue) {
            success(DateTime.fromFormat(input.value, "yyyy-MM-dd").toFormat("dd/MM/yyyy"));
          } else {
            cancel();
          }
        }

        // Submit new value on blur or change
        input.addEventListener("blur", onChange);

        return input;
      },
      removeBottomRow(e,cell) {
        const row = cell.getRow();
        row.delete();
      },
      submitTimesheet() {
        this.isLoading = true;
        const allData = this.tabulator.getData();
        const logEntry = this.generateLogEntry(allData);
        const response = submitTimeSheet(logEntry)
        .then(data => {
          this.tableData = data.lineitems;
          
          this.updateTable();
        
          this.isLoading = false;

          toast("Timesheet submitted successfully!", {
            "theme": "colored",
            "type": "success",
            "hideProgressBar": true,
            "dangerouslyHTMLString": true
          });
        })
        .catch(error => {
          console.error('Error fetching timesheet details:', error);
        });
      
      },
      generateLogEntry(allData) {
        const tenant_id = localStorage.getItem('tenant_id');
          return {
            resource_id: 303,
            approver_id: 505,
            week_number: 27,
            // start_date: this.weekStartDate,
            // end_date: this.weekEndDate,
            start_date: '2024-07-01',
            end_date: '2024-07-07',
            tenant_id: tenant_id,
            status: "pending",
            rejection_reason: "",
            lineitems: allData,
          };
        },
      reviewTimeSheet(e, cell) {
        const actionType = e.target.dataset.action; // Get the data-action attribute of the clicked element
        const row = cell.getRow();
        const rowID = row.getIndex();
        const imageElements = cell.getElement().querySelectorAll('img');
        if (actionType === "approve") {
            // Find the image element for approve button and update src attribute
            imageElements.forEach(img => {
                if (img.dataset.action === "approve") {
                    img.src = "/src/assets/images/circle-check.svg";
                }else{
                  img.src = "/src/assets/images/circle-x.svg";
                }
            });
            // row.update();
        } else if (actionType === "reject") {
            // Handle reject action
            imageElements.forEach(img => {
                if (img.dataset.action === "reject") {
                    img.src = "/src/assets/images/circle-xmark.svg";
                }else{
                  img.src = "/src/assets/images/circle-check-blank.svg";
                }
            });
            // this.modalContent = {
            //   title: 'Are you sure? You want to reject this time line.',
            //   description: '',
            //   confirmLabel: 'Yes',
            //   cancelLabel: 'No'
            // }
            
        } else {
            // Handle unexpected click (if needed)
        }
        
      },
      approveTimeSheet(){
        this.tabulator.getRows().forEach(row => {
          const cell = row.getCell("action");
          const cellElement = cell.getElement();

          // Find all img elements within the action cell
          const imgElements = cellElement.querySelectorAll("img");

            imgElements.forEach(img => {
              const actionType = img.dataset.action;
              if (actionType === "approve") {
                img.src = "/src/assets/images/circle-check.svg";
              } else if (actionType === "reject") {
                img.src = "/src/assets/images/circle-x.svg";
              }
            });
        });
        this.modalContent.title="Are you sure? You want to approve this timeSheet.";
        this.modalContent.description="";
        this.modalContent.confirmLabel="Yes";
        this.modalContent.cancelLabel="No";
        this.modalContent.showInputField = false;
        this.showPopup = true;
        this.openPopup();
      },
      rejectTimeSheet(){
        this.tabulator.getRows().forEach(row => {
          const cell = row.getCell("action");
          const cellElement = cell.getElement();

          // Find all img elements within the action cell
          const imgElements = cellElement.querySelectorAll("img");

            imgElements.forEach(img => {
              const actionType = img.dataset.action;
              if (actionType === "approve") {
                img.src = "/src/assets/images/circle-check-blank.svg";
              } else if (actionType === "reject") {
                img.src = "/src/assets/images/circle-xmark.svg";
              }
            });
        });
        this.modalContent.title="Enter the timesheet rejection reason";
        this.modalContent.description="";
        this.modalContent.confirmLabel="Submit";
        this.modalContent.cancelLabel="Cancel";
        this.modalContent.showInputField = true;
        this.showPopup = true;
        this.openPopup();
      },
      openPopup(){
        this.isModalOpen = true;
      },
      handleClosePopup(){
        this.isModalOpen = false;
      },
      handleConfirmation(inputValue){
        // console.log(inputValue); return false;
        if(inputValue != ''){
          var timesheet_status = 'reject';
        }else{
          var timesheet_status = 'approve';
        }
        this.isLoading = true;
        const res = reviewTimeSheet(this.timeSheetId,timesheet_status,inputValue).then((data) => {
          this.isLoading = false;
          toast("Timesheet reviewed successfully!", {
            "theme": "colored",
            "type": "success",
            "hideProgressBar": true,
            "dangerouslyHTMLString": true
          })
          // this.updateTable();
        })
        .catch((error) => {

        });
        
        this.isModalOpen = false;
      },
      getTimeLogData(id){
        const log_data = getTimeSheet(id)
        .then((data) => {
          this.tableData = data.lineitems;
          this.updateTable();
        })
        .catch((error) => {

        });
      },
      getTimeSheetId(){
        const res = getWeekTimeSheetForWeek(this.currentWeekNumber)
        .then((data) => {
          const time_sheet_id = data.items[0].id;
          this.resource_id = data.items[0].resource_id;
          this.getUserInfo(data.items[0].resource_id);
          if(this.timeSheetId){
            this.getTimeLogData(this.timeSheetId);
          }else{
            this.getTimeLogData(time_sheet_id);
          }
        })
        .catch((error) => {
        });
        
      },
      getUserInfo(resource_id){
        console.log(resource_id);
        const res = getResourceInfoById(resource_id)
        .then((data) => {
          
        })
        .catch((error) => {
        });
      },
      getWeekInfo(dateString) {
        const date = moment(dateString);
        const startOfWeek = date.startOf('isoWeek').isoWeekday(1).format('YYYY-MM-DD');
        const endOfWeek = moment(startOfWeek).endOf('isoWeek').format('YYYY-MM-DD');
        const weekNumber = moment(startOfWeek).isoWeek();

        return {
          weekNumber,
          startOfWeek,
          endOfWeek
        };
       
      },
      updateTable(){
        this.tabulator = new Tabulator(this.$refs.table, {
          data: this.tableData, //link data to table
          height:"100%",
          width:"100%",
          layout:"fitDataTable",
          reactiveData:true, //turn on data reactivity
          columnCalcs:"true",
          validationMode:"blocking",
          columns: this.table_columns, //Set columns
        });
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
      }
    
    },
    mounted() {
      const currentDate = new Date();
      const { weekNumber, weekStartDate, weekEndDate } = this.getWeekInfo(currentDate);
      // console.log(weekStartDate);
      // this.currentWeekNumber = this.getWeekNumber(currentDate);
      this.isLoading = true;
      //instantiate Tabulator when element is mounted
      const today = new Date(); 
      const startOfWeek = new Date(today); 
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6);
      // const endOfWeek = new Date(today);
      // console.log(startOfWeek);
      this.weekStartDate = this.formatDate(startOfWeek);
      this.weekEndDate = this.formatDate(endOfWeek);
      
      startOfWeek.setDate(today.getDate() - today.getDay());
      endOfWeek.setDate(today.getDate() - today.getDay() + 6);
      const columns = [
          {title:"Id", field:"id", visible:false, htmlOutput:true},
          {title:"Project", field:"project_name", width:'16%', editor:"input", headerSort:false},
          {title:"Task", field:"task_name", width:'15%', editor:"input", headerSort:false},
          {title:`MON<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })})`, field:"monday", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["number","required", "min:0","max:9"], formatter: function(cell) {return cell.getValue().toFixed(2);}},
          {title:`TUE<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })})`, field:"tuesday", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["number","required", "min:0","max:9"], formatter: function(cell) {return cell.getValue().toFixed(2);}},
          {title:`WED<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })})`, field:"wednesday", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["number","required", "min:0","max:9"], formatter: function(cell) {return cell.getValue().toFixed(2);}},
          {title:`THU<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })})`, field:"thursday", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["number","required", "min:0","max:9"], formatter: function(cell) {return cell.getValue().toFixed(2);}},
          {title:`FRI<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })})`, field:"friday", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["number","required", "min:0","max:9"], formatter: function(cell) {return cell.getValue().toFixed(2);}},
          {title:`SAT<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })})`, field:"saturday", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["number","required", "min:0","max:9"], formatter: function(cell) {return cell.getValue().toFixed(2);}},
          {title:`SUN<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })})`, field:"sunday", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["required", "min:0","max:9"]},
          {title:"Total", field:"total", hozAlign:"center", width:'8%', headerSort:false, bottomCalc:"sum", bottomCalcParams:{precision:2}, mutator: this.totalHrscustomMutator, formatter: this.totalHoursFormatter },
          
      ];

      const route = useRoute();
      if(route.query.id){
        this.timeSheetId = route.query.id;
        columns.push({title:"Action", field:"action", hozAlign:"center", formatter:this.approvalActions, width:'10%', headerSort:false, cellClick:this.reviewTimeSheet,resizable: false});
      }else{
        columns.push({title:"", field:"action", hozAlign:"center", formatter:this.deleteIcon, width:'5%', headerSort:false, cellClick:this.removeBottomRow,resizable: false});
      }
      this.tabulator = new Tabulator(this.$refs.table, {
        data: this.tableData, //link data to table
        height:"100%",
        width:"100%",
        layout:"fitDataTable",
        reactiveData:true, //turn on data reactivity
        columnCalcs:"true",
        validationMode:"blocking",
        columns: columns, //Set columns
      });
      this.table_columns = columns;
      this.isLoading = false;
      this.getTimeSheetId();
    },
    computed: {
      
    }
  }
</script>
  <template>
    <div>
      
      <div class="sm:flex-auto py-4">
        <h1 class="text-base font-semibold leading-6 text-gray-900">TimeSheet</h1>
      </div>
      <UserInfo 
        name="Tom Cook"
        id="56756"
        role="Software Developer" 
      />
      <nav class="flex float-right">
        <div class="hidden py-2 md:flex md:items-center">
          <Menu as="div" class="relative" v-if="timeSheetId != null">
            <button @click="approveTimeSheet()" type="button" class="inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Approve TimeSheet
            </button>
          </Menu>
          <Menu as="div" class="relative pl-3.5" v-if="timeSheetId != null">
            <button @click="rejectTimeSheet()" type="button" class="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Reject TimeSheet
            </button>
          </Menu>
          <Menu as="div" class="relative">
            <WeekFilter />
          </Menu>
          
        </div>
      </nav>
      <div class="w-full" ref="table"></div>
      <Loader :loading="isLoading" />
      <!-- <div class="flex float-right" v-if="timeSheetId == null"> -->
        <div class="flex float-right" v-if="timeSheetId == null">
          <div class="pl-4 pr-3">
            <div>
              <button type="button" class="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" @click="submitTimesheet">Submit</button>
            </div>
          </div>
          <div class="">
            <div class="pl-4 pr-3">
              <button type="button" class="rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="addRowToTable">
                <img src="/src/assets/images/plus.svg" alt="" class="h-5 w-5">
              </button>
            </div>
          </div>
        </div>
      <div ref="json">
        <!-- <pre>{{json_output}}</pre> -->
      </div>
      <div v-if="showPopup">
        <ModalPopup  
          :open="isModalOpen"
          :title="modalContent.title"
          :description="modalContent.description"
          :confirmLabel="modalContent.confirmLabel"
          :cancelLabel="modalContent.cancelLabel"
          :showInputField="modalContent.showInputField"
          @closePopup="handleClosePopup"
          @confirmPopup="handleConfirmation"
        />
      </div>
    </div>
  </template>
  <style scoped>
    
  </style>