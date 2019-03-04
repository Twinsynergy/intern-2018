<template>
  <div>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/emp">จัดการพนักงาน</router-link>
        </li>
        <li class="breadcrumb-item">
          <font color="#409EFF">
            <a @click="back">สิทธิประโยชน์ของ {{name.emp_name}}</a>
          </font>
        </li>
        <li
          class="breadcrumb-item active"
          aria-current="page"
        >รายการจ่ายค่า {{benefitData.benefit_title}}</li>
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
              <p style="text-align: left;">{{benefitData.benefit_title}}</p>
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
              >{{Number(benefitData.benefit_price).toLocaleString()}} บาท</p>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">วันที่จ่าย :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{benefitData.benefit_date | moment("DD MMMM YYYY")}}</p>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">หมายเหตุ :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{benefitData.benefit_note}}</p>
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
          <el-form-item label="รายการ :" prop="benefit_title">
            <el-input v-model="ruleForm.benefit_title"></el-input>
          </el-form-item>
          <el-form-item label="ค่าใช้จ่าย" prop="benefit_price">
            <el-input v-model.number="ruleForm.benefit_price">
              <template slot="append">บาท</template>
            </el-input>
          </el-form-item>
          <el-form-item label="วันที่จ่าย" required>
            <el-form-item prop="benefit_date">
              <el-date-picker
                type="date"
                placeholder="เลือกวันที่"
                value-format="timestamp"
                format="dd MMMM yyyy"
                v-model="ruleForm.benefit_date"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="หมายเหตุ :" prop="benefit_note">
            <el-input type="textarea" v-model="ruleForm.benefit_note"></el-input>
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
      benefitData: [],
      name: [],
      ruleForm: {
        id: "",
        benefit_title: "",
        benefit_price: "",
        benefit_note: "",
        benefit_date: ""
      },
      rules: {
        benefit_title: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        benefit_price: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" },
          { type: "number", message: "กรอกข้อมูลเป็นตัวเลขเท่านั้น" }
        ],
        benefit_date: [
          { required: true, message: "โปรดเลือกวันที่", trigger: "blur" }
        ],
        benefit_note: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    back: function() {
      this.$router.go(-1);
    },
    dataToForm: function() {
      this.ruleForm.id = this.benefitData.id;
      this.ruleForm.benefit_title = this.benefitData.benefit_title;
      this.ruleForm.benefit_price = this.benefitData.benefit_price;
      this.ruleForm.benefit_date = this.benefitData.benefit_date;
      this.ruleForm.benefit_note = this.benefitData.benefit_note;
    },
    getAllData: function() {
      let apiURL = "http://api:3030/benefit/";
      let getID = this.$route.params.BenefitID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(
          response => (
            (this.benefitData = response.data.data),
            (this.name = response.data.data.benefit_emp_id)
          )
        );
    },
    saveData: function() {
      let apiURL = "http://api:3030/benefit/update";
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
            // this.$router.push("/benefit");
            this.$router.go(-1);
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
