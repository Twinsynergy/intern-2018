<template>
  <div>
    <div>
      <div aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/emp">จัดการพนักงาน</router-link>
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
            <el-form-item label="ชื่อ - นามสกุล" prop="emp_name">
              <el-input v-model="ruleForm.emp_name"></el-input>
            </el-form-item>
            <el-form-item label="ชื่อเล่น" prop="emp_nickname">
              <el-input v-model="ruleForm.emp_nickname"></el-input>
            </el-form-item>
            <el-form-item label="ที่อยู่" prop="emp_address">
              <el-input type="textarea" v-model="ruleForm.emp_address"></el-input>
            </el-form-item>
            <el-form-item label="เบอร์โทรติดต่อ" prop="emp_tel">
              <el-input v-mask="'(###) ###-####'" v-model="ruleForm.emp_tel"></el-input>
            </el-form-item>
            <!-- <el-form-item label="ตำแหน่ง" prop="emp_position">
              <el-select
                v-model="ruleForm.emp_position"
                multiple
                placeholder="เลือกตำแหน่ง"
                style="width: 100%;"
              >
                <el-option label="Zone one" value="shanghai"></el-option>
                <el-option label="Zone two" value="beijing"></el-option>
              </el-select>
            </el-form-item>-->
            <el-form-item label="เงินเดือน" prop="emp_salary">
              <el-input v-model.number="ruleForm.emp_salary">
                <template slot="append">บาท</template>
              </el-input>
            </el-form-item>

            <el-form-item label="สาขา" prop="emp_branch_id">
              <el-select
                v-model="ruleForm.emp_branch_id"
                placeholder="เลือกสาขา"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in branchData"
                  :key="item.id"
                  :label="item.branch_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <h4>ผู้ติดต่อฉุกเฉิน</h4>
            <br>
            <el-form-item label="ชื่อ - นามสกุล" prop="emp_emer_con_name">
              <el-input v-model="ruleForm.emp_emer_con_name"></el-input>
            </el-form-item>
            <el-form-item label="เกี่ยวข้องเป็น" prop="emp_emer_con_relation">
              <el-input v-model="ruleForm.emp_emer_con_relation"></el-input>
            </el-form-item>
            <el-form-item label="เบอร์โทรติดต่อ" prop="emp_emer_con_tel">
              <el-input v-mask="'(###) ###-####'" v-model="ruleForm.emp_emer_con_tel"></el-input>
            </el-form-item>
            <el-form-item label="ที่อยู่" prop="emp_emer_con_address">
              <el-input type="textarea" v-model="ruleForm.emp_emer_con_address"></el-input>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getbranchData();
  },
  data() {
    return {
      branchData: "",
      seen: false,
      ruleForm: {
        emp_name: "",
        emp_nickname: "",
        emp_address: "",
        emp_tel: "",
        emp_position: [],
        emp_salary: "",
        emp_branch_id: "",
        emp_emer_con_name: "",
        emp_emer_con_relation: "",
        emp_emer_con_tel: "",
        emp_emer_con_address: ""
      },
      rules: {
        emp_name: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        emp_nickname: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        emp_address: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        emp_tel: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        emp_mail: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],

        emp_position: [
          {
            type: "array",
            required: true,
            message: "โปรดเลือกตำแหน่ง",
            trigger: "change"
          }
        ],
        emp_salary: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" },
          { type: "number", message: "กรอกข้อมูลเป็นตัวเลขเท่านั้น" }
        ],
        emp_branch_id: [
          {
            required: true,
            message: "โปรดเลือกสาขา",
            trigger: "change"
          }
        ],
        emp_emer_con_name: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        emp_emer_con_relation: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        emp_emer_con_tel: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        emp_emer_con_address: [
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
    getbranchData: function() {
      axios
        .get("http://35.198.219.154:1337/branch/datatable", {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.branchData = response.data.data));
    },
    saveData: function() {
      let apiURL = "http://35.198.219.154:1337/emp/create";
      this.axios
        .post(apiURL, this.ruleForm, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => {
          console.log(response);
          console.log("ok2");
          Swal.fire({
            title: "บันทึกข้อมูลเรียบร้อย",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          }).then(result => {
            console.log("ok3");
            this.$router.push("/emp");
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
