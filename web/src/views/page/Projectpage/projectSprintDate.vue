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
            <a @click="backSP">ทีม {{projectData.project_team_name}}</a>
          </font>
        </li>
        <li
          class="breadcrumb-item active"
          aria-current="page"
        >ระยะเวลาดำเนินการของ {{teamData.emp_id.emp_name}}</li>
      </ol>
    </div>
    <br>
    <div class="alert alert-light">
      <v-card-title primary>
        <h1>ระยะเวลาดำเนินการของ {{teamData.emp_id.emp_name}}</h1>
        <v-spacer></v-spacer>
      </v-card-title>

      <div v-if="teamData.emp_start_date === 0" class="container">
        <el-form
          :model="form"
          :rules="rules"
          ref="teamData"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="วันเริ่ม :" prop="emp_start_date">
            <el-date-picker
              type="date"
              placeholder="เลือกวันที่เริ่ม"
              v-model="form.emp_start_date"
              value-format="timestamp"
              format="dd MMMM yyyy"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="วันสิ้นสุด :" prop="emp_end_date">
            <el-date-picker
              type="date"
              placeholder="เลือกวันที่สิ้นสุด"
              value-format="timestamp"
              format="dd MMMM yyyy"
              v-model="form.emp_end_date"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form>





            <div>
              <div class="text-xs-right">
                <br>
                <v-btn color="primary" round outline dark @click="submitForm('teamData'),(teamData.emp_start_date = form.emp_start_date,teamData.emp_end_date = form.emp_end_date)">
                  <span>บันทึก</span>
                </v-btn>
              </div>
            </div>

      </div>

      <div v-else class="container">
        <el-form
          :model="teamData"
          :rules="rules"
          ref="teamData"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="วันเริ่ม :" prop="emp_start_date">
            <el-date-picker
              type="date"
              placeholder="เลือกวันที่เริ่ม"
              v-model="teamData.emp_start_date"
              value-format="timestamp"
              format="dd MMMM yyyy"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="วันสิ้นสุด :" prop="emp_end_date">
            <el-date-picker
              type="date"
              placeholder="เลือกวันที่สิ้นสุด"
              value-format="timestamp"
              format="dd MMMM yyyy"
              v-model="teamData.emp_end_date"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
                      <div>
              <div class="text-xs-right">
                <br>
                <v-btn color="primary" round outline dark @click="submitForm('teamData')">
                  <span>บันทึก</span>
                </v-btn>
              </div>
            </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        id: "",
        emp_start_date: "",
        emp_end_date: ""
      },
      teamData: "",
      projectData: "",
      rules: {
        emp_start_date: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        emp_end_date: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getAllData();
    this.getProjectData();
  },
  methods: {
    back: function() {
      this.$router.push("/project/detail/" + this.$route.params.projectID);
    },
    backSP: function() {
      this.$router.push("/project/detail/team/" + this.$route.params.projectID);
    },
    getAllData: function() {
      let apiURL = "http://178.128.80.240:3030/team/";
      let getID = this.$route.params.teamID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.teamData = response.data.data))
       ;
    },
    getProjectData: function() {
      let apiURL = "http://178.128.80.240:3030/projectmanage/";
      let getID = this.$route.params.projectID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.projectData = response.data.data));
    },
    saveData: function() {
      let apiURL = "http://178.128.80.240:3030/team/update";
      this.axios
        .post(apiURL, this.teamData, {
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
            this.$router.push(
              "/project/detail/team/" + this.$route.params.projectID
            );
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          Swal.fire({
            title: "ยืนยันการบันทึกข้อมูล?",
            type: "info",
            showCancelButton: true,

            cancelButtonText: "ยกเลิก",
            confirmButtonText: "บันทึก"
          }).then(result => {
            if (result.value) {
              console.log("ok1");
              this.saveData();
            }
          });
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
