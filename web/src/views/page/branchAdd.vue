<template>
  <div>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/branch">จัดการสาขา</router-link>
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
          <el-form-item label="ชื่อสาขา" prop="branch_name">
            <el-input v-model="ruleForm.branch_name"></el-input>
          </el-form-item>

          <el-form-item label="ตำแหน่งที่ตั้ง" prop="branch_address">
            <el-input type="textarea" v-model="ruleForm.branch_address"></el-input>
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
        branch_name: "",
        branch_address: ""
      },
      rules: {
        branch_name: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        branch_address: [
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
      let apiURL = "http://api:3030/branch/create";
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
            this.$router.push("/branch");
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
