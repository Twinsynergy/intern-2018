<template>
  <div class="Position">
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">จัดการตำแหน่ง</li>
      </ol>
    </div>
    <br>
    <div class="alert alert-light">
      <v-card-title primary>
        <h3>ตำแหน่ง</h3>
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
          :search="search "
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.index+1}}</td>
            <td class="text-xs-left" width="1000">{{ props.item.position_name }}</td>
            <td class="text-xs" width="300">
              <v-btn
                flat
                icon
                color="info"
                v-bind:to="{name: 'positiondetail', params: {positionID: props.item.id }}"
              >
                <v-icon>visibility</v-icon>
              </v-btn>
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
import { all } from "q";
export default {
  mounted() {
    this.getData();
  },
  data() {
    return {
      nodata: "กำลังโหลด..",
      loading: true,
      search: "",
      pagination: {
        rowsPerPage: 10
      },
      headers: [
        {
          text: "#",
          align: "center",
          sortable: false,
          value: "position_id"
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
      desserts: [],
      rowsPerPageItems: [10, 20, 30, 40, 100],
      selectedData: { id: "", name: "" }
    };
  },
  methods: {
    getData: function() {
      axios
        .get("http://178.128.80.240:3030/position/datatable", {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(
          response => (
            (this.desserts = response.data.data),
            (this.loading = false),
            (this.nodata = "ไม่มีข้อมูล")
          )
        )
        .catch(err => {
          console.log(err.response.status);
          if (err.response.status == 401) {
            Swal.fire({
              type: "warning",
              title: "เซสชั่นหมดอายุแล้ว",
              text: "กรุณาเข้าสู่ระบบใหม่",
              showConfirmButton: true
            });
            localStorage.clear();
            this.$store.state.getApiData.tokenkey = null;
          }
          if (err.response.status == 404) {
            Swal.fire({
              type: "warning",
              title: "เกิดข้อผิดพลาด",
              showConfirmButton: true
            });
          }
        });
    },
    addButton: function() {
      this.$router.push("/position/add");
    },
    deleteData: function() {
      this.axios
        .post("http://178.128.80.240:3030/position/delete", this.selectedData, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => {
          (this.loading = true), (this.nodata = "กำลังโหลด..");
          Swal.fire({
            title: "ลบข้อมูล " + this.selectedData.name + " เรียบร้อย",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          }).then(result => {
            console.log("ok3");
            this.getData();
          });
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            type: "error",
            title: "เกิดข้อผิดพลาด",
            showConfirmButton: false,
            timer: 1500
          });
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
