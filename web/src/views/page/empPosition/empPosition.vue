<template>
  <div class="emp">
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/emp">จัดการพนักงาน</router-link>
        </li>
        <li
          class="breadcrumb-item active"
          aria-current="page"
        >ตำแหน่งทั้งหมดของ {{empData.emp_name}} ({{empData.emp_nickname}})</li>
      </ol>
    </div>
    <br>
    <div class="alert alert-light">
      <v-card-title primary>
        <h3>ตำแหน่งทั้งหมดของ {{empData.emp_name}} ({{empData.emp_nickname}})</h3>
        <v-spacer></v-spacer>
        <div>
          <v-btn small fab outline color="blue" @click="addButton">
            <v-icon>add</v-icon>
          </v-btn>
          <span class="text-sm">เพิ่ม</span>
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
        <v-data-table
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          :loading="loading"
          :headers="headers"
          :items="desserts"
          :search="search"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.index+1 }}</td>
            <td class="text-xs-left" width="1000">
            
              <b>ตำแหน่ง {{ props.item.position_name}}</b>
            </td>
            <td class="text-xs">
              <v-btn
                flat
                icon
                color="red"
                @click="(selectedData.id = props.item.id,selectedData.name = props.item.position_name),dialogDel() "
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
          <template
            slot="pageText"
            slot-scope="props"
          >แสดง {{ props.pageStart }} - {{ props.pageStop }} จาก {{ props.itemsLength }}</template>
          <template slot="no-data">
            <br>
            <span>
              <h4>{{nodata}}</h4>
            </span>
            <br>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getData();
    this.getDataposition();
  },
  data() {
    return {
      nodata: "กำลังโหลด..",
      loading: true,
      search: "",
      headers: [
        {
          text: "#",
          align: "center",
          sortable: false
        },
        {
          text: "ตำแหน่ง",
          value: "position_name",
          align: "center"
        },
        {
          text: "จัดการ",
          align: "center",
          sortable: false
        }
      ],
      empData: [],
      desserts: [],
      pagination: {
        rowsPerPage: 10
      },
      rowsPerPageItems: [10, 20, 30, 40],
      selectedData: { id: "", name: "" }
    };
  },
  methods: {
    getData: function() {
      let apiURL = "http://178.128.80.240:3030/emp/";
      let getID = this.$route.params.empID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.empData = response.data.data));
    },
    getDataposition: function() {
      let apiURL = "http://178.128.80.240:3030/emp/position/";
      let getID = this.$route.params.empID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(
          response => (
            (this.desserts = response.data.data),
            (this.loading = false),
            (this.nodata = "ไม่มีข้อมูล")
          )
        ) ;
    },
    addButton: function() {
      this.$router.push({
        name: "empPositionAdd",
        params: { empID: this.$route.params.empID }
      });
    },
    deleteData: function() {
      this.axios
        .post(
          "http://178.128.80.240:3030/positionemp/delete",
          this.selectedData,
          { headers: { Authorization: `${localStorage.tokenkey}` } }
        )
        .then(response => {
          (this.loading = true), (this.nodata = "กำลังโหลด..");
          console.log("ok2");
          Swal.fire({
            title: "ลบข้อมูล " + this.selectedData.name + " เรียบร้อย",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          }).then(result => {
            console.log("ok3");
            this.getDataposition();
          });
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "เกิดข้อผิดพลาด",
            showConfirmButton: false,
            timer: 1500
          });
          console.log(err);
        });
    },
    dialogDel: function() {
      Swal.fire({
        title: "ยืนยันการลบข้อมูล?",
        text: "ต้องการลบข้อมูล " + this.selectedData.name + " หรือไม่?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F56C6C",

        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน"
      }).then(result => {
        if (result.value) {
          this.deleteData();
          console.log("ok1");
        }
      });
    }
  }
};
</script>

<style>
</style>

