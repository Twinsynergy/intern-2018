<template>
  <div>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/project">จัดการโปรเจค</router-link>
        </li>
        <li class="breadcrumb-item">
          <font color="#409EFF">
            <a @click="back">โปรเจค {{projectData.project_name}}</a>
          </font>
        </li>
        <li class="breadcrumb-item active" aria-current="page">ทีม {{projectData.project_team_name}}</li>
      </ol>
    </div>
    <br>
    <div class="row">
      <div class="col-sm-12">
        <div class="alert alert-light">
          <v-card-title primary>
            <h3>สมาชิกในทีม {{projectData.project_team_name}} ของโปรเจค {{projectData.project_name}}</h3>
            <v-spacer></v-spacer>
            <div>
              <v-btn small fab outline color="blue" @click="addButton();">
                <v-icon>add</v-icon>
              </v-btn>
              <span class="text-sm">เพิ่ม</span>
            </div>
          </v-card-title>
          <br>
          <v-data-table
            :headers="headers"
            :pagination.sync="pagination"
            :items="projectTeamData"
            hide-actions
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-left" width="200">
                <b>
                  <v-icon>business_center</v-icon>
                  {{ props.item.position_id.position_name }}
                </b>
              </td>
              <td class="text-xs-left">
                <v-icon>face</v-icon>
                {{ props.item.emp_id.emp_nickname }}
              </td>
              <td v-if="props.item.emp_start_date === 0" class="text-xs-left">
                <font color="red">
                  <v-icon color="red">report_problem</v-icon>ยังไม่ได้เลือกเวลาดำเนินการ
                </font>
              </td>
              <td v-else class="text-xs-left">
                <v-icon>date_range</v-icon>
                {{props.item.emp_start_date | moment("DD MMMM YYYY")}} - {{props.item.emp_end_date | moment("DD MMMM YYYY")}}
              </td>
              <td>
                <v-chip
                  color="primary"
                  text-color="white"
                  small
                >{{props.item.updatedAt | moment("from", "now")}}</v-chip>
              </td>

              <td class="text-xs">
                <v-btn
                  flat
                  icon
                  color="primary"
                  v-bind:to="{name: 'ProjectSprint', params: {teamID: props.item.id}}"
                >
                  <v-icon>edit</v-icon>
                </v-btn>

                <v-btn
                  flat
                  icon
                  color="red"
                  @click="(selectedData.id = props.item.id,selectedData.name = props.item.emp_id.emp_nickname),dialogDel() "
                >
                  <v-icon>delete</v-icon>
                </v-btn>
              </td>
            </template>

            <template
              slot="pageText"
              slot-scope="props"
            >แสดง {{ props.pageStart }} - {{ props.pageStop }} จาก {{ props.itemsLength }}</template>
            <template slot="no-data">
              <br>
              <span>
                <h4>{{nodataTeam}}</h4>
              </span>
              <br>
            </template>
          </v-data-table>
        </div>
      </div>

      <!-- <div class="col-sm-4">
        <div class="alert alert-light">
          <v-card-title primary>
            <h3>ตำแหน่งทั้งหมด</h3>
            <v-spacer></v-spacer>
          </v-card-title>
          <br>
          <div class="container-fluid">
            <v-data-table hide-headers hide-actions :items="desserts">
              <template slot="items" slot-scope="props">

                <td class="text-xs-left" width="400">
                  <v-icon>business_center</v-icon>
                  ตำแหน่ง {{ props.item.position_name }}
                </td>
                <td class="text-xs-center"></td>

                <td class="text-xs">
                  <v-btn
                    flat
                    icon
                    color="primary"
                    v-bind:to="{name: 'ProjectPositionTeamManage', params: {positionID: props.item.id,projectID: $route.params.projectID }}"
                  >
                    <v-icon>subject</v-icon>
                  </v-btn>
                </td>
              </template>
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
      </div>-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getData();
    this.getAllData();
    this.getTeamData();
  },
  data() {
    return {
      ruleForm: {
        id: "",
        emp_start_date: "",
        emp_end_date: ""
      },
      rules: {
        emp_start_date: [
          {
            type: "date",
            required: true,
            message: "โปรดเลือกวันที่",
            trigger: "change"
          }
        ],
        emp_end_date: [
          {
            type: "date",
            required: true,
            message: "โปรดเลือกวันที่",
            trigger: "change"
          }
        ]
      },
      dialog: false,
      nodata: "กำลังโหลด..",
      nodataTeam: "กำลังโหลด..",
      desserts: [],
      projectData: "",
      projectTeamData: [],
      pagination: {
        rowsPerPage: 99999999999999,
        descending: true,
        sortBy: "position_id.position_name"
      },
      headers: [
        {
          text: "ตำแหน่ง",
          align: "center",
          sortable: false
        },
        {
          text: "สมาชิก",
          align: "center",
          sortable: false
        },
        {
          text: "ระยะเวลาดำเนินการ",
          align: "center",
          sortable: false
        },
        {
          text: "",

          align: "center",
          sortable: false
        },
        {
          text: "จัดการ",

          align: "center",
          sortable: false
        }
      ],
      selectedData: { id: "", name: "" }
    };
  },
  methods: {
    addButton: function() {
      this.$router.push({
        name: "projectEmpAdd",
        params: { projectID: this.$route.params.projectID }
      });
    },
    back: function() {
      this.$router.push("/project/detail/" + this.$route.params.projectID);
    },
    getData: function() {
      axios
        .get("http://35.198.219.154:1337/position/datatable", {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(
          response => (
            (this.desserts = response.data.data), (this.nodata = "ไม่มีข้อมูล")
          )
        );
    },
    getAllData: function() {
      let apiURL = "http://35.198.219.154:1337/projectmanage/";
      let getID = this.$route.params.projectID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.projectData = response.data.data));
    },
    getTeamData: function() {
      let apiURL = "http://35.198.219.154:1337/project/team/";
      let getID = this.$route.params.projectID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(
          response => (
            (this.projectTeamData = response.data.data),
            (this.nodataTeam = "ยังไม่มีสมาชิกในทีม")
          )
        );
    },
    deleteData: function() {
      this.axios
        .post("http://35.198.219.154:1337/team/delete", this.selectedData, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => {
          this.nodataTeam = "กำลังโหลด..";
          console.log("ok2");
          Swal.fire({
            title: "ลบข้อมูล " + this.selectedData.name + " เรียบร้อย",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          }).then(result => {
            console.log("ok3");
            this.getTeamData();
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
    },
    clear(formName) {
      this.$refs[formName].resetFields();
      console.log("cleared");
    },
    saveData: function() {
      let apiURL = "http://35.198.219.154:1337/team/update";
      this.axios
        .post(apiURL, this.ruleForm, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => {
          this.getTeamData();
          this.clear("ruleForm");
          Swal.fire({
            title: "เพิ่มข้อมูลเรียบร้อย",
            type: "success",
            showConfirmButton: false,
            timer: 1000
          }).then(result => {
            console.log("ok3");
            // this.$router.push("/project");
            this.getTeamData();
          });

          console.log("ok2");
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          {
            console.log("ok1");
            this.dialogVisible = false;
            this.saveData();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
