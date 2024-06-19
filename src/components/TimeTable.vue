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
              row1: 0.0,
              row2: 0.0,
              row3: 0.0,
              row4: 0.0,
              row5: 0.0,
              row6: 0.0,
              row7: 0.0,
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
        return parseFloat(data.row1) + parseFloat(data.row2) + parseFloat(data.row3) + parseFloat(data.row4) + parseFloat(data.row5) + parseFloat(data.row6) + parseFloat(data.row7);
      },
      deleteIcon(cell, formatterParams, onRendered) {
        return '<img class="h-8 w-auto" src="/images/trash.svg" alt="Delete" />';
      },
      addRowToTable() {
        this.tabulator.addRow({ project: "", task: "", row1: 0.0, row2: 0.0, row3: 0.0, row4: 0.0, row5: 0.0, row6: 0.0, row7: 0.0, total: 0.0 , action:""})
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
      }
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
              {title:"SUN", field:"row1", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback },
              {title:"MON", field:"row2", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback },
              {title:"TUE", field:"row3", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback },
              {title:"WED", field:"row4", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback },
              {title:"THU", field:"row5", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback },
              {title:"FRI", field:"row6", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback },
              {title:"SAT", field:"row7", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: this.cellEditedCallback },
              {title:"Total", field:"total", hozAlign:"center", width:95, headerSort:false, bottomCalc:"sum", bottomCalcParams:{precision:2}, mutator: this.totalHrscustomMutator, formatter: this.totalHoursFormatter },
              {title:"", field:"action", hozAlign:"center", formatter:this.deleteIcon, width:100, headerSort:false, cellClick:this.removeBottomRow},
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
  </style>