<template>
  <div>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/branch">จัดการสาขา</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{branchData.branch_name}}</li>
      </ol>
    </div>
    <br>
    <div class="alert alert-light">
      <v-card-title primary>
        <h1 v-if="editBtnSeen">รายละเอียด</h1>
        <h1 v-if="!editBtnSeen">แก้ไขข้อมูล</h1>
        <v-spacer></v-spacer>
        <div>
          <div>
            <div v-if="editBtnSeen">
              <v-btn
                color="primary"
                fab
                small
                dark
                outline
                @click="editBtnSeen=!editBtnSeen,dataToForm();"
              >
                <v-icon>edit</v-icon>
              </v-btn>
              <span class="text-sm">แก้ไข</span>
            </div>
            <div v-if="!editBtnSeen">
              <!-- <v-btn color="green" fab small dark outline @click="submitForm('ruleForm')">
                <v-icon>save</v-icon>
              </v-btn>
              <span class="text-sm">บันทึก</span>-->
              <v-btn color="red" fab small dark outline @click="cancelForm();">
                <v-icon>clear</v-icon>
              </v-btn>
              <span class="text-sm">ยกเลิก</span>
            </div>
          </div>
        </div>
      </v-card-title>
      <div class="container">
        <div v-if="editBtnSeen">
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">ชื่อสาขา :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{branchData.branch_name}}</p>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">ตำแหน่งที่ตั้ง :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{branchData.branch_address}}</p>
            </el-col>
          </el-row>
        </div>
        <el-form
          v-if="!editBtnSeen"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="ชื่อสาขา :" prop="branch_name">
            <el-input v-model="ruleForm.branch_name"></el-input>
          </el-form-item>

          <el-form-item label="ตำแหน่งที่ตั้ง :" prop="branch_address">
            <el-input type="textarea" v-model="ruleForm.branch_address"></el-input>
          </el-form-item>
          <div v-if="!editBtnSeen">
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
      form: {},
      editBtnSeen: true,
      branchData: [],
      ruleForm: {
        id: "",
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
  mounted() {
    this.getAllData();
  },
  methods: {
    dataToForm: function() {
      this.ruleForm.id = this.$route.params.branchID;
      this.ruleForm.branch_name = this.branchData.branch_name;
      this.ruleForm.branch_address = this.branchData.branch_address;
    },
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
    saveData: function() {
      let apiURL = "http://178.128.80.240:3030/branch/update";
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
    },
    cancelForm: function() {
      Swal.fire({
        title: "ต้องการยกเลิกการเปลี่ยนแปลง?",
        type: "warning",
        showCancelButton: true,

        cancelButtonText: "ไม่",
        confirmButtonText: "ใช่"
      }).then(result => {
        if (result.value) {
          console.log("ok1");
          this.editBtnSeen = true;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
