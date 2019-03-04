<template>
  <div>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/project">จัดการโปรเจค</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{projectData.project_name}}</li>
      </ol>
    </div>
    <br>

    <div class="alert alert-light">
      <v-card-title primary>
        <h1 v-if="editBtnSeen">รายละเอียดโปรเจค</h1>
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
              <p style="text-align: right;">ชื่อโปรเจค :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{projectData.project_name}}</p>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">ชื่อลูกค้า :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{projectData.project_costomer_name}}</p>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">วันที่ดำเนินการ :</p>
            </el-col>
            <el-col :span="14">
              <p
                style="text-align: left;"
              >{{projectData.project_start_date | moment("DD MMMM YYYY") }} ถึง {{projectData.project_end_date | moment("DD MMMM YYYY") }}</p>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">ทีมที่รับผิดชอบ :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{projectData.project_team_name}}</p>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="3">
              <p style="text-align: right;">หมายเหตุ :</p>
            </el-col>
            <el-col :span="14">
              <p style="text-align: left;">{{projectData.project_note}}</p>
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
          <el-form-item label="ชื่อโปรเจค" prop="project_name">
            <el-input v-model="ruleForm.project_name"></el-input>
          </el-form-item>
          <el-form-item label="ชื่อลูกค้า" prop="project_costomer_name">
            <el-input v-model="ruleForm.project_costomer_name"></el-input>
          </el-form-item>

          <el-form-item label="วันที่ดำเนินการ" required>
            <el-col :span="11">
              <el-form-item prop="project_start_date">
                <el-date-picker
                  type="date"
                  clear-icon="no"
                  placeholder="เลือกวันที่เริ่มต้น"
                  value-format="timestamp"
                  format="dd MMMM yyyy"
                  v-model="ruleForm.project_start_date"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">ถึง</el-col>
            <el-col :span="11">
              <el-form-item prop="project_end_date">
                <el-date-picker
                  type="date"
                  clear-icon="no"
                  placeholder="เลือกวันที่สิ้นสุด"
                  value-format="timestamp"
                  format="dd MMMM yyyy"
                  v-model="ruleForm.project_end_date"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="ทีมที่รับผิดชอบ" prop="project_team_name">
            <el-input v-model="ruleForm.project_team_name"></el-input>
          </el-form-item>
          <el-form-item label="หมายเหตุ" prop="project_note">
            <el-input type="textarea" v-model="ruleForm.project_note"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="alert alert-light">
          <v-card-title primary>
            <h3>ตำแหน่งพนักงาน</h3>
            <v-layout justify-end>
              <v-flex xs4 sm4 d-flex>
                <select>
                  <option selected>สาขา 1</option>
                </select>
              </v-flex>
            </v-layout>
          </v-card-title>

          <v-divider></v-divider>
          <v-card-text>
            <v-layout>
              <v-flex>
                <vc-donut
                  background="white"
                  foreground="#F5F6FA"
                  :size="250"
                  unit="px"
                  :thickness="40"
                  :sections="sections"
                  :total="100"
                >
                  <p>Null</p>
                  <p>คน</p>
                </vc-donut>
              </v-flex>
              <v-flex>
                <vc-donut
                  :size="0"
                  unit="px"
                  hasLegend
                  legendPlacement="right"
                  :sections="sections"
                  :total="100"
                ></vc-donut>
              </v-flex>
            </v-layout>
          </v-card-text>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="alert alert-light">
          <v-card-title primary>
            <h3>อันดับพนักงาน</h3>
            <v-spacer></v-spacer>
            <span>จำนวนงาน</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list>
              <template v-for="(item, index) in items.slice(0, 6)">
                <span v-if="item.header" :key="item.header"></span>
                <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
                <v-list-tile v-else :key="item.title" avatar @ click>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-card-text>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {},
      editBtnSeen: true,
      projectData: [],
      ruleForm: {
        id: "",
        project_name: "",
        project_costomer_name: "",
        project_start_date: "",
        project_end_date: "",
        project_team_name: "",
        project_note: ""
      },
      rules: {
        project_name: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        project_costomer_name: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],

        project_team_name: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        project_note: [
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
      this.ruleForm.id = this.$route.params.projectID;
      this.ruleForm.project_name = this.projectData.project_name;
      this.ruleForm.project_costomer_name = this.projectData.project_costomer_name;
      this.ruleForm.project_start_date = this.projectData.project_start_date;
      this.ruleForm.project_end_date = this.projectData.project_end_date;
      this.ruleForm.project_team_name = this.projectData.project_team_name;
      this.ruleForm.project_note = this.projectData.project_note;
    },
    getAllData: function() {
      let apiURL = "http://178.128.80.240:3030/projectmanage/";
      let getID = this.$route.params.projectID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.projectData = response.data.data))
        ;
    },
    saveData: function() {
      let apiURL = "http://178.128.80.240:3030/projectmanage/update";
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
            // this.$router.push("/project");
            this.getAllData();
            this.editBtnSeen = true;
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
