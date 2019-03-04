<template>
  <div>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/position">จัดการตำแหน่ง</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{positionData.position_name}}</li>
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
              <p style="text-align: right;">ชื่อตำแหน่ง :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{positionData.position_name}}</p>
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
          <el-form-item label="ชื่อตำแหน่ง :" prop="position_name">
            <el-input v-model="ruleForm.position_name"></el-input>
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
      positionData: [],
      ruleForm: {
        id: "",
        position_name: ""
      },
      rules: {
        position_name: [
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
      this.ruleForm.id = this.$route.params.positionID;
      this.ruleForm.position_name = this.positionData.position_name;
    },
    getAllData: function() {
      let apiURL = "http://178.128.80.240:3030/position/";
      let getID = this.$route.params.positionID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.positionData = response.data.data));
      // .catch(response => {
      //   Swal.fire({
      //     type: "warning",
      //     title: "เซสชั่นหมดอายุแล้ว",
      //     text: "กรุณาเข้าสู่ระบบใหม่",
      //     showConfirmButton: true
      //   });
      //   localStorage.clear();
      //   this.$store.state.getApiData.tokenkey = null;
      // })
    },
    saveData: function() {
      let apiURL = "http://178.128.80.240:3030/position/update";
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
            this.$router.push("/position");
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
