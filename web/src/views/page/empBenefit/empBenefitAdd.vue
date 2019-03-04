<template>
  <div>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/emp">จัดการพนักงาน</router-link>
        </li>
        <li class="breadcrumb-item">
          <font color="#409EFF">
            <a @click="backToBenefit">สิทธิประโยชน์ของ {{empData.emp_name}}</a>
          </font>
        </li>
        <li class="breadcrumb-item active" aria-current="page">เพิ่มข้อมูลสิทธิประโยชน์</li>
      </ol>
    </div>
    <br>

    <div class="alert alert-light">
      <v-card-title primary>
        <h1>เพิ่มข้อมูลสิทธิประโยชน์</h1>
        <v-spacer></v-spacer>
        <!-- <div>
          <div>
            <v-btn
              color="primary"
              fab
              small
              outline
              dark
              @click="submitForm('ruleForm'),ruleForm.benefit_emp_id = $route.params.empID"
            >
              <v-icon>save</v-icon>
            </v-btn>
            <span class="text-sm">บันทึก</span>
          </div>
        </div> -->
      </v-card-title>
      <div class="container">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="รายการ" prop="benefit_title">
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
          <el-form-item label="หมายเหตุ" prop="benefit_note">
            <el-input type="textarea" v-model="ruleForm.benefit_note"></el-input>
          </el-form-item>
          <div>
            <div class="text-xs-right">
              <br>
              <v-btn
                color="primary"
                round
                outline
                dark
                @click="submitForm('ruleForm'),ruleForm.benefit_emp_id = $route.params.empID"
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
      empData: "",
      ruleForm: {
        benefit_title: "",
        benefit_price: "",
        benefit_note: "",
        benefit_emp_id: "",
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
        benefit_note: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        benefit_date: [
          {
            required: true,
            message: "โปรดเลือกวันที่",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    backToBenefit: function() {
      this.$router.push("/emp/Benefit/" + this.$route.params.empID);
    },
    getAllData: function() {
      let apiURL = "http://35.198.219.154:1337/emp/";
      let getID = this.$route.params.empID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.empData = response.data.data));
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
      let apiURL = "http://35.198.219.154:1337/benefit/create";
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
            this.$router.push("/emp/Benefit/" + this.$route.params.empID);
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
