<template>
  <div>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/project">จัดการโปรเจค</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">โปรเจค {{projectData.project_name}}</li>
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
            <transition name="fade" mode="out-in">
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
            </transition>
          </div>
        </div>
      </v-card-title>

      <div class="container">
        <div v-if="editBtnSeen">
          <div class="row">
            <div class="col-3">
              <p style="text-align: right;">ชื่อโปรเจค :</p>
            </div>
            <div class="col-8">
              <p style="text-align: left;">{{projectData.project_name}}</p>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-3">
              <p style="text-align: right;">ชื่อลูกค้า :</p>
            </div>
            <div class="col-8">
              <p style="text-align: left;">{{projectData.project_costomer_name}}</p>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-3">
              <p style="text-align: right;">วันที่ดำเนินการ :</p>
            </div>
            <div class="col-8">
              <p
                style="text-align: left;"
              >{{projectData.project_start_date | moment("DD MMMM YYYY") }} ถึง {{projectData.project_end_date | moment("DD MMMM YYYY") }}</p>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-3">
              <p style="text-align: right;">ทีมที่รับผิดชอบ :</p>
            </div>
            <div class="col-8">
              <p style="text-align: left;">{{projectData.project_team_name}}</p>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-3">
              <p style="text-align: right;">กำไรที่ต้องการ :</p>
            </div>
            <div class="col-8">
              <p style="text-align: left;">{{projectData.selling }} %</p>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-3">
              <p style="text-align: right;">หมายเหตุ :</p>
            </div>
            <div class="col-8">
              <p style="text-align: left;">{{projectData.project_note}}</p>
            </div>
          </div>
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
                  format="dd MMMM yyyy"
                  value-format="timestamp"
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
          <el-form-item label="กำไรที่ต้องการ" prop="selling">
            <el-input placeholder="คิดเป็นเปอร์เซ็นต์" v-model.number="ruleForm.selling">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="หมายเหตุ" prop="project_note">
            <el-input type="textarea" v-model="ruleForm.project_note"></el-input>
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

    <div class="row">
      <div class="col-sm-6">
        <div class="alert alert-light">
          <v-card-title primary>
            <h3>Descriptions</h3>
            <v-spacer></v-spacer>
            <div>
              <v-btn small fab outline color="blue" @click="addButton();">
                <v-icon>assignment</v-icon>
              </v-btn>
              <span class="text-sm">จัดการ</span>
            </div>
          </v-card-title>

          <v-data-table :headers="headers" hide-actions :items="teamData">
            <template slot="items" slot-scope="props">
              <!-- <td class="text-xs-center">{{ props.index+1 }}</td> -->
              <td class="text-xs-left" width="200">{{ props.item.position_name }}</td>
              <td
                class="text-xs-left"
                width="300"
              >{{ props.item.emp_name }} ({{props.item.emp_nickname}})</td>

              <td v-if="props.item.workday === 0" class="text-xs-center" width="200">0</td>
              <td v-else class="text-xs-center" width="200">{{ (props.item.workday /7 | 0 )+1}}</td>

              <td class="text-xs-center" width="200">{{ props.item.workday }} วัน</td>
              <td class="text-xs-right" width="200">
                <font color="#f442b9">{{ Number(props.item.manday).toLocaleString() }}</font> บาท
              </td>

              <td class="text-xs-center"></td>
            </template>
            <template slot="no-data">
              <br>
              <span>
                <h4>{{nodataTeam}}</h4>
              </span>
              <br>
            </template>
          </v-data-table>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="alert alert-light">
          <v-card-title primary>
            <h3>ค่าใช้จ่ายเพิ่มเติม</h3>
            <v-spacer></v-spacer>
            <div>
              <v-btn small fab outline color="blue" @click="dialogVisible = true">
                <v-icon>add</v-icon>
              </v-btn>
              <span class="text-sm">เพิ่ม</span>
            </div>
          </v-card-title>

          <el-dialog :visible.sync="dialogVisible" width="30%">
            <v-card-title primary>
              <h3>เพิ่มข้อมูลค่าใช้จ่าย</h3>
              <v-spacer></v-spacer>
            </v-card-title>

            <el-form
              :model="ruleFormAddit"
              :rules="rulesAddit"
              ref="ruleFormAddit"
              label-width="120px"
              class="demo-ruleFormAddit"
            >
              <el-form-item label="รายการ" prop="project_addit_title">
                <el-input v-model="ruleFormAddit.project_addit_title"></el-input>
              </el-form-item>
              <el-form-item label="ค่าใช้จ่าย" prop="project_addit_price">
                <el-input v-model.number="ruleFormAddit.project_addit_price">
                  <template slot="append">บาท</template>
                </el-input>
              </el-form-item>
              <el-form-item label="วันที่จ่าย" required>
                <el-form-item prop="project_addit_date">
                  <el-date-picker
                    type="date"
                    placeholder="เลือกวันที่"
                    value-format="timestamp"
                    format="dd MMMM yyyy"
                    v-model="ruleFormAddit.project_addit_date"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">Cancel</el-button>
              <el-button
                type="primary"
                @click="submitFormAddit('ruleFormAddit'),ruleFormAddit.project_id = $route.params.projectID"
              >Confirm</el-button>
            </span>
          </el-dialog>

          <div class="container-fluid">
            <v-data-table hide-headers hide-actions :loading="loading" :items="projectDataaddit">
              <template slot="items" slot-scope="props">
                <td class="text-xs-left" width="200">
                  <v-icon>assignment</v-icon>
                  {{ props.item.project_addit_title }}
                </td>
                <td
                  class="text-xs-center"
                >{{props.item.project_addit_date | moment("DD MMMM YYYY") }}</td>
                <td class="text-xs-center">
                  <v-chip
                    color="#FEEFF0"
                    text-color="#F56C6C"
                  >{{ Number(props.item.project_addit_price).toLocaleString()}} บาท</v-chip>
                </td>
                <td class="text-xs">
                  <v-btn
                    flat
                    icon
                    color="red"
                    @click="(selectedDataAddit.id = props.item.id,selectedDataAddit.name = props.item.project_addit_title),dialogDelAddit() "
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </td>
              </template>
              <template slot="no-data">
                <br>
                <span>
                  <h4>{{nodata}}</h4>
                </span>
                <br>
              </template>
            </v-data-table>
            <br>
            <!-- <h4 class="text-xs-right">Total: {{Number(additTotal).toLocaleString()}} บาท</h4> -->
          </div>
        </div>
      </div>
    </div>

    <el-row :gutter="20"></el-row>
    <div class="alert alert-light">
      <h3 class="text-xs-right">
        <h4>
          รวมค่าใช้จ่ายในโปรเจคทั้งหมด :
          <font color="#f442b9">
            <b>{{ Number(ProjectTotalData.project_cost_total).toLocaleString()}}</b>
          </font> บาท | ราคาขายของโปรเจค :
          <font color="#4AD991">
            <b>{{ Number(ProjectTotalData.project_cost_selling).toLocaleString()}}</b>
          </font> บาท
        </h4>
      </h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nodataTeam: "ไม่มีข้อมูลทีม",
      teamData: [],
      headers: [
        { text: "ตำแหน่ง", value: "position_name", sortable: false },
        {
          text: "ชื่อ",
          align: "left",
          sortable: false,
          value: "name"
        },

        { text: "จำนวน Sprint", sortable: false },
        { text: "เวลาทำงาน", sortable: false },
        { text: "manday", sortable: false }
      ],
      additTotal: "",
      dialogVisible: false,
      nodata: "กำลังโหลด..",
      loading: true,
      form: {},
      editBtnSeen: true,
      projectData: [],
      projectDataaddit: [],
      ruleForm: {
        id: "",
        project_name: "",
        project_costomer_name: "",
        project_start_date: "",
        project_end_date: "",
        project_team_name: "",
        selling: "",
        project_note: ""
      },
      ruleFormAddit: {
        project_id: "",
        project_addit_title: "",
        project_addit_date: "",
        project_addit_price: ""
      },
      rulesAddit: {
        project_addit_title: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        project_addit_price: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" },
          { type: "number", message: "กรอกข้อมูลเป็นตัวเลขเท่านั้น" }
        ],
        project_addit_date: [
          {
            required: true,
            message: "โปรดเลือกวันที่",
            trigger: "change"
          }
        ]
      },

      rules: {
        project_name: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        project_costomer_name: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        project_start_date: [
          {
            required: true,
            message: "โปรดเลือกวันที่เริ่มต้น",
            trigger: "blur"
          }
        ],
        project_end_date: [
          { required: true, message: "โปรดเลือกวันที่สิ้นสุด", trigger: "blur" }
        ],
        project_team_name: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        selling: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" },
          { type: "number", message: "กรอกข้อมูลเป็นตัวเลขเท่านั้น" }
        ],
        project_note: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ]
      },
      selectedDataAddit: { id: "", name: "" },
      ProjectTotalData: ""
    };
  },
  mounted() {
    this.getAllData();
    this.projectaddit();
    this.getProjectTotalData();
    this.getDataTeam();
  },
  methods: {
    deleteDataAddit: function() {
      this.axios
        .post(
          "http://api:3030/projectaddit/delete",
          this.selectedDataAddit,
          { headers: { Authorization: `${localStorage.tokenkey}` } }
        )
        .then(response => {
          (this.loading = true), (this.nodata = "กำลังโหลด..");
          console.log("ok2");
          Swal.fire({
            title: "ลบข้อมูล " + this.selectedDataAddit.name + " เรียบร้อย",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          }).then(result => {
            console.log("ok3");
            this.projectaddit();
            this.getProjectTotalData();
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
    clearAddit(formName) {
      this.$refs[formName].resetFields();
      console.log("cleared");
    },
    dataToForm: function() {
      this.ruleForm.id = this.$route.params.projectID;
      this.ruleForm.project_name = this.projectData.project_name;
      this.ruleForm.project_costomer_name = this.projectData.project_costomer_name;
      this.ruleForm.project_start_date = this.projectData.project_start_date;
      this.ruleForm.project_end_date = this.projectData.project_end_date;
      this.ruleForm.project_team_name = this.projectData.project_team_name;
      this.ruleForm.selling = this.projectData.selling;
      this.ruleForm.project_note = this.projectData.project_note;
    },
    getAllData: function() {
      let apiURL = "http://api:3030/projectmanage/";
      let getID = this.$route.params.projectID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.projectData = response.data.data))
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
    getProjectTotalData: function() {
      let apiURL = "http://api:3030/manday/project/";
      let getID = this.$route.params.projectID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.ProjectTotalData = response.data));
    },
    projectaddit: function() {
      let apiURL = "http://api:3030/project/projectaddit/";
      let getID = this.$route.params.projectID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(
          response => (
            (this.projectDataaddit = response.data.data),
            (this.additTotal = response.data.totaladdit),
            (this.loading = false),
            (this.nodata = "ไม่มีข้อมูลค่าใช้จ่ายเพิ่มเติม ")
          )
        );
    },
    dialogDelAddit: function() {
      Swal.fire({
        title: "ยืนยันการลบข้อมูล?",
        text: "ต้องการลบข้อมูล " + this.selectedDataAddit.name + " หรือไม่?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F56C6C",

        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน"
      }).then(result => {
        if (result.value) {
          this.deleteDataAddit();
          console.log("ok1");
        }
      });
    },
    saveData: function() {
      let apiURL = "http://api:3030/projectmanage/update";
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
            this.getProjectTotalData();
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
    saveDataAddit: function() {
      let apiURL = "http://api:3030/projectaddit/create";
      this.axios
        .post(apiURL, this.ruleFormAddit, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => {
          this.projectaddit();
          this.clearAddit("ruleFormAddit");
          Swal.fire({
            title: "เพิ่มข้อมูลเรียบร้อย",
            type: "success",
            showConfirmButton: false,
            timer: 1000
          }).then(result => {
            console.log("ok3");
            // this.$router.push("/project");
            this.getProjectTotalData();
            this.projectaddit();
          });
          console.log("ok2");
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
    submitFormAddit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          {
            console.log("ok1");
            this.dialogVisible = false;
            this.saveDataAddit();
          }
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
    },
    getDataTeam: function() {
      let apiURL = "http://api:3030/manday/project/";
      let getID = this.$route.params.projectID;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(
          response => (
            (this.teamData = response.data.data),
            (this.nodataTeam = "ไม่มีข้อมูลทีม")
          )
        );
    },
    addButton: function() {
      this.$router.push({
        name: "ProjectTeamManage",
        params: { projectID: this.$route.params.projectID }
      });
    }
  }
};
</script>

<style scoped>
</style>
