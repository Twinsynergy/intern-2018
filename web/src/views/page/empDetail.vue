<template>
  <div>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/emp">จัดการพนักงาน</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{empData.emp_name}}</li>
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
              <v-btn color="green" fab small dark outline @click="submitForm('ruleForm')">
                <v-icon>save</v-icon>
              </v-btn>
              <span class="text-sm">บันทึก</span>
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
              <p style="text-align: right;">ชื่อ - นามสกุล :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{empData.emp_name}}</p>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">ชื่อเล่น :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{empData.emp_nickname}}</p>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">ที่อยู่ :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{empData.emp_address}}</p>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">เบอร์โทรติดต่อ :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{empData.emp_tel}}</p>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">เงินเดือน :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{Number(empData.emp_salary).toLocaleString()}} บาท</p>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">สาขา :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{branchData.branch_name}}</p>
            </el-col>
          </el-row>
          <br>
          <h4>ผู้ติดต่อฉุกเฉิน</h4>
          <br>
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">ชื่อ - นามสกุล :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{empData.emp_emer_con_name}}</p>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">เกี่ยวข้องเป็น :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{empData.emp_emer_con_relation}}</p>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">เบอร์โทรติดต่อ :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{empData.emp_emer_con_tel}}</p>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">ที่อยู่ :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{empData.emp_emer_con_address}}</p>
            </el-col>
          </el-row>

          <br>
        </div>
        <el-form
          v-if="!editBtnSeen"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="ชื่อ - นามสกุล :" prop="emp_name">
            <el-input v-model="ruleForm.emp_name"></el-input>
          </el-form-item>
          <el-form-item label="ชื่อเล่น :" prop="emp_nickname">
            <el-input v-model="ruleForm.emp_nickname"></el-input>
          </el-form-item>

          <el-form-item label="ที่อยู่ :" prop="emp_address">
            <el-input type="textarea" v-model="ruleForm.emp_address"></el-input>
          </el-form-item>

          <el-form-item label="เบอร์โทรติดต่อ" prop="emp_tel">
            <el-input v-mask="'(###) ###-####'" v-model="ruleForm.emp_tel"></el-input>
          </el-form-item>

          <el-form-item label="เงินเดือน" prop="emp_salary">
            <el-input v-model.number="ruleForm.emp_salary">
              <template slot="append">บาท</template>
            </el-input>
          </el-form-item>
          <el-form-item label="สาขา" prop="emp_branch_id">
            <el-select
              v-model="ruleForm.emp_branch_id"
              :placeholder="branchData.branch_name"
              style="width: 100%;"
            >
              <el-option
                v-for="item in branch"
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
      editBtnSeen: true,
      branchData: [],
      empData: [],
      ruleForm: {
        id: "",
        emp_name: "",
        emp_nickname: "",
        emp_address: "",
        emp_salary: "",
        emp_tel: "",
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
  mounted() {
    this.getAllData();
    this.getbranchData();
  },
  methods: {
    dataToForm: function() {
      this.ruleForm.id = this.$route.params.empID;
      this.ruleForm.emp_name = this.empData.emp_name;
      this.ruleForm.emp_nickname = this.empData.emp_nickname;
      this.ruleForm.emp_address = this.empData.emp_address;
      this.ruleForm.emp_salary = this.empData.emp_salary;
      this.ruleForm.emp_tel = this.empData.emp_tel;
      this.ruleForm.emp_branch_id = this.branchData.id;
      this.ruleForm.emp_emer_con_name = this.empData.emp_emer_con_name;
      this.ruleForm.emp_emer_con_relation = this.empData.emp_emer_con_relation;
      this.ruleForm.emp_emer_con_tel = this.empData.emp_emer_con_tel;
      this.ruleForm.emp_emer_con_address = this.empData.emp_emer_con_address;
    },
    getbranchData: function() {
      axios
        .get("http://35.198.219.154:1337/branch/datatable", {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.branch = response.data.data));
    },
    getAllData: function() {
      let apiURL = "http://35.198.219.154:1337/emp/";
      let getID = this.$route.params.empID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(
          response => (
            (this.empData = response.data.data),
            (this.branchData = response.data.data.emp_branch_id)
          )
        );
    },
    saveData: function() {
      let apiURL = "http://35.198.219.154:1337/emp/update";
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
            this.$router.push("/emp");
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
h1,
h4 {
  text-align: left;
}
</style>
