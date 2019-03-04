<template>
  <div>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/branch">จัดการสาขา</router-link>
        </li>
        <li
          class="breadcrumb-item active"
          aria-current="page"
        >ค่าใช้จ่ายของสาขา {{branchData.branch_name}}</li>
      </ol>
    </div>
    <br>

    <div class="alert alert-light">
      <v-card-title primary>
        <h3>ค่าใช้จ่ายทั่วไป</h3>
        <v-spacer></v-spacer>
        <div>
          <v-btn small fab outline color="blue" @click="addfixcostButton">
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
        <el-input placeholder="ค้นหา" prefix-icon="el-icon-search" v-model="searchfixcost"></el-input>
      </v-card-title>
      <div class="container-fluid">
        <v-data-table
          :loading="loading"
          :headers="headersfixcost"
          :items="dessertsfixcost"
          :search="searchfixcost"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.index+1 }}</td>
            <td class="text-xs-left" width="400">{{ props.item.fixcost_title }}</td>
            <td class="text-xs-center" width="400">
              <v-chip
                color="#FEEFF0"
                text-color="#F56C6C"
              >{{ Number(props.item.fixcost_price).toLocaleString()}} บาท</v-chip>
            </td>
            <td class="text-xs">
              <v-btn
                flat
                icon
                color="info"
                v-bind:to="{name: 'branchfixcostdetail', params: {CostID: props.item.id }}"
              >
                <v-icon>visibility</v-icon>
              </v-btn>
              <v-btn
                flat
                icon
                color="red"
                @click="(selectedDatafixcost.id = props.item.id,selectedDatafixcost.name = props.item.fixcost_title),dialogDelfixcost() "
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
            outline
          >ไม่พบข้อมูล "{{ searchfixcost }}"</v-alert>
          <template slot="footer">
            <td :colspan="headersfixcost.length">
              <br>
              <h4 class="text-xs-right">
                รวมค่าใช้จ่ายทั่วไปทั้งหมด
                <font
                  color="#4AD991"
                >{{Number(fixcostTotal.branchFixcostTotal).toLocaleString()}}</font> บาท
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
    <br>
    <div class="alert alert-light">
      <v-card-title primary>
        <h3>ค่าใช้จ่ายอื่นๆ</h3>
        <v-spacer></v-spacer>
        <div>
          <v-btn small fab outline color="blue" @click="addAdditButton">
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
        <el-input placeholder="ค้นหา" prefix-icon="el-icon-search" v-model="searchaddit"></el-input>
      </v-card-title>
      <div class="container-fluid">
        <v-data-table
          :pagination.sync="pagination"
          :headers="headersaddit"
          :items="dessertsaddit"
          :search="searchaddit"
          :loading="loading2"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.index+1 }}</td>

            <td class="text-xs-left" width="400">{{ props.item.branch_addit_title }}</td>
            <td class="text-xs-center">
              <v-chip color="#F4F4F5" text-color="#8F9399">
                <v-avatar>
                  <v-icon>date_range</v-icon>
                </v-avatar>
                {{ props.item.branch_addit_date | moment("DD MMMM YYYY") }}
              </v-chip>
            </td>
            <td class="text-xs-center">
              <v-chip
                color="#FEEFF0"
                text-color="#F56C6C"
              >{{ Number(props.item.branch_addit_price).toLocaleString()}} บาท</v-chip>
            </td>
            <td class="text-xs">
              <v-btn
                flat
                icon
                color="info"
                v-bind:to="{name: 'branchadditdetail', params: {AdditID: props.item.id }}"
              >
                <v-icon>visibility</v-icon>
              </v-btn>
              <v-btn
                flat
                icon
                color="red"
                @click="(selectedDataaddit.id = props.item.id,selectedDataaddit.name = props.item.branch_addit_title),dialogDeladdit() "
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
            outline
          >ไม่พบข้อมูล "{{ searchaddit }}"</v-alert>
          <template slot="footer">
            <td :colspan="headersaddit.length">
              <br>
              <h4 class="text-xs-right">
                รวมค่าใช้จ่ายอื่นๆทั้งหมด
                <font
                  color="#4AD991"
                >{{Number(additTotal.branchAdditTotal).toLocaleString()}}</font> บาท
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
              <h4>{{nodata2}}</h4>
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
    this.getAllData();
    this.getDataaddit();
    this.getDatafixcost();
  },
  data() {
    return {
      nodata: "กำลังโหลด..",
      nodata2: "กำลังโหลด..",
      loading: true,
      loading2: true,
      searchfixcost: "",
      searchaddit: "",
      headersfixcost: [
        {
          text: "#",
          align: "center",
          sortable: false
        },
        {
          text: "รายการ",
          value: "fixcost_title",
          align: "center"
        },
        {
          text: "ค่าใช้จ่าย",
          value: "fixcost_price",
          align: "center"
        },
        {
          text: "จัดการ",
          align: "center",
          sortable: false
        }
      ],
      headersaddit: [
        {
          text: "#",
          align: "center",
          sortable: false
        },

        {
          text: "รายการ",
          value: "branch_addit_title",
          align: "center"
        },
        {
          text: "วันที่",
          align: "center",
          value: "branch_addit_date"
        },
        {
          text: "ค่าใช้จ่าย",
          value: "branch_addit_price",
          align: "center"
        },
        {
          text: "จัดการ",
          align: "center",
          sortable: false
        }
      ],
      dessertsfixcost: [],
      dessertsaddit: [],
      fixcostTotal: [],
      additTotal: [],
      selectedDatafixcost: { id: "", name: "" },
      selectedDataaddit: { id: "", name: "" },
      branchData: "",
      pagination: {
        descending: true,
        sortBy: "branch_addit_date"
      }
    };
  },
  methods: {
    getAllData: function() {
      let apiURL = "http://178.128.80.240:3030/branch/";
      let getID = this.$route.params.branchID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.branchData = response.data.data));
    },
    getDatafixcost: function() {
      let apiURL = "http://178.128.80.240:3030/branchcost/fixcost/";
      let getID = this.$route.params.branchID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(
          response => (
            (this.dessertsfixcost = response.data.data),
            (this.fixcostTotal = response.data),
            (this.loading = false),
            (this.nodata = "ไม่มีข้อมูล")
          )
        );
    },
    getDataaddit: function() {
      let apiURL = "http://178.128.80.240:3030/branchcost/addit/";
      let getID = this.$route.params.branchID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(
          response => (
            (this.dessertsaddit = response.data.data),
            (this.additTotal = response.data),
            (this.loading2 = false),
            (this.nodata2 = "ไม่มีข้อมูล")
          )
        );
    },
    addfixcostButton: function() {
      this.$router.push({
        name: "branchcostAdd",
        params: { branchID: this.$route.params.branchID }
      });
    },
    addAdditButton: function() {
      this.$router.push({
        name: "branchadditAdd",
        params: { branchID: this.$route.params.branchID }
      });
    },
    deleteDatafixcost: function() {
      this.axios
        .post(
          "http://178.128.80.240:3030/fixcost/delete",
          this.selectedDatafixcost,
          { headers: { Authorization: `${localStorage.tokenkey}` } }
        )
        .then(response => {
          (this.loading = true), (this.nodata = "กำลังโหลด..");
          console.log("ok2");
          Swal.fire({
            title: "ลบข้อมูล " + this.selectedDatafixcost.name + " เรียบร้อย",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          }).then(result => {
            console.log("ok3");
            this.getDatafixcost();
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
    deleteDataaddit: function() {
      this.axios
        .post(
          "http://178.128.80.240:3030/branchaddit/delete",
          this.selectedDataaddit,
          { headers: { Authorization: `${localStorage.tokenkey}` } }
        )
        .then(response => {
          (this.loading2 = true), (this.nodata2 = "กำลังโหลด..");
          console.log("ok2");
          Swal.fire({
            title: "ลบข้อมูล " + this.selectedDataaddit.name + " เรียบร้อย",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          }).then(result => {
            console.log("ok3");
            this.getDataaddit();
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
    dialogDelfixcost: function() {
      Swal.fire({
        title: "ยืนยันการลบข้อมูล?",
        text: "ต้องการลบข้อมูล " + this.selectedDatafixcost.name + " หรือไม่?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F56C6C",

        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน"
      }).then(result => {
        if (result.value) {
          this.deleteDatafixcost();
          console.log("ok1");
        }
      });
    },
    dialogDeladdit: function() {
      Swal.fire({
        title: "ยืนยันการลบข้อมูล?",
        text: "ต้องการลบข้อมูล " + this.selectedDataaddit.name + " หรือไม่?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F56C6C",

        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน"
      }).then(result => {
        if (result.value) {
          this.deleteDataaddit();
          console.log("ok1");
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
