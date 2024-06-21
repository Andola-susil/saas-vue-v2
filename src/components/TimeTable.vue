<script>
  import {TabulatorFull as Tabulator} from 'tabulator-tables'; //import Tabulator library
  import { PlusIcon } from '@heroicons/vue/20/solid'
  import Loader from '../components/Loader.vue';
  import { useRoute } from 'vue-router';
  import ModalPopup from '../components/common/ModalPopup.vue';
  import { toast } from 'vue3-toastify';
  export default {
    data() {
      return {
        tabulator: null, //variable to hold your table
        id_count : 1,
        tableData: [
            { 
              id: 1,
              project: "",
              task: "",
              col1: 0.0,
              col2: 0.0,
              col3: 0.0,
              col4: 0.0,
              col5: 0.0,
              col6: 0.0,
              col7: 0.0,
              total: 0.0 ,
              action:"",
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
        ModalPopup
    },
    methods: {
      cellEditedCallback(cell) {
        let row = cell.getRow();
        let data = row.getData();
        let total = this.totalHrscustomMutator(null, data);
        row.update({ total: total });
      },
      totalHrscustomMutator(value, data, type, params, component) {
        return parseFloat(data.col1) + parseFloat(data.col2) + parseFloat(data.col3) + parseFloat(data.col4) + parseFloat(data.col5) + parseFloat(data.col6) + parseFloat(data.col7);
      },
      deleteIcon(cell, formatterParams, onRendered) {
        return '<img src="/src/assets/images/trash-can.svg" alt="" class="h-5 w-5">';
      },
      approvalActions(cell, formatterParams, onRendered){
        return '<div class="flex"><div class="px-1"><img src="/src/assets/images/circle-check-blank.svg" alt="" class="h-6 w-6 " data-action="approve"></div><div class="px-1"><img src="/src/assets/images/circle-x.svg" alt="" class="h-6 w-6" data-action="reject"></div></div>';
      },
      addRowToTable() {
        this.id_count ++;
        this.tabulator.addRow({ id:this.id_count,project: "", task: "", col1: 0.0, col2: 0.0, col3: 0.0, col4: 0.0, col5: 0.0, col6: 0.0, col7: 0.0, total: 0.0 , action:""})
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
        
        setTimeout(() => {
          this.isLoading = false;
          this.json_output = logEntry;
          toast("Timesheet submitted successfully!", {
            "theme": "colored",
            "type": "success",
            "hideProgressBar": true,
            "dangerouslyHTMLString": true
          });
          
        }, 1000);
      },
      generateLogEntry(allData) {
          return {
            id: 1,
            tenant_id: 101,
            project_id: 202,
            resource_type: "developer",
            resource_id: 303,
            task_id: 404,
            time_log_date: "2024-06-18T08:30:00",
            task_start_time: "2024-06-18T09:00:00",
            task_end_time: "2024-06-18T17:00:00",
            break_time: 3600,  // 1 hour in seconds
            total_time: 25200,  // 7 hours in seconds
            is_billable: 1,  // 1 for true
            description: "Worked on module A development",
            is_from_timer: 0,  // 0 for manual entry
            approver_id: 505,
            approval_status: "PENDING",
            created_at: "2024-06-18T08:30:00",
            created_by: 303,
            updated_at: "2024-06-18T08:30:00",
            updated_by: 303,
            lineitem_details: allData
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
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
          toast("Timesheet reviewed successfully!", {
            "theme": "colored",
            "type": "success",
            "hideProgressBar": true,
            "dangerouslyHTMLString": true
          })
        }, 1000);
        
        this.isModalOpen = false;
        console.log('Confirmed with input:', inputValue)
      },
    },
    mounted() {
      this.isLoading = true;
      //instantiate Tabulator when element is mounted
      const today = new Date(); 
      const startOfWeek = new Date(today); 
      const endOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      endOfWeek.setDate(today.getDate() - today.getDay() + 6);
      const columns = [
          {title:"Id", field:"id", visible:false, htmlOutput:true},
          {title:"Project", field:"project", width:'16%', editor:"input", headerSort:false},
          {title:"Task", field:"task", width:'15%', editor:"input", headerSort:false},
          {title:`SUN<br>(${startOfWeek.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })})`, field:"col1", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["required", "min:0","max:9","maxLength:1"]},
          {title:`MON<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })})`, field:"col2", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["required", "min:0","max:9","maxLength:1"]},
          {title:`TUE<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })})`, field:"col3", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["required", "min:0","max:9","maxLength:1"]},
          {title:`WED<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })})`, field:"col4", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["required", "min:0","max:9","maxLength:1"]},
          {title:`THU<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })})`, field:"col5", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["required", "min:0","max:9","maxLength:1"]},
          {title:`FRI<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })})`, field:"col6", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["required", "min:0","max:9","maxLength:1"]},
          {title:`SAT<br>(${new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })})`, field:"col7", hozAlign:"center", width:'8%', editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback, validator:["required", "min:0","max:9","maxLength:1"]},
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
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
    computed: {
      
    }
  }
</script>
  <template>
    <div>
      <nav class="flex float-right" v-if="timeSheetId != null">
        <div class="hidden py-2 md:flex md:items-center">
          <Menu as="div" class="relative">
            <button @click="approveTimeSheet()" type="button" class="inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Approve TimeSheet
            </button>
          </Menu>
          <Menu as="div" class="relative pl-3.5">
            <button @click="rejectTimeSheet()" type="button" class="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Reject TimeSheet
            </button>
          </Menu>
        </div>
      </nav>
      <div class="w-full" ref="table"></div>
      <Loader :loading="isLoading" />
      <!-- <div class="flex float-right" v-if="timeSheetId == null"> -->
        <div class="flex float-right">
        <div class="pl-4 pr-3">
          <div>
            <button type="button" class="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" @click="submitTimesheet">Submit</button>
          </div>
        </div>
        <div class="">
          <div class="pl-4 pr-3">
            <!-- <button type="button" class="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" @click="addRowToTable"><PlusIcon class="h-5 w-5" aria-hidden="true" /></button> -->
            <button type="button" class="rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="addRowToTable">
              <img src="/src/assets/images/plus.svg" alt="" class="h-5 w-5">
            </button>
          </div>
        </div>
      </div>
      <div ref="json">
        <pre>{{json_output}}</pre>
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