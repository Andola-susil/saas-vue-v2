  <template>
    <div id="example-table"></div>
    <div>
      <button id="reactivity-add" class="float-right">Add New Row</button>
    </div>
  </template>
  
  <script>
  import Loader from '../components/Loader.vue';
  import {TabulatorFull as Tabulator} from '../../node_modules/tabulator-tables';

  //define data
  var tabledata = [
      {id:1, project:"", task:"", row1:0.0, row2:0.0, row3:0.0, row4:0.0, row5:0.0, row6:0.0, row7:0.0, total:0.0, action: ""},
  ];

  setTimeout(() => {
    //Create Date Editor
    var dateEditor = function(cell, onRendered, success, cancel){
        //cell - the cell component for the editable cell
        //onRendered - function to call when the editor has been rendered
        //success - function to call to pass thesuccessfully updated value to Tabulator
        //cancel - function to call to abort the edit and return to a normal cell

        //create and style input
        var cellValue = luxon.DateTime.fromFormat(cell.getValue(), "dd/MM/yyyy").toFormat("yyyy-MM-dd"),
        input = document.createElement("input");

        input.setAttribute("type", "date");

        input.style.padding = "4px";
        input.style.width = "100%";
        input.style.boxSizing = "border-box";

        input.value = cellValue;

        onRendered(function(){
            input.focus();
            input.style.height = "100%";
        });

        function onChange(){
            if(input.value != cellValue){
                success(luxon.DateTime.fromFormat(input.value, "yyyy-MM-dd").toFormat("dd/MM/yyyy"));
            }else{
                cancel();
            }
        }

        //submit new value on blur or change
        input.addEventListener("blur", onChange);

        //submit new value on enter
        input.addEventListener("keydown", function(e){
            if(e.keyCode == 13){
                onChange();
            }

            if(e.keyCode == 27){
                cancel();
            }
        });

        return input;
    };

    setTimeout(() => {
      // Custom Mutator to calculate total hours
      var totalHrscustomMutator = function(value, data, type, params, component) {        
        return parseFloat(data.row1) + parseFloat(data.row2) + parseFloat(data.row3) + parseFloat(data.row4) + parseFloat(data.row5) + parseFloat(data.row6) + parseFloat(data.row7);
      };

      // Custom Formatter for total hours
      var totalHoursFormatter = function(cell, formatterParams, onRendered) {
        let value = cell.getValue();
        return value ? value.toFixed(2) : '0.00';
      };

      var printIcon = function(cell, formatterParams, onRendered){ //plain text value
          return '<i class="fa fa-trash-o" style="font-size:48px;color:red"></i>';
      };

      // Cell Edited callback
        var cellEditedCallback = function(cell) {
        let row = cell.getRow();
        let data = row.getData();
        let total = totalHrscustomMutator(null, data);
        row.update({ total: total });
      };

      //Build Tabulator
      var table = new Tabulator("#example-table", {
          height:"100%",
          width:"100%",
          layout:"fitDataTable",
          reactiveData:true, //turn on data reactivity
          data:tabledata, //load data into table
          columnCalcs:"true", 
          columns:[
              {title:"Project", field:"project", width:150, editor:"input", headerSort:false},
              {title:"Task", field:"task", width:150, editor:"input", headerSort:false},
              {title:"SUN", field:"row1", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: cellEditedCallback },
              {title:"MON", field:"row2", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: cellEditedCallback },
              {title:"TUE", field:"row3", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: cellEditedCallback },
              {title:"WED", field:"row4", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: cellEditedCallback },
              {title:"THU", field:"row5", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: cellEditedCallback },
              {title:"FRI", field:"row6", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: cellEditedCallback },
              {title:"SAT", field:"row7", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc: "sum", bottomCalcFormatter: (cell) => cell.getValue().toFixed(2), cellEdited: cellEditedCallback },
              {title:"Total", field:"total", hozAlign:"center", width:95, editor:"number", headerSort:false, bottomCalc:"sum", bottomCalcParams:{precision:1}, mutator: totalHrscustomMutator, formatter: totalHoursFormatter },
              {title:"", field:"action", hozAlign:"center", formatter:printIcon, width:100, headerSort:false, cellClick:function(e, cell){alert("Printing row data for: " + cell.getRow().getData().id)}},
          ],  
      });

      var colDefs = table.getColumnDefinitions() //get column definition array
      console.warn(colDefs);

      //remove bottom row from table on button click
      document.getElementById("reactivity-delete").addEventListener("click", function(){
          tabledata.pop();
      });

    }, 1000);

    //add row to bottom of table on button click
    document.getElementById("reactivity-add").addEventListener("click", function(){
        tabledata.push({ project: "", task: "", row1: 0.0, row2: 0.0, row3: 0.0, row4: 0.0, row5: 0.0, row6: 0.0, row7: 0.0, total: 0.0 , action:""});
        table.setData(tabledata);
    });

  }, 1000);


  export default {
    components: {
        Loader,
    },
    data() {
      return {
        rows: [
          {
            project: "Select Project and Task▾",
            days: ["8.00", "8.00", "8.00", "8.00", "8.00", "8.00", "8.00"],
            total: "40"
          },
          {
            project: "Select Project and Task▾",
            days: ["8.00", "8.00", "8.00", "8.00", "8.00", "8.00", "8.00"],
            total: "40"
          },
          {
            project: "M New",
            days: ["8.00", "8.00", "8.00", "8.00", "8.00", "8.00", "8.00"],
            total: "40.00"
          }
        ],
        headers: [
          {
            days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],            
          },
        ],
        isLoading: false,
      };
    },
    methods: {
      addRow() {
        this.rows.push({
          project: "",
          days: ["0", "0", "0", "0", "0", "0", "0"],
          total: "0"
        });
      },
      save() {
        // Add save logic here
        console.log("Saved", this.rows);
      },
    },
    watch: {
      rows: {
        handler(val) {
          val.forEach(row => {
            row.total = row.days.reduce((acc, day) => acc + parseFloat(day), 0).toFixed(2);
          });
        },
        deep: true
      }
    }
  };
  </script>
  
  <style scoped>
    .tabulator-editing input {
      border: 2px solid #3498db; /* Customize the border style */
      padding: 5px; /* Add padding if needed */
      border-radius: 4px; /* Add border radius if needed */
    }
  </style>
  