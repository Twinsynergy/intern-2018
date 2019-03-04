<template>
  <div>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/project">จัดการโปรเจค</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">เพิ่มข้อมูลใหม่</li>
      </ol>
    </div>
    <br>

    <div class="alert alert-light">
      <v-card-title primary>
        <h1>เพิ่มข้อมูลใหม่</h1>
        <v-spacer></v-spacer>
      </v-card-title>
      <div class="container">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="ชื่อโปรเจค" prop="project_name">
            <el-input v-model="ruleForm.project_name"></el-input>
          </el-form-item>
          <el-form-item label="ชื่อลูกค้า" prop="project_costomer_name">
            <el-input v-model="ruleForm.project_costomer_name"></el-input>
          </el-form-item>

          <el-form-item label="วันที่ดำเนินการ" required>
            <el-col :span="11">
              <el-form-item prop="project_start_date">
                <el-date-picker
                  type="date"
                  placeholder="เลือกวันที่เริ่มต้น"
                  value-format="timestamp"
                  format="dd MMMM yyyy"
                  v-model="ruleForm.project_start_date"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">ถึง</el-col>
            <el-col :span="11">
              <el-form-item prop="project_end_date">
                <el-date-picker
                  type="date"
                  placeholder="เลือกวันที่สิ้นสุด"
                  value-format="timestamp"
                  format="dd MMMM yyyy"
                  v-model="ruleForm.project_end_date"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="ทีมที่รับผิดชอบ" prop="project_team_name">
            <el-input v-model="ruleForm.project_team_name"></el-input>
          </el-form-item>
          <el-form-item label="กำไรที่ต้องการ" prop="selling">
            <el-input placeholder="คิดเป็นเปอร์เซ็นต์" v-model.number="ruleForm.selling">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="หมายเหตุ" prop="project_note">
            <el-input type="textarea" v-model="ruleForm.project_note"></el-input>
          </el-form-item>
          <div>
            <div class="text-xs-right">
              <br>
              <v-btn color="primary" round outline dark @click="submitForm('ruleForm')">
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
      ruleForm: {
        project_name: "",
        project_costomer_name: "",
        project_start_date: "",
        project_end_date: "",
        project_team_name: "",
        selling: "",
        project_note: ""
      },
      rules: {
        project_name: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        project_costomer_name: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        project_start_date: [
          {
            required: true,
            message: "โปรดเลือกวันที่เริ่มโปรเจค",
            trigger: "change"
          }
        ],
        project_end_date: [
          {
            required: true,
            message: "โปรดเลือกวันที่สิ้นสุดโปรเจค",
            trigger: "change"
          }
        ],
        project_team_name: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        selling: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" },
          { type: "number", message: "กรอกข้อมูลเป็นตัวเลขเท่านั้น" }
        ],
        project_note: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
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
    },
    saveData: function() {
      let apiURL = "http://api:3030/projectmanage/create";
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
            this.$router.push("/project");
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
    }
  }
};
</script>

<style scoped>
h1,
h4 {
  text-align: left;
}
td {
  text-align: left;
}
</style>
