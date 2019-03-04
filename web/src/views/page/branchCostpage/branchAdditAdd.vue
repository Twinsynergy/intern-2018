<template>
  <div>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/branch">จัดการสาขา</router-link>
        </li>
        <li class="breadcrumb-item">
          <font color="#409EFF">
            <a @click="backtoCost">ค่าใช้จ่ายของสาขา {{branchData.branch_name}}</a>
          </font>
        </li>
        <li class="breadcrumb-item active" aria-current="page">เพิ่มข้อมูลค่าใช้จ่ายอื่นๆ</li>
      </ol>
    </div>
    <br>

    <div class="alert alert-light">
      <v-card-title primary>
        <h1>เพิ่มข้อมูลค่าใช้จ่ายอื่นๆ</h1>
        <v-spacer></v-spacer>
        <!-- <div>
          <div>
            <v-btn
              color="primary"
              fab
              small
              outline
              dark
              @click="submitForm('ruleForm'),ruleForm.branch_addit_branch_id = $route.params.branchID"
            >
              <v-icon>save</v-icon>
            </v-btn>
            <span class="text-sm">บันทึก</span>
          </div>
        </div>-->
      </v-card-title>
      <div class="container">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="รายการ" prop="branch_addit_title">
            <el-input v-model="ruleForm.branch_addit_title"></el-input>
          </el-form-item>
          <el-form-item label="ค่าใช้จ่าย" prop="branch_addit_price">
            <el-input v-model.number="ruleForm.branch_addit_price">
              <template slot="append">บาท</template>
            </el-input>
          </el-form-item>
          <el-form-item label="วันที่จ่าย" required>
            <el-form-item prop="branch_addit_date">
              <el-date-picker
                type="date"
                placeholder="เลือกวันที่"
                value-format="timestamp"
                format="dd MMMM yyyy"
                v-model="ruleForm.branch_addit_date"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
          <!-- <el-form-item label="หมายเหตุ" prop="fixcost_note">
            <el-input type="textarea" v-model="ruleForm.fixcost_note"></el-input>
          </el-form-item>-->
          <div>
            <div class="text-xs-right">
              <br>
              <v-btn
                color="primary"
                round
                outline
                dark
                @click="submitForm('ruleForm'),ruleForm.branch_addit_branch_id = $route.params.branchID"
              >
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
  mounted() {
    this.getAllData();
  },
  data() {
    return {
      branchData: "",
      ruleForm: {
        branch_addit_title: "",
        branch_addit_price: "",
        branch_addit_date: "",
        // fixcost_note: "",
        branch_addit_branch_id: ""
      },
      rules: {
        branch_addit_title: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        branch_addit_price: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" },
          { type: "number", message: "กรอกข้อมูลเป็นตัวเลขเท่านั้น" }
        ],
        branch_addit_date: [
          {
            required: true,
            message: "โปรดเลือกวันที่",
            trigger: "change"
          }
        ]
        // fixcost_note: [
        //   { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        // ]
      }
    };
  },
  methods: {
    backtoCost: function() {
      this.$router.push("/branch/cost/" + this.$route.params.branchID);
    },
    getAllData: function() {
      let apiURL = "http://api:3030/branch/";
      let getID = this.$route.params.branchID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.branchData = response.data.data));
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
    },
    saveData: function() {
      let apiURL = "http://api:3030/branchaddit/create";
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
            this.$router.push("/branch/cost/" + this.$route.params.branchID);
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
.text-link {
  color: #409eff;
}
h1,
h4 {
  text-align: left;
}
td {
  text-align: left;
}
</style>
