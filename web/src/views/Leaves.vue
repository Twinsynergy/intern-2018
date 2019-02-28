<template>
  <div class="leave">
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">จัดการ</li>
      </ol>
    </div>

    <br>
    <div class="alert alert-light">
      <v-card-title primary>
        <h3>ใบลา</h3>
        <v-spacer></v-spacer>
        <div class="text-xs-center">
          <v-btn small fab color="blue" @click="addButton">
            <v-icon color="white">add</v-icon>
          </v-btn>
        </div>
      </v-card-title>



      <v-card-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <el-input placeholder="ค้นหา" prefix-icon="el-icon-search" v-model="search"></el-input>
      </v-card-title>
            <div class="container-fluid">
      <v-data-table :headers="headers" :items="desserts" :search="search">
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.vacation_id }}</td>
          <td class="text-xs-center">{{ props.item.vacation_type }}</td>
          <td class="text-xs-right">
            
             <v-chip color="green" text-color="white">{{ props.item.vacation_note_date }}</v-chip>
            
            </td>
          <td class="text-xs">
            <v-btn
              flat
              small
              color="info"
              v-bind:to="{name: 'leavesdetail', params: {leavesID: props.item.vacation_id }}"
            >
              <v-icon>visibility</v-icon>
            </v-btn>
            <v-btn
              flat
              small
              color="red"
              @click="(selectedData.id = props.item.vacation_id,selectedData.name = props.item.vacation_type),dialogDel() "
            >
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </template>
        <v-alert
          slot="no-results"
          :value="true"
          color="error"
          icon="warning"
        >ไม่พบข้อมูล "{{ search }}"</v-alert>
      </v-data-table>
            </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    axios
      .get("http://35.198.219.154:9000/vacation")
      .then(response => (this.desserts = response.data));
  },
  methods: {
    addButton: function() {
      this.$router.push("/leaves/add");
    },
    dialogDel: function() {
      swal({
        title: "ยืนยันการลบข้อมูล?",
        text: "ต้องการลบข้อมูล " + this.selectedData.name + " หรือไม่?",
        icon: "warning",
        buttons: ["ยกเลิก", "ยืนยัน"],
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          swal("ลบข้อมูล " + this.selectedData.name + " เรียบร้อย", {
            icon: "success",
            buttons: false,
            timer: 2000
          }).then(function() {
            $reloadRouteData();
          });
        } else {
        }
      });
    }
  },
  data() {
    return {
      search: "",
      selectedData: { id: "", name: "" },
      headers: [
        {
          text: "#",
          align: "center",
          sortable: true,
          value: "branch_id"
        },
        {
          text: "รายการ",
          value: "vacation_type",
          align: "center"
        },
        {
          text: "วันที่",
          value: "date_time",
          align: "right"
        },
        {
          text: "จัดการ",
          align: "center",
          sortable: false
        }
      ],
      desserts: []
    };
  }
};
</script>
<style>

</style>
