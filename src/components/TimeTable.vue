<script>
  import {TabulatorFull as Tabulator} from 'tabulator-tables'; //import Tabulator library
  import { PlusIcon,BarsArrowUpIcon, UsersIcon } from '@heroicons/vue/20/solid'
  import Loader from '../components/Loader.vue';
  import { useRoute } from 'vue-router';
  import ModalPopup from '../components/common/ModalPopup.vue';
  import { toast } from 'vue3-toastify';
  import { submitTimeSheet,getTimeSheet,getWeekTimeSheetForWeek,reviewTimeSheet,reviewTimeSheetLineItems,UpdateTimeSheet } from '../utils/timelog.js';
  import { getResourceInfoById } from '../utils/resource.js';
  import axios from 'axios';
  import moment from 'moment';
  import WeekFilter from '../components/common/WeekFilter.vue';
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import UserInfo from '../components/common/UserInfo.vue';
  import DateRangePicker from 'vue2-daterange-picker'
  import { getProjectList,createProject } from '../utils/project.js';
  import { geTaskList ,createTask} from '../utils/task.js';
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { timeSheetInfo } from '../stores/timeSheetInfo.js';

  export default {
    data() {
      return {
        tabulator: null, //variable to hold your table
        id_count : 1,
        table_columns: [],
        tableData: [
            { 
              id: 1,
              project_id: null,
              project_name: "",
              task_name: "",
              task_id: null,
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
              status: "",
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
        startDateOfWeek: null,
        columns: [],
        week_number : null,
        start_of_week : null,
        end_of_week: null,
        show_submit_btn: true,
        display_approve_btns: false,
        disable_table: false,
        project_list :[],
        task_list: [],
        showCreateProjectPopup: false,
        project_id: 0,
        showCreateTaskPopup: false,
        current_timesheet_id: null,
        time_sheet_status: '',
        showTimeSheetSubmitConfirmation: false,
        show_approval_btns: false,
        disable_date_range: false,
        state_info: {},
        isEditable: false,
        user_name: '',
        resource_id: '',
        user_role: '',
        state : [],
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
        DateRangePicker,
    },
    methods: {
      cellEditedCallback(cell) {
        console.log(cell);
        let row = cell.getRow();
        let data = row.getData();
        let column = this.tabulator.getColumn('monday');
        // let cells = column.getCells();
        console.log(column,data);
        let total = parseFloat(this.totalHrscustomMutator(null, data));
        console.log(total); return false;
        row.update({ total: total });
        if(this.current_timesheet_id == null){
          this.submitTimesheet();
        }else{
          this.updateTimesheet(this.time_sheet_status);
        }
        
      },
      totalHrscustomMutator(value, data, type, params, component) {
        let totalHours = parseFloat(data.monday || 0) +
                 parseFloat(data.tuesday || 0) +
                 parseFloat(data.wednesday || 0) +
                 parseFloat(data.thursday || 0) +
                 parseFloat(data.friday || 0) +
                 parseFloat(data.saturday || 0) +
                 parseFloat(data.sunday || 0);
        return Math.round(totalHours * 100) / 100;
      },
      deleteIcon(cell, formatterParams, onRendered) {
        return `<img src="/src/assets/images/trash-can-gray.svg" 
               alt="" 
               class="h-5 w-5" 
               onmouseover="this.src='/src/assets/images/trash-can.svg'" 
               onmouseout="this.src='/src/assets/images/trash-can-gray.svg'">`;
      },
      approvalActions(cell, formatterParams, onRendered){
        if(this.time_sheet_status == 'approved'){
          return '<div class="flex"><div class="px-1"><img src="/src/assets/images/circle-check-fill.svg" alt="" class="h-6 w-6 " data-action="approve"></div><div class="px-1"><img src="/src/assets/images/circle-x.svg" alt="" class="h-6 w-6" data-action="reject"></div></div>';
        }else if(this.time_sheet_status == 'rejected'){
          return '<div class="flex"><div class="px-1"><img src="/src/assets/images/circle-check-blank.svg" alt="" class="h-6 w-6 " data-action="approve"></div><div class="px-1"><img src="/src/assets/images/circle-xmark.svg" alt="" class="h-6 w-6" data-action="reject"></div></div>';
        }else{
          return '<div class="flex"><div class="px-1"><img src="/src/assets/images/circle-check-blank.svg" alt="" class="h-6 w-6 " data-action="approve"></div><div class="px-1"><img src="/src/assets/images/circle-x.svg" alt="" class="h-6 w-6" data-action="reject"></div></div>';
        }
      },
      addRowToTable() {
        this.id_count ++;
        this.tabulator.addRow({ id:this.id_count,project_id: null,project_name: "", task_id: null, task_name: "", monday: 0.0, tuesday: 0.0, wednesday: 0.0, thursday: 0.0, friday: 0.0, saturday: 0.0, sunday: 0.0, total: 0.0 , action:""})
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
        // this.isLoading = true;
        const allData = this.tabulator.getData();
        const logEntry = this.generateLogEntry(allData,'draft');
        const response = submitTimeSheet(logEntry)
        .then(data => {
          this.tableData = data.lineitems;
          this.getTimeSheetId();
          this.updateTable();
          
          // this.isLoading = false;

          // toast("Timesheet submitted successfully!", {
          //   "theme": "colored",
          //   "type": "success",
          //   "hideProgressBar": true,
          //   "dangerouslyHTMLString": true
          // });
        })
        .catch(error => {
          console.error('Error fetching timesheet details:', error);
        });
      
      },
      showConfirmationPopup(){
        this.modalContent.title="Are you sure? You want to submit this timeSheet.";
        this.modalContent.description="";
        this.modalContent.confirmLabel="Yes";
        this.modalContent.cancelLabel="No";
        this.modalContent.showInputField = false;
        this.showTimeSheetSubmitConfirmation = true;
        this.openPopup();
      },
      updateTimesheet(status = null){
        if(status != 'draft'){
          // this.isLoading = true;
        }
        const allData = this.tabulator.getData();
        const logEntry = this.generateLogEntry(allData,status);
        const response = UpdateTimeSheet(this.current_timesheet_id,logEntry)
        .then(data => {
          this.tableData = data.lineitems;
          this.getTimeSheetId();
          if(status != 'draft'){
            this.isModalOpen = false;
            this.isLoading = false;
            this.showTimeSheetSubmitConfirmation = false;
            toast("Timesheet submitted successfully!", {
              "theme": "colored",
              "type": "success",
              "hideProgressBar": true,
              "dangerouslyHTMLString": true
            });
          }
        })
        .catch(error => {
          console.error('Error fetching timesheet details:', error);
        });
      },
      getSecondsToHour(seconds){
        var secondsPerMinute = 60;
        var minutesPerHour = 60;
        var hours = seconds / (secondsPerMinute * minutesPerHour);
        return hours;
      },
      getHoursInSec(hours){
        var minutesPerHour = 60;
        var secondsPerMinute = 60;
        var seconds = hours * minutesPerHour * secondsPerMinute;
        return seconds;
      },
      generateLogEntry(allData, status) {
        const lineItems = [];
        allData.forEach(data => {
          const lineitem = {
            action: undefined,
            date_logged: "2024-06-12",
            friday: this.getHoursInSec(data.friday),
            id: data.id,
            monday:this.getHoursInSec(data.monday),
            project_id: data.project_id,
            project_name: data.project_name,
            rejection_reason: data.rejection_reason,
            saturday: this.getHoursInSec(data.saturday),
            status: data.status,
            sunday: this.getHoursInSec(data.sunday),
            task_id: data.task_id,
            task_name: data.task_name,
            thursday: this.getHoursInSec(data.thursday),
            total: this.getHoursInSec(data.total),
            tuesday: this.getHoursInSec(data.tuesday),
            wednesday: this.getHoursInSec(data.wednesday)
          };
          lineItems.push(lineitem);
        });
        const tenant_id = localStorage.getItem('tenant_id');
          return {
            resource_id: 303,
            approver_id: 505,
            week_number: this.week_number,
            start_date: this.start_of_week,
            end_date: this.end_of_week,
            tenant_id: tenant_id,
            status: status,
            // rejection_reason: "",
            lineitems: lineItems,
          };
      },
      reviewTimeSheet(e, cell) {
        const actionType = e.target.dataset.action; // Get the data-action attribute of the clicked element
        const row = cell.getRow();
        const rowID = row.getIndex();
        const rowData = row.getData();
        const imageElements = cell.getElement().querySelectorAll('img');
        if (actionType === "approve") {
            // Find the image element for approve button and update src attribute
            imageElements.forEach(img => {
                if (img.dataset.action === "approve") {
                    img.src = "/src/assets/images/circle-check-fill.svg";
                }else{
                  img.src = "/src/assets/images/circle-x.svg";
                }
            });
            rowData.status = "approved";
            this.reviewLineItems(rowData);
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
          rowData.status = "rejected";
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
                img.src = "/src/assets/images/circle-check-fill.svg";
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
        if(inputValue != null){
          var timesheet_status = 'rejected';
        }else{
          var timesheet_status = 'approved';
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
          if(data.lineitems.length > 0){
            this.tableData = [];
            // this.tableData = data.lineitems;
            this.time_sheet_status = data.status;
            data.lineitems.forEach(obj => {
              this.tableData.push(
                {
                  id:obj.id, 
                  project_id: obj.project_id,
                  project_name: obj.project_name,
                  task_name:obj.task_name, 
                  task_id: obj.task_id,
                  date_logged: obj.date_logged,
                  monday:this.getSecondsToHour(obj.monday), 
                  tuesday: this.getSecondsToHour(obj.tuesday),
                  wednesday: this.getSecondsToHour(obj.wednesday),
                  thursday: this.getSecondsToHour(obj.thursday), 
                  friday: this.getSecondsToHour(obj.friday),
                  saturday: this.getSecondsToHour(obj.saturday),
                  sunday: this.getSecondsToHour(obj.sunday), 
                  rejection_reason: obj.rejection_reason,
                  status: obj.status,
                  total: this.getSecondsToHour(obj.total),
                });
            });
          }else{
            this.time_sheet_status = '';
          }
          this.updateTable();
          this.isLoading = false;
          
        })
        .catch((error) => {

        });
      },
      getTimeSheetId(){
        this.isLoading = true;
        if(this.timeSheetId){
          this.getTimeLogData(this.timeSheetId);
        }else{
          const res = getWeekTimeSheetForWeek(this.week_number)
          .then((data) => {
            if(data.items.length > 0){
              const time_sheet_id = data.items[0].id;
              this.current_timesheet_id = time_sheet_id;
              this.resource_id = data.items[0].resource_id;
              this.getUserInfo(data.items[0].resource_id);
              this.getTimeLogData(time_sheet_id);
              this.time_sheet_status = data.status;
              this.show_submit_btn = false;
              this.disable_table = true;
            }else{
              this.tableData = [
                { 
                  id: 1,
                  project_id: "",
                  project_name: "",
                  task_name: "",
                  task_id: "",
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
                  status: "",
                }
              ];
              this.current_timesheet_id = null;
              this.disable_table = false;
              this.show_submit_btn = true;
              this.updateTable();
              this.isLoading = false;
              this.time_sheet_status = 'draft';
            }
            
          })
          .catch((error) => {
          });
        }
        
        
      },
      getUserInfo(resource_id){
        const res = getResourceInfoById(resource_id)
        .then((data) => {
          
        })
        .catch((error) => {
        });
      },
      getWeekInfo(dateString) {
        const date = moment(dateString);
        const startOfWeek = date.startOf('isoWeek').isoWeekday(1).format('YYYY-MM-DD');
        this.start_of_week = startOfWeek;
        this.end_of_week = moment(startOfWeek).endOf('isoWeek').format('YYYY-MM-DD');
        this.week_number = moment(startOfWeek).isoWeek();
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
        this.disableTableIfDataExists();
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
      },
      handleWeekChange(input){
        this.startDateOfWeek = input;
        this.getWeekInfo(input);
        this.getTimeSheetId();
        this.createTableColumns();
      },
      getSelectedTask(taskId, index) {
        if(index){
          const selectedTask = this.task_list.find(p => p.value === taskId);
          if (selectedTask) {
            // console.log(this.tableData[parseInt(index)]);
            // this.tableData[parseInt(index)].task_name = selectedTask.label;
          }
          return selectedTask;
        }
        

        // console.log(index);
        // console.log(this.task_list.find(p => p.value === taskId));
        // return this.task_list.find(p => p.value === taskId);
      },
      createTableColumns(){
        if(this.startDateOfWeek != null){
          var today = new Date(this.startDateOfWeek);
        }else{
          var today = new Date();
        } 
        const startOfWeek = new Date(today); 
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6);
        this.weekStartDate = this.formatDate(startOfWeek);
        this.weekEndDate = this.formatDate(endOfWeek);
        
        startOfWeek.setDate(today.getDate() - today.getDay());
        endOfWeek.setDate(today.getDate() - today.getDay() + 6);
        this.columns = [
            {title:"Id", field:"id", visible:false, htmlOutput:true},
            {
              title: "Project",
              field: "project_id",
              width: '16%',
              editor: "list",
              verticalNavigation: "hybrid",
              editorParams: {
                values: this.project_list,
                valuesLookup: "active",
                valuesLookupField: "color",
                clearable: true,
                itemFormatter: function(label, value, item, element) {
                  return label;
                },
              },
              formatter: (cell, formatterParams, onRendered) => {
                const cellValue = cell.getValue();
                this.project_id = cellValue;
                if (cellValue === -1) {
                  this.handleSelectedProject();
                }
                if (cellValue != null && cellValue != '') {
                  this.getTaskList();
                }
                
                const project = this.project_list.find(p => p.value === cellValue);
                const projectLabel = project ? project.label : "<span style='color: #ccc;'>Select Project</span>";

                // Set the title attribute for the cell to display full name on hover
                onRendered(() => {
                  const cellElement = cell.getElement();
                  cellElement.setAttribute('title', projectLabel);
                });

                return projectLabel;
              },
              headerSort: false,
              resizable: false,
              editable: this.isEditable,
            },       
            {
              title: "Task",
              field: "task_id",
              width: '16%',
              editor: "list",
              verticalNavigation: "hybrid",
              editorParams: {
                values: this.task_list,
                valuesLookup: "active",
                valuesLookupField: "color",
                clearable: true,
                itemFormatter: function(label, value, item, element) {
                  return label;
                },
              },
              formatter: (cell, formatterParams, onRendered) => {
                const cellValue = cell.getValue();
                if (cellValue === -1) {
                  this.handleSelectedTask();
                }
                const rowIndex = cell.getRow().getPosition();
                const selectedTask = this.getSelectedTask(cellValue, rowIndex);

                // Set the title attribute for the cell to display full task name on hover
                onRendered(() => {
                  const cellElement = cell.getElement();
                  cellElement.setAttribute('title', selectedTask ? selectedTask.label : cellValue);
                });
                return selectedTask ? selectedTask.label : "<span style='color: #ccc;'>Select Task</span>";
              },
              headerSort: false,
              resizable: false,
              editable: this.isEditable,
            },
            {title:`MON<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })})`, field:"monday", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["number","required", "min:0","max:09.00"],editable: this.isEditable},
            {title:`TUE<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })})`, field:"tuesday", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["number","required", "min:0","max:09.00"],editable: this.isEditable},
            {title:`WED<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })})`, field:"wednesday", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["number","required", "min:0","max:09.00"],editable: this.isEditable},
            {title:`THU<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })})`, field:"thursday", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["number","required", "min:0","max:09.00"],editable: this.isEditable},
            {title:`FRI<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })})`, field:"friday", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["number","required", "min:0","max:09.00"],editable: this.isEditable},
            {title:`SAT<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })})`, field:"saturday", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["number","required", "min:0","max:09.00"],editable: this.isEditable,formatter: function(cell, formatterParams) { cell.getElement().style.backgroundColor = "rgb(228 228 231)";cell.getElement().title = "Weekend"; return cell.getValue();}},
            {title:`SUN<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })})`, field:"sunday", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["required", "min:0","max:09.00"],editable: this.isEditable, formatter: function(cell, formatterParams) { cell.getElement().style.backgroundColor = "rgb(228 228 231)";cell.getElement().title = "Weekend"; return cell.getValue();}},
            {title:"Total", field:"total", hozAlign:"center", width:'8%', headerSort:false, bottomCalc:"sum", bottomCalcParams:{precision:2}, mutator: this.totalHrscustomMutator, formatter: this.totalHoursFormatter,editable: this.isEditable },
            
        ];
        if(this.timeSheetId){
          this.columns.push({title:"Action", field:"action", hozAlign:"center", formatter:this.approvalActions, width:'10%', headerSort:false, cellClick:this.reviewTimeSheet,resizable: false,editable: this.isEditable});
        }else{
          this.columns.push({title:"", field:"action", hozAlign:"center", formatter:this.deleteIcon, width:'5%', headerSort:false, cellClick:this.removeBottomRow,resizable: false,editable: this.isEditable});
        }
        this.table_columns = this.columns;
      },
      timeFormater(cell) {
        let value = cell.getValue();
        value = value.toString();
        let parts = value.split('.');
        let hours = parts[0] || '0';
        let minutesFraction = parts[1] || '0';

        // Convert fractional part of hours to minutes
        let fractionalMinutes = parseFloat(`0.${minutesFraction}`) * 60;

        let parsedHours = parseInt(hours);
        let parsedMinutes = Math.floor(fractionalMinutes);

        if (parsedHours > 24 || parsedHours < 0) {
          throw new Error("Hour must be between 0 and 24 (inclusive).");
        }

        if (parsedMinutes > 60 || parsedMinutes < 0) {
          throw new Error("Minutes must be between 0 and 60 (inclusive).");
        }

        if (parsedMinutes >= 60) {
          parsedHours += Math.floor(parsedMinutes / 60);
          parsedMinutes = parsedMinutes % 60;
        }

        let formattedHours = parsedHours.toString().padStart(2, '0');
        let formattedMinutes = parsedMinutes.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}`;
      },
      disableTableIfDataExists() {
        if ((this.time_sheet_status != 'draft' && this.time_sheet_status != '') || this.state_info.current_page == "all_timesheet" && this.time_sheet_status == 'approved') {
          this.isEditable = true;
        } else {
          this.isEditable = true;
        }
      },
      fetchProjectList(){
        this.project_list.push({label: "<strong>Create new project</strong>", value: -1, id: "create_new"});
        const res = getProjectList().then((data) => {
          if(data.items.length > 0){
            data.items.forEach(pobj => {
              this.project_list.push({label:pobj.project_name, value: pobj.id, id: pobj.id});
            });
          }
        })
        .catch((error) => {

        });
      },
      getTaskList(){
        try {
          const data = geTaskList(this.project_id).then((data) => {
            // this.task_list = [];
            if (data.items && data.items.length > 0) {
              this.task_list.push({ label: "<strong>Create new task</strong>", value: -1, id: "" });
              data.items.forEach(task => {
                this.task_list.push({ label: task.task_title, value: task.id, id: task.id });
              });
              table.updateColumnDefinition("task_name", {
                editorParams: {
                  values: task_list.label,
                }
              });
            }else{
              this.task_list.push({ label: "<strong>Create new task</strong>", value: -1, id: "" });
            }
            // this.updateTable();
          })
          .catch((error) => {

          });
        } catch (error) {
          console.error("Error fetching task list:", error);
        }
      },
      handleSelectedProject(){
        this.modalContent.title="Enter project name";
        this.modalContent.description="";
        this.modalContent.confirmLabel="Submit";
        this.modalContent.cancelLabel="Cancel";
        this.modalContent.showInputField = true;
        this.showCreateProjectPopup = true;
        this.openPopup();
      },
      handleSelectedTask(e,cell){
        this.modalContent.title="Enter task name";
        this.modalContent.description="";
        this.modalContent.confirmLabel="Submit";
        this.modalContent.cancelLabel="Cancel";
        this.modalContent.showInputField = true;
        this.showCreateTaskPopup = true;
        this.openPopup();
      },
      createProject(input){
        this.isLoading = true;
        const res = createProject(input).then((data) => {
          this.isLoading = false;
          toast("Project created successfully!", {
            "theme": "colored",
            "type": "success",
            "hideProgressBar": true,
            "dangerouslyHTMLString": true
          })
          this.fetchProjectList();
        })
        .catch((error) => {

        });
        
        this.isModalOpen = false;
      },
      createTask(input){
        this.isLoading = true;
        const res = createTask(input, this.project_id).then((data) => {
          this.isLoading = false;
          toast("Project created successfully!", {
            "theme": "colored",
            "type": "success",
            "hideProgressBar": true,
            "dangerouslyHTMLString": true
          })
          // this.task_list = [];
          this.getTaskList();
        })
        .catch((error) => {

        });
        
        this.isModalOpen = false;
      },
      reviewLineItems(rowData){
        const lineItemsInfo = {
          "timesheet_id": rowData.id,
          "project_id": rowData.project_id,
          "task_id": rowData.task_id,
          "project_name": rowData.project_name,
          "task_name": rowData.task_name,
          "date_logged": '',
          "day_of_week": '',
          "time_spent": rowData.total,
          "status": rowData.status,
          "rejection_reason": rowData.rejection_reason,
        };
        this.isLoading = true;
        const res = reviewTimeSheetLineItems(lineItemsInfo, rowData.id).then((data) => {
          this.isLoading = false;
          toast("Project created successfully!", {
            "theme": "colored",
            "type": "success",
            "hideProgressBar": true,
            "dangerouslyHTMLString": true
          })
          // this.task_list = [];
          this.getTaskList();
        })
        .catch((error) => {

        });
      }
    },
    mounted() {
      const currentDate = new Date();
      this.getWeekInfo(currentDate);
      this.isLoading = true;
      const mainStore = timeSheetInfo();
      this.state = mainStore;
      this.state_info = mainStore.$state;
      this.user_name = localStorage.getItem('user_name');
      this.resource_id = localStorage.getItem('resource_id');
      this.user_role = localStorage.getItem('user_type');
      if(mainStore.$state.current_page == "all_timesheet"){
        this.show_approval_btns = false;
        this.disable_date_range = true;
      }else if(mainStore.$state.current_page == "approval_requests"){
        this.show_approval_btns = true;
        this.disable_date_range = false;
      }else{
        this.show_approval_btns = false;
        this.disable_date_range = false;
      }
      var route = useRoute();
        if(route.query.id){
          this.timeSheetId = route.query.id;
          this.display_approve_btns = true;
        }else{
          this.timeSheetId = null;
          this.display_approve_btns = false;
        }
      this.createTableColumns();
      setTimeout(() => {
        this.tabulator = new Tabulator(this.$refs.table, {
          data: this.tableData, //link data to table
          height:"100%",
          width:"100%",
          layout:"fitDataTable",
          reactiveData:true, //turn on data reactivity
          columnCalcs:"true",
          validationMode:"blocking",
          columns: this.columns, //Set columns
        });
      }, 1000);
      // this.disableTableIfDataExists();
      this.table_columns = this.columns;
      this.isLoading = false;
      this.getTimeSheetId();
      this.fetchProjectList();
    },
    computed: {
      
    },
    beforeDestroy() {
    this.state.updateCurrentPage('');
  },
  }
</script>
  <template>
    <div>
      
      <div class="sm:flex-auto py-2">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Timesheet</h1>
      </div>
      <div class="flex">
        <div class="w-4/5">
          <UserInfo 
            :name="user_name"
            :id="resource_id"
            :role="user_role" 
          />
        </div>
        <div class="flex float-right w-1/5 justify-end">
          <div class="text-center py-4 ">
            <div v-if="time_sheet_status == 'draft'" class="flex rounded-md bg-stone-600 px-2.5 py-1.5 text-sm font-semibold text-white w-full shadow-sm"><img src="/src/assets/images/firstdraft.svg" alt="" class="h-5 w-5"><span class="pl-2">In draft</span></div>
            <div v-if="time_sheet_status == 'pending'" class="flex rounded-md bg-orange-600	 px-2.5 py-1.5 text-sm font-semibold text-white w-full shadow-sm"><img src="/src/assets/images/clock-nine.svg" alt="" class="h-5 w-5"><span class="pl-2">Pending</span></div>
            <div v-if="time_sheet_status == 'approved'" class="flex rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white w-full shadow-sm"><img src="/src/assets/images/circle-check.svg" alt="" class="h-5 w-5"><span class="pl-2">Approved</span></div>
            <div v-if="time_sheet_status == 'rejected'" class="flex rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white w-full shadow-sm"><img src="/src/assets/images/circle-minus-white.svg" alt="" class="h-5 w-5"><span class="pl-2">Rejected</span></div>
          </div>
        </div>
      </div>
      <nav class="flex float-right">
        <div class="hidden py-2 md:flex md:items-center">
          <Menu as="div" class="relative" v-if="show_approval_btns">
            <button @click="approveTimeSheet()" type="button" class="inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Approve TimeSheet
            </button>
          </Menu>
          <Menu as="div" class="relative pl-3.5" v-if="show_approval_btns">
            <button @click="rejectTimeSheet()" type="button" class="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Reject TimeSheet
            </button>
          </Menu>
          <Menu as="div" class="relative">
            <!-- <Menu as="div" class="relative" :class="disable_date_range == true ? 'disabled' : ''"> -->
            <WeekFilter @handleWeekChange=handleWeekChange />
          </Menu>
        </div>
      </nav>
      <div class="w-full" id="timesheet-table" ref="table"></div>
      <Loader :loading="isLoading" />
      <!-- <div class="flex float-right" v-if="timeSheetId == null"> -->
        <div class="flex float-right justify-end w-2/4 py-6" v-if="timeSheetId == null">
          <div class="pl-4 pr-3 w-2/5" v-if="show_submit_btn == true || time_sheet_status == 'draft'">
            <div class="">
              <button type="button" class="h-9 w-full rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" @click="showConfirmationPopup">Submit</button>
            </div>
          </div>
          <div class="" v-if="show_submit_btn == true || time_sheet_status == 'draft'">
            <div class="pl-4">
              <button type="button" class="rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="addRowToTable">
                <img src="/src/assets/images/plus-large.svg" alt="" class="h-5 w-5">
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
          :iconUrl="'/src/assets/images/circle-check-blank.svg'"
          :colorCode="'bg-green-100'"
          @closePopup="handleClosePopup"
          @confirmPopup="handleConfirmation"
        />
      </div>
      <div v-if="showCreateProjectPopup">
        <ModalPopup  
          :open="isModalOpen"
          :title="modalContent.title"
          :description="modalContent.description"
          :confirmLabel="modalContent.confirmLabel"
          :cancelLabel="modalContent.cancelLabel"
          :showInputField="modalContent.showInputField"
          @closePopup="handleClosePopup"
          @confirmPopup="createProject"
        />
      </div>
      <div v-if="showCreateTaskPopup">
        <ModalPopup  
          :open="isModalOpen"
          :title="modalContent.title"
          :description="modalContent.description"
          :confirmLabel="modalContent.confirmLabel"
          :cancelLabel="modalContent.cancelLabel"
          :showInputField="modalContent.showInputField"
          @closePopup="handleClosePopup"
          @confirmPopup="createTask"
        />
      </div>
      <div v-if="showTimeSheetSubmitConfirmation">
        <ModalPopup  
          :open="isModalOpen"
          :title="modalContent.title"
          :description="modalContent.description"
          :confirmLabel="modalContent.confirmLabel"
          :cancelLabel="modalContent.cancelLabel"
          :showInputField="modalContent.showInputField"
          :iconUrl="'/src/assets/images/circle-check-blank.svg'"
          :colorCode="'bg-green-100'"
          @closePopup="handleClosePopup"
          @confirmPopup="updateTimesheet('pending')"
        />
      </div>
    </div>
  </template>
  <style scoped>
    
  </style>