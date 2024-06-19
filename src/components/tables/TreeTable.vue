<template>
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
          {name:"Oli Bob", location:"United Kingdom", gender:"male", col:"red", dob:"14/04/1984", _children:[
                {name:"Mary May", location:"Germany", gender:"female", col:"blue", dob:"14/05/1982"},
                {name:"Christine Lobowski", location:"France", gender:"female", col:"green", dob:"22/05/1982"},
                {name:"Brendon Philips", location:"USA", gender:"male", col:"orange", dob:"01/08/1980"},
                {name:"Margret Marmajuke", location:"Canada", gender:"female", col:"yellow", dob:"31/01/1999"},
                {name:"Frank Harbours", location:"Russia", gender:"male", col:"red", dob:"12/05/1966"},
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
                dataTreeStartExpanded: true,
                columns: [
                    {title:"Name", field:"name", width:200, responsive:0}, //never hide this column
                    {title:"Location", field:"location", width:150},
                    {title:"Gender", field:"gender", width:150, responsive:2}, //hide this column first
                    {title:"Favourite Color", field:"col", width:150},
                    {title:"Date Of Birth", field:"dob", hozAlign:"center", sorter:"date", width:150},
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
  