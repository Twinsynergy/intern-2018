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
        >สิทธิประโยชน์ของ {{empData.emp_name}} ({{empData.emp_nickname}})</li>
      </ol>
    </div>
    <br>
    <div class="alert alert-light">
      <v-card-title primary>
        <h3>สิทธิประโยชน์ของ {{empData.emp_name}} ({{empData.emp_nickname}})</h3>
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
            <td class="text-xs-center" width="400">{{ props.item.benefit_title }}</td>
            <td class="text-xs-center">
              <v-chip
                color="#FEEFF0"
                text-color="#F56C6C"
              >{{ Number(props.item.benefit_price).toLocaleString()}} บาท</v-chip>
            </td>
            <td class="text-xs">
              <v-btn
                flat
                icon
                color="info"
                v-bind:to="{name: 'empBenefitDetail', params: {BenefitID: props.item.id}}"
              >
                <v-icon>visibility</v-icon>
              </v-btn>
              <v-btn
                flat
                icon
                color="red"
                @click="(selectedData.id = props.item.id,selectedData.name = props.item.benefit_title),dialogDel() "
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
          <template slot="footer">
            <td :colspan="headers.length">
              <br>
              <h4 class="text-xs-right">
                รวมค่าใช้จ่ายสิทธิประโยชน์ทั้งหมด
                <font
                  color="#4AD991"
                >{{Number(benafitTotal.benafitTotal).toLocaleString()}}</font> บาท
              </h4>
              <br>
            </td>
          </template>
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
    this.getDatabenefit();
  },
  data() {
    return {
      nodata: "กำลังโหลด..",
      loading: true,
      search: "",
      benafitTotal:[],
      headers: [
        {
          text: "#",
          align: "center",
          sortable: false
        },
        {
          text: "รายการ",
          value: "benefit_title",
          align: "center"
        },
        {
          text: "ค่าใช้จ่าย",
          align: "center",
          value: "benefit_price"
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
      let apiURL = "http://api:3030/emp/";
      let getID = this.$route.params.empID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.empData = response.data.data));
    },
    getDatabenefit: function() {
      let apiURL = "http://api:3030/employee/benefit/";
      let getID = this.$route.params.empID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(
          response => (
            (this.desserts = response.data.data),
            (this.benafitTotal = response.data),
            (this.loading = false),
            (this.nodata = "ไม่มีข้อมูล")
          )
        );
    },
    addButton: function() {
      this.$router.push({
        name: "empBenefitAdd",
        params: { empID: this.$route.params.empID }
      });
    },
    deleteData: function() {
      this.axios
        .post("http://api:3030/benefit/delete", this.selectedData, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
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
            this.getDatabenefit();
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

