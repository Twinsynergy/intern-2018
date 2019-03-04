<template>
  <div>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/project">จัดการโปรเจค</router-link>
        </li>
        <li class="breadcrumb-item">
          <font color="#409EFF">
            <a @click="back">โปรเจค {{projectData.project_name}}</a>
          </font>
        </li>
        <li class="breadcrumb-item">
          <font color="#409EFF">
            <a @click="backTeam">ทีม {{projectData.project_team_name}}</a>
          </font>
        </li>
        <li class="breadcrumb-item active" aria-current="page">เพิ่มพนักงานเข้าทีม</li>
      </ol>
    </div>
    <br>
    <div class="alert alert-light">
      <v-card-title primary>
        <h3>เพิ่มพนักงานเข้าทีม {{projectData.project_team_name}} ของโปรเจค {{projectData.project_name}}</h3>

        <v-spacer></v-spacer>
      </v-card-title>

      <div class="container">
        <el-steps :space="200" :active="active" simple>
          <el-step title="เลือกตำแหน่ง" icon="el-icon-document"></el-step>
          <el-step title="ระยะเวลาดำเนินงาน" icon="el-icon-date"></el-step>
          <el-step title="เลือกพนักงาน" icon="el-icon-circle-plus-outline"></el-step>
        </el-steps>
        <br>

        <div class="container">
          <div v-show="active == 0">
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
            </el-form>
          </div>

          <div v-show="active == 1">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="teamData"
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-form-item label="วันเริ่ม :" prop="emp_start_date">
                <el-date-picker
                  type="date"
                  placeholder="เลือกวันที่เริ่ม"
                  v-model="ruleForm.emp_start_date"
                  value-format="timestamp"
                  format="dd MMMM yyyy"
                  style="width: 100%;"
                >></el-date-picker>
              </el-form-item>

              <el-form-item label="วันสิ้นสุด :" prop="emp_end_date">
                <el-date-picker
                  type="date"
                  placeholder="เลือกวันที่สิ้นสุด"
                  value-format="timestamp"
                  format="dd MMMM yyyy"
                  v-model="ruleForm.emp_end_date"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-form>
            <span class="text-xs-right">
              <h6>
                <font
                  color="gray"
                >*ระยะเวลาดำเนินงานของโปรเจคนี้ เริ่มต้นที่ {{timeData1| moment("DD MMMM YYYY")}} สิ้นสุดที่ {{timeData2| moment("DD MMMM YYYY")}}</font>
              </h6>
            </span>
          </div>
          <div v-show="active == 2">
            <v-card-title primary>
              <h5>
                <span class="text-xs-center">พนักงานทั้งหมดของตำแหน่ง {{position.position_name}}</span>
              </h5>
            </v-card-title>

            <div class="container">
              <div v-if="empData.length == 0 ">
                <h3>{{nodata}}</h3>
              </div>
              <div v-else></div>

              <br>

              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                class="demo-ruleForm text-xs-left"
              >
                <el-form-item prop="emp_id">
                  <el-radio-group v-model="ruleForm.emp_id">
                    <span style="margin-top: 20px" v-for="item in empData " :key="item.id">
                      <el-radio-button
                        v-if="item.freetime == 'ไม่ว่าง'"
                        border
                        :label="item.emp_id"
                        style="margin-right: 20px; "
                        disabled
                      >
                        <h1 class="text-xs-center">
                          <v-icon>face</v-icon>
                        </h1>
                        <h4>{{item.emp_nickname}}</h4>
                        <h6>( {{item.emp_name}} )</h6>
                        <br>
                        <v-chip
                          v-if="item.freetime === 'ว่าง'"
                          color="green"
                          text-color="white"
                        >สถานะ : {{item.freetime}}อยู่</v-chip>
                        <v-chip v-else color="red" text-color="white">สถานะ : {{item.freetime}}</v-chip>
                      </el-radio-button>
                      <el-radio-button
                        v-else
                        border
                        :label="item.emp_id"
                        style="margin-right: 20px; "
                      >
                        <h1 class="text-xs-center">
                          <v-icon>face</v-icon>
                        </h1>
                        <h4>{{item.emp_nickname}}</h4>
                        <h6>( {{item.emp_name}} )</h6>
                        <br>
                        <v-chip
                          v-if="item.freetime === 'ว่าง'"
                          color="green"
                          text-color="white"
                        >สถานะ : {{item.freetime}}อยู่</v-chip>
                        <v-chip v-else color="red" text-color="white">สถานะ : {{item.freetime}}</v-chip>
                      </el-radio-button>
                    </span>
                  </el-radio-group>
                </el-form-item>
                <!-- <div>
                    <div class="text-xs-right">
                      <br>
                      <v-btn
                        color="primary"
                        round
                        outline
                        dark
                        @click="submitForm('ruleForm'),ruleForm.position_id = position.id"
                      >
                        <span>บันทึก</span>
                      </v-btn>
                    </div>
                </div>-->
              </el-form>
            </div>
          </div>
        </div>
        <v-container fluid grid-list-xl>
          <v-layout row justify-space-between>
            <v-flex xs2>
              <v-btn
                v-show="active > 0 && active < 3"
                color="primary"
                round
                flat
                dark
                @click="backStep"
              >
                <v-icon>keyboard_arrow_left</v-icon>
                <span>ย้อนกลับ</span>
              </v-btn>
            </v-flex>
            <v-flex xs2></v-flex>
            <v-flex xs2>
              <v-btn
                v-show="active == 0"
                color="primary"
                round
                flat
                @click="nextStep"
                :disabled="!ruleForm.position_id"
              >
                <span>ถัดไป</span>
                <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>

              <div v-show="active == 1">
                <v-btn v-if="!ruleForm.emp_end_date" color="primary" round flat disabled>
                  <span>ถัดไป</span>
                  <v-icon>keyboard_arrow_right</v-icon>
                </v-btn>
                <v-btn v-else-if="!ruleForm.emp_start_date" color="primary" round flat disabled>
                  <span>ถัดไป</span>
                  <v-icon>keyboard_arrow_right</v-icon>
                </v-btn>
                <v-btn v-else color="primary" round flat @click="submitForm('ruleForm')">
                  <span>ถัดไป</span>
                  <v-icon>keyboard_arrow_right</v-icon>
                </v-btn>
              </div>
              <v-btn
                v-show="active == 2"
                color="primary"
                round
                outline
                @click="submitSelectForm('ruleForm')"
                :disabled="ruleForm.emp_id == 0"
              >
                <span>บันทึก</span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </div>
    <!-- id โปรเจค: {{ruleForm.project_id}}
    <br>
    id ตำแหน่ง : {{ruleForm.position_id}}
    <br>
    วันเริ่ม: {{ruleForm.emp_start_date}}
    <br>
    วันสิ้นสุด: {{ruleForm.emp_end_date}}
    <br>
    id พนักงาน: {{ruleForm.emp_id}}
    <br>
    {{timeData1}}
    <br>-->
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
      selectedValue: new Date(),
      nodata: "กำลังโหลด..",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date(this.timeData1);
          //return ;
        }
      },
      pickerOptions1: {
        disabledDate(time2) {
          return time2.getTime() > +this.timeData2;
        }
      },
      timeData1: "",
      timeData2: "",
      empData: "",
      active: 0,
      projectData: "",
      positionData: "",
      position: "",
      ruleForm: {
        project_id: this.$route.params.projectID,
        position_id: "",
        emp_start_date: "",
        emp_end_date: "",
        emp_id: "0"
      },
      rules: {
        position_id: [
          {
            required: true,
            message: "โปรดเลือกตำแหน่ง",
            trigger: "change"
          }
        ],
        emp_start_date: [
          { required: true, message: "โปรดเลือกวันที่", trigger: "blur" }
        ],
        emp_end_date: [
          { required: true, message: "โปรดเลือกวันที่", trigger: "blur" }
        ],
        emp_id: [
          {
            required: true,
            message: "โปรดเลือกพนักงาน",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    nextStep() {
      if (this.active++ > 2) this.active = 0;
    },
    backStep() {
      if (this.active-- > 2) this.active = 2;
      this.ruleForm.emp_id = 0;
    },
    setTime: function() {
      this.timeData2 = this.projectData.project_end_date;
      this.timeData1 = this.projectData.project_start_date;
    },
    back: function() {
      this.$router.push("/project/detail/" + this.$route.params.projectID);
    },
    backTeam: function() {
      this.$router.push("/project/detail/team/" + this.$route.params.projectID);
    },
    getpositionData: function() {
      axios
        .get("http://api:3030/position/datatable", {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.positionData = response.data.data));
    },
    getMandayData: function() {
      let apiURL = "http://api:3030/manday/project/";
      let getID = this.$route.params.projectID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => console.log("okk"));
    },
    getPostition: function() {
      let apiURL = "http://api:3030/position/";
      let getID = this.ruleForm.position_id;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.position = response.data.data));
    },
    getAllData: function() {
      let apiURL = "http://api:3030/projectmanage/";
      let getID = this.$route.params.projectID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(
          response => ((this.projectData = response.data.data), this.setTime())
        )
        .catch(err => {
          console.log(err.response.status);
          if (err.response.status == 401) {
            Swal.fire({
              type: "warning",
              title: "เซสชั่นหมดอายุแล้ว",
              text: "กรุณาเข้าสู่ระบบใหม่",
              showConfirmButton: true
            });
            localStorage.clear();
            this.$store.state.getApiData.tokenkey = null;
          }
          if ((err.response.status == 404) | (err.response.status == 400)) {
            Swal.fire({
              type: "warning",
              title: "ไม่พบข้อมูล",
              showConfirmButton: true
            }).then(result => {
              console.log("ok3");
            });
          }
        });
    },

    submitSelectForm(formName) {
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
              this.saveSelectData();
            }
          });
        } else {
          return false;
        }
      });
    },
    saveSelectData: function() {
      let apiURL = "http://api:3030/m/team/create";
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
            this.backTeam();
            this.getMandayData();
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
          this.saveData();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    saveData: function() {
      let apiURL = "http://api:3030/freetime/emp/";
      let pojectID = this.$route.params.projectID;
      let positionID = this.ruleForm.position_id;
      this.axios
        .post(apiURL + pojectID + "/" + positionID, this.ruleForm, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => {
          this.empData = response.data.data;
          console.log(response);
          console.log("ok3");
          this.active = 2;
          this.getPostition();
          this.nodata = "ไม่มีพนักงานในตำแหน่งนี้";
        })
        .catch(err => {
          if (err.response.status == 402) {
            Swal.fire({
              type: "warning",
              text: "โปรดเลือกวันที่ภายในระยะเวลาของโปรเจค",
              showConfirmButton: true
            }).then(result => {
              console.log("ok3");
            });
          } else if (err.response.status == 403) {
            Swal.fire({
              type: "warning",
              title: "โปรดเลือกระยะเวลาให้ถูกต้อง",
              showConfirmButton: true
            }).then(result => {
              console.log("ok3");
            });
          } else {
            Swal.fire({
              type: "error",
              title: "เกิดข้อผิดพลาด",
              showConfirmButton: false,
              timer: 1500
            });
            console.log(err);
          }
          if (err.response.status == 400) {
            this.active = 2;
            this.nodata = "ไม่มีพนักงานในตำแหน่งนี้";
          }
        });
    }
  }
};
</script>

<style scoped>
</style>
