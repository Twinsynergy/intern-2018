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
        <li class="breadcrumb-item">
          <font color="#409EFF">
            <a @click="backTeam">ทีม {{projectData.project_team_name}}</a>
          </font>
        </li>
        <li class="breadcrumb-item active" aria-current="page">ตำแหน่ง {{position.position_name}}</li>
      </ol>
    </div>
    <div class="alert alert-light">
      <v-card-title primary>
        <h1>พนักงานทั้งหมดของตำแหน่ง {{position.position_name}}</h1>
        <v-spacer></v-spacer>
        <div>
          <div>
            <v-btn
              color="primary"
              fab
              small
              outline
              dark
              @click="submitForm('ruleForm'),ruleForm.position_id = position.id"
            >
              <v-icon>save</v-icon>
            </v-btn>
            <span class="text-sm">บันทึก</span>
          </div>
        </div>
      </v-card-title>

      <hr>

      <div class="container">
<div v-if="empData.length == 0 "><h3>ไม่มีพนักงานในตำแหน่งนี้</h3></div>
<div v-else ><h3>เลือกพนักงาน</h3></div>

        
        <br>
        
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm text-xs-left">
          <el-form-item prop="pushdataarray">
            <el-checkbox-group v-model="ruleForm.pushdataarray">
              <span style="margin-top: 20px" v-for="item in empData " :key="item.id">
                <el-checkbox-button border :label="item.emp_id" style="margin-right: 20px; ">
                  <h1>
                    <v-icon>face</v-icon>
                  </h1>
                  <h4>{{item.emp_nickname}}</h4>
                  <h6>( {{item.emp_name}} )</h6>
                  <br>
                  <v-chip
                    v-if="item.freetime === 'ว่าง'"
                    color="green"
                    text-color="white"
                  >สถานะ : {{item.freetime}}อยู่</v-chip>
                  <v-chip v-else color="red" text-color="white">สถานะ : {{item.freetime}}</v-chip>
                </el-checkbox-button>
              </span>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>

      <br>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getData();
    this.getEmpdata();
    this.getAllData();
  },
  data() {
    return {
      loaded: "",
      check: "",
      seen: true,
      nodata: "กำลังโหลด..",
      empData: "",
      position: "",
      ruleForm: {
        pushdataarray: [],
        position_id: "",
        project_id: this.$route.params.projectID
      },

      rules: {
        pushdataarray: [
          {
            type: "array",
            required: true,
            message: "โปรดเลือกพนักงาน",
            trigger: "change"
          }
        ]
      },
      projectData: ""
    };
  },

  methods: {
    back: function() {
      this.$router.push("/project/detail/" + this.$route.params.projectID);
    },
    backTeam: function() {
      this.$router.push("/project/detail/team/" + this.$route.params.projectID);
    },
    getData: function() {
      let apiURL = "http://35.198.219.154:1337/position/";
      let getID = this.$route.params.positionID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.position = response.data.data));
    },
    getEmpdata: function() {
      let apiURL = "http://35.198.219.154:1337/freetime/emp/";
      let Pid = this.$route.params.positionID;
      let getID = this.$route.params.projectID;

      axios
        .get(apiURL + getID + "/" + Pid, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => {
          (this.empData = response.data.data), (this.nodata = "ไม่พบพนักงาน");
        })
        .catch(err => {
          console.log(err);
        });
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
    saveData: function() {
      let apiURL = "http://35.198.219.154:1337/team/create";
      this.axios
        .post(apiURL, this.ruleForm, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => {
          console.log("ok2");
          Swal.fire({
            title: "บันทึกข้อมูลเรียบร้อย",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          }).then(result => {
            console.log("ok3");
            this.backTeam();
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          Swal.fire({
            title: "ยืนยันการบันทึกข้อมูล?",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#67C23A",

            cancelButtonText: "ยกเลิก",
            confirmButtonText: "บันทึก"
          }).then(result => {
            if (result.value) {
              console.log("ok1");
              this.saveData();
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>

