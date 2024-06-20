<template>
    <div>Past timesheet</div>
    <div id="example-table"></div>
    <Loader :loading="isLoading" />
</template>
  
  <script>
  import { TabulatorFull as Tabulator } from 'tabulator-tables';
  import Loader from '../../components/Loader.vue';
  
  
  export default {
    name: 'TreeTable',
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Loader,
    },
    data() {
      return {
        tableDataNested: [
            {name:"Christine Lobowski", location:"W12", gender:"66hr", col:"Approved", dob:"14/04/1984", _children:[
                {name:"Oli Bob", location:"France", gender:"female", col:"green", dob:"22/05/1982"},
                {name:"Oli Bob", location:"France", gender:"female", col:"green", dob:"22/05/1982"},
                {name:"Oli Bob", location:"France", gender:"female", col:"green", dob:"22/05/1982"},
                {name:"Oli Bob", location:"France", gender:"female", col:"green", dob:"22/05/1982"},
            ]},
            {name:"Liam Jones", location:"W22", gender:"63hr", col:"Approved", dob:"14/04/1984", _children:[
                {name:"Oli Bob", location:"France", gender:"female", col:"green", dob:"22/05/1982"},
                {name:"Oli Bob", location:"France", gender:"female", col:"green", dob:"22/05/1982"},
                {name:"Oli Bob", location:"France", gender:"female", col:"green", dob:"22/05/1982"},
                {name:"Oli Bob", location:"France", gender:"female", col:"green", dob:"22/05/1982"},
                {name:"Oli Bob", location:"France", gender:"female", col:"green", dob:"22/05/1982"},
            ]},
            {name:"Ethan Rodriguez", location:"W32", gender:"45hr", col:"Approved", dob:"14/04/1984", _children:[
                {name:"Oli Bob", location:"France", gender:"female", col:"green", dob:"22/05/1982"},
                {name:"Oli Bob", location:"France", gender:"female", col:"green", dob:"22/05/1982"},
                {name:"Oli Bob", location:"France", gender:"female", col:"green", dob:"22/05/1982"},
                {name:"Oli Bob", location:"France", gender:"female", col:"green", dob:"22/05/1982"},
                {name:"Oli Bob", location:"France", gender:"female", col:"green", dob:"22/05/1982"},
            ]},
        ],
        isLoading: true,
      };
    },
    mounted() {
        
        this.isLoading = true;
        new Tabulator("#example-table", {
                height: "100%",
                width: "100%",
                data: this.tableDataNested,
                dataTree: true,
                dataTreeStartExpanded: false,
                columns: [
                    {title:"Name", field:"name", hozAlign:"left", width:200, responsive:0}, //never hide this column
                    {title:"Week no", field:"location", width:150},
                    {title:"Logged Hours", field:"gender", width:200, responsive:2}, //hide this column first
                    {title:"Status", field:"col", width:150},
                    {title:"Submitted On", field:"dob", hozAlign:"center", sorter:"date", width:150},
                ],
        });
        setTimeout(() => {
            this.isLoading = false;
        }, 500);
    }
  };
  </script>
  
  <style scoped>
  #example-table {
    margin: 20px;
  }
  </style>
  