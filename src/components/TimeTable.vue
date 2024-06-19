<script>
  import {TabulatorFull as Tabulator} from 'tabulator-tables'; //import Tabulator library

  export default {
    data() {
      return {
        tabulator: null, //variable to hold your table
        tableData: [
            { 
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
          ]//data for table to display
      }
    },
    props: {
      id: {
        type: String,
        default: null,
      },
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
        return '<i class="fa fa-trash" aria-hidden="true"></i>';
      },
      addRowToTable() {
        this.tabulator.addRow({ project: "", task: "", col1: 0.0, col2: 0.0, col3: 0.0, col4: 0.0, col5: 0.0, col6: 0.0, col7: 0.0, total: 0.0 , action:""})
          .then((row) => {
            // row - the row component for the row updated or added
            // run code after data has been updated
            console.log("Row added:", row);
          })
          .catch((error) => {
            // handle error updating data
            console.error("Error adding row:", error);
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
        const allData = this.tabulator.getData();
        console.log("All Data:", allData);
      },
    },
    mounted() {
      //instantiate Tabulator when element is mounted
      this.tabulator = new Tabulator(this.$refs.table, {
        data: this.tableData, //link data to table
        height:"100%",
        width:"100%",
        layout:"fitDataTable",
        reactiveData:true, //turn on data reactivity
        columnCalcs:"true",
        columns:[
              {title:"Project", field:"project", width:150, editor:"input", headerSort:false},
              {title:"Task", field:"task", width:150, editor:"input", headerSort:false},
              {title:"SUN", field:"col1", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback },
              {title:"MON", field:"col2", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback },
              {title:"TUE", field:"col3", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback },
              {title:"WED", field:"col4", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback },
              {title:"THU", field:"col5", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback },
              {title:"FRI", field:"col6", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback },
              {title:"SAT", field:"col7", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback },
              {title:"Total", field:"total", hozAlign:"center", width:95, headerSort:false, bottomCalc:"sum", bottomCalcParams:{precision:2}, mutator: this.totalHrscustomMutator, formatter: this.totalHoursFormatter },
              {title:"Action", field:"action", hozAlign:"center", formatter:this.deleteIcon, width:100, headerSort:false, cellClick:this.removeBottomRow,resizable: false},
          ], //define table columns
      });
    },
    computed: {
      
    }
  }
</script>
  <template>
    <div>
      <div class="w-full" ref="table"></div>
      <div class="float-right">
        <div class="pl-4 pr-3">
          <button type="button" class="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" @click="submitTimesheet">Submit Timesheet</button>
          <button type="button" class="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" @click="addRowToTable">Add Row</button>
        </div>
      </div>
    </div>
  </template>
  <style scoped>
    .tabulator-editing input {
      border: 2px solid #3498db; /* Customize the border style */
      padding: 5px; /* Add padding if needed */
      border-radius: 4px; /* Add border radius if needed */
    }
    .tabulator .tabulator-header {
      border-bottom: 2px solid #dee2e6;
      border: 1px solid #dee2e6 !important;
      color: inherit;
    }
    .tabulator .tabulator-header .tabulator-col {
        background-color: #fff;
        border-right: 1px solid #dee2e6 !important;
    }
    .tabulator .tabulator-tableholder .tabulator-table {
      /* background-color: #fff; */
      color: #333;
      display: inline-block;
      overflow: visible;
      position: relative;
      white-space: nowrap;
    }
    .tabulator-row .tabulator-cell {
      border: 1px solid rgb(208, 213, 247);
      padding: 5px;
      /* border-radius: 4px; */
      text-align: center;
      box-sizing: border-box;
    }
  </style>