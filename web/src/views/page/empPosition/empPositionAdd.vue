<template>
  <div>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/emp">จัดการพนักงาน</router-link>
        </li>
        <li class="breadcrumb-item">
          <font color="#409EFF">
            <a @click="backToPosition">ตำแหน่งทั้งหมดของ {{empData.emp_name}}</a>
          </font>
        </li>
        <li class="breadcrumb-item active" aria-current="page">เพิ่มตำแหน่งของ {{empData.emp_name}}</li>
      </ol>
    </div>
    <br>

    <div class="alert alert-light">
      <v-card-title primary>
        <h1>เพิ่มตำแหน่งของ {{empData.emp_name}}</h1>
        <v-spacer></v-spacer>
        <!-- <div>
          <div>
            <v-btn
              color="primary"
              fab
              small
              outline
              dark
              @click="submitForm('ruleForm'),ruleForm.emp_id = $route.params.empID"
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
          <el-form-item label="ตำแหน่ง" prop="position_id">
            <el-select
              v-model="ruleForm.position_id"
              placeholder="เลือกตำแหน่ง"
              style="width: 100%;"
            >
              <el-option
                v-for="item in positionData"
                :key="item.id"
                :label="item.position_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div>
            <div class="text-xs-right">
              <br>
              <v-btn color="primary" round outline dark @click="submitForm('ruleForm'),ruleForm.emp_id = $route.params.empID">
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
    this.getpositionData();
  },
  data() {
    return {
      empData: "",
      positionData: "",
      ruleForm: {
        emp_id: "",
        position_id: ""
      },
      rules: {
        position_id: [
          {
            required: true,
            message: "โปรดเลือกตำแหน่ง",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    getpositionData: function() {
      axios
        .get("http://178.128.80.240:3030/position/datatable", {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.positionData = response.data.data));
    },
    backToPosition: function() {
      this.$router.push("/emp/position/" + this.$route.params.empID);
    },
    getAllData: function() {
      let apiURL = "http://178.128.80.240:3030/emp/";
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
      let apiURL = "http://178.128.80.240:3030/positionemp/create";
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
            this.$router.push("/emp/position/" + this.$route.params.empID);
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
