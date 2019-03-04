<template>
  <div>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/branch">จัดการสาขา</router-link>
        </li>
        <li class="breadcrumb-item">
          <font color="#409EFF">
            <a @click="backtoCost">ค่าใช้จ่ายของสาขา {{name.branch_name}}</a>
          </font>
        </li>
        <li
          class="breadcrumb-item active"
          aria-current="page"
        >รายการจ่ายค่า{{branchData.branch_addit_title}}</li>
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
              <p style="text-align: right;">รายการ :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{branchData.branch_addit_title}}</p>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">ค่าใช้จ่าย :</p>
            </el-col>
            <el-col :span="14">
              <p
                style="text-align: left;"
              >{{Number(branchData.branch_addit_price).toLocaleString()}} บาท</p>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">วันที่จ่าย :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{branchData.branch_addit_date | moment("DD MMMM YYYY")}}</p>
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
          <el-form-item label="รายการ :" prop="branch_addit_title">
            <el-input v-model="ruleForm.branch_addit_title"></el-input>
          </el-form-item>
          <el-form-item label="ค่าใช้จ่าย" prop="branch_addit_price">
            <el-input v-model.number="ruleForm.branch_addit_price">
              <template slot="append">บาท</template>
            </el-input>
          </el-form-item>
          <el-form-item label="วันที่จ่าย">
            <el-form-item prop="branch_addit_date">
              <el-date-picker
                type="date"
                clear-icon="no"
                placeholder="เลือกวันที่"
                value-format="timestamp"
                format="dd MMMM yyyy"
                v-model="ruleForm.branch_addit_date"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
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
      name: [],
      ruleForm: {
        id: "",
        branch_addit_title: "",
        branch_addit_price: "",
        branch_addit_date: ""
      },
      rules: {
        branch_addit_title: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        branch_addit_date: [
          {
            required: true,
            message: "โปรดเลือกวันที่",
            trigger: "blur"
          }
        ],
        branch_addit_price: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" },
          { type: "number", message: "กรอกข้อมูลเป็นตัวเลขเท่านั้น" }
        ]
      }
    };
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    backtoCost: function() {
      this.$router.go(-1);
    },
    dataToForm: function() {
      this.ruleForm.id = this.$route.params.AdditID;
      this.ruleForm.branch_addit_title = this.branchData.branch_addit_title;
      this.ruleForm.branch_addit_price = this.branchData.branch_addit_price;
      this.ruleForm.branch_addit_date = this.branchData.branch_addit_date;
    },
    getAllData: function() {
      let apiURL = "http://35.198.219.154:1337/branchaddit/";
      let getID = this.$route.params.AdditID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(
          response => (
            (this.branchData = response.data.data),
            (this.name = response.data.data.branch_addit_branch_id)
          )
        );
    },
    saveData: function() {
      let apiURL = "http://35.198.219.154:1337/branchaddit/update";
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
            // this.$router.push("/branch");
            this.$router.go(-1);
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
