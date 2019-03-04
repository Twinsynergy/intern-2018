<template>
  <div>
    <div aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">การตั้งค่า</li>
      </ol>
    </div>
    <br>
    <div class="alert alert-light">
      <v-card-title primary>
        <h3>การตั้งค่า</h3>
        <v-spacer></v-spacer>
        <!-- <div>
          <div v-show="$store.state.getApiData.status === 'Power Admin'">
            <v-btn small fab outline color="blue" @click>
              <v-icon>add</v-icon>
            </v-btn>
            <span class="text-sm">เพิ่มบัญชีผู้ใช้</span>
          </div>
        </div>-->
      </v-card-title>
      <br>
      <div class="row">
        <div class="col-sm-12">
          <h4>การตั้งค่าบัญชีผู้ใช้</h4>
          <br>
          <div class="container">
            <div>
              <div class="row">
                <div class="col-3">
                  <p style="text-align: left;">ชื่อ :</p>
                </div>
                <div class="col-6">
                  <p v-show="nameShow" style="text-align: left;">{{ruleForm.name}}</p>
                </div>
                <div class="col-2">
                  <v-btn color="primary" round flat small dark @click="nameShow = !nameShow">
                    <span v-show="nameShow">แก้ไขชื่อผู้ใช้</span>
                    <span v-show="!nameShow">ปิด</span>
                  </v-btn>
                </div>
              </div>
              <hr>
              <div class="container">
                <el-form
                  v-show="!nameShow"
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  label-width="120px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="ชื่อผู้ใช้" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <div>
                    <div class="text-xs-right">
                      <v-btn color="primary" round outline dark @click="submitNameForm('ruleForm')">
                        <span>บันทึก</span>
                      </v-btn>
                    </div>
                  </div>
                </el-form>
              </div>
            </div>

            <div>
              <div class="row">
                <div class="col-3">
                  <p style="text-align: left;">บัญชีผู้ใช้ :</p>
                </div>
                <div class="col-6">
                  <p
                    v-show="userSetting"
                    style="text-align: left;"
                  >{{$store.state.getApiData.username}}</p>
                </div>
                <div class="col-2">
                  <v-btn color="primary" round small flat dark @click="userSetting = !userSetting">
                    <span v-show="userSetting">แก้ไขบัญชีผู้ใช้</span>
                    <span v-show="!userSetting">ปิด</span>
                  </v-btn>
                </div>
              </div>
              <hr>
            </div>
            <div class="container">
              <el-form
                v-show="!userSetting"
                :model="ruleForm2"
                :rules="rules"
                ref="ruleForm2"
                label-width="120px"
                class="demo-ruleForm2"
              >
                <!-- <el-form-item label="ชื่อที่แสดง" prop="name">
                <el-input v-model="ruleForm2.name"></el-input>
                </el-form-item>-->
                <el-form-item label="ชื่อบัญชีผู้ใช้" prop="username">
                  <el-input v-model="ruleForm2.username"></el-input>
                </el-form-item>

                <el-form-item label="รหัสผ่านใหม่" prop="password">
                  <el-input type="password" v-model="ruleForm2.password"></el-input>
                </el-form-item>
                <el-form-item label="ยืนยันรหัสผ่าน" prop="confirmPassword">
                  <el-input type="password" v-model="ruleForm2.confirmPassword"></el-input>
                </el-form-item>

                <div>
                  <div class="text-xs-right">
                    <br>
                    <v-btn color="primary" round outline dark @click="submitForm('ruleForm2')">
                      <span>บันทึก</span>
                    </v-btn>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="alert alert-light" v-show="ruleForm.status === 'Power Admin'">
      <v-card-title primary>
        <h3>บัญชีผู้ใช้ทั้งหมด</h3>
        <v-spacer></v-spacer>
        <div>
          <v-btn small fab outline color="blue" @click="dialogVisible = true">
            <v-icon>add</v-icon>
          </v-btn>
          <span class="text-sm">เพิ่ม</span>
        </div>
      </v-card-title>

      <v-card-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <el-input placeholder="ค้นหา" prefix-icon="el-icon-search" v-model="search"></el-input>
      </v-card-title>
      <div class="container-fluid">
        <v-data-table :loading="loading" :headers="headers" :items="desserts" :search="search ">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.index+1}}</td>
            <td class="text-xs-left" width="300">{{ props.item.username }}</td>
            <td class="text-xs-left" width="300">{{ props.item.name }}</td>
            <td class="text-xs-center" width="300">
              <v-chip outline color="primary">{{ props.item.status }}</v-chip>
            </td>
            <td class="text-xs" width="300">
              <!-- <v-btn
                flat
                icon
                color="info"
                v-bind:to="{name: 'positiondetail', params: {positionID: props.item.id }}"
              >
                <v-icon>visibility</v-icon>
              </v-btn>-->
              <v-btn
                flat
                icon
                color="red"
                @click="(selectedData.id = props.item.id,selectedData.username = props.item.username,selectedData.name = props.item.name),dialogDel() "
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="warning"
          >ไม่พบข้อมูล "{{ search }}"</v-alert>
          <template
            slot="pageText"
            slot-scope="props"
          >แสดง {{ props.pageStart }} - {{ props.pageStop }} จาก {{ props.itemsLength }}</template>
          <template slot="no-data">
            <br>
            <span>
              <h4>{{nodata}}</h4>
            </span>
            <br>
          </template>
        </v-data-table>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <v-card-title primary>
        <h3>เพิ่มบัญชีผู้ใช้ใหม่</h3>
        <v-spacer></v-spacer>
        <hr>
      </v-card-title>
      <div class="container">
        <el-form
          :model="ruleForm3"
          :rules="rules3"
          ref="ruleForm3"
          label-width="120px"
          class="demo-ruleForm3"
        >
          <el-form-item label="ชื่อผู้ใช้" prop="name">
            <el-input v-model="ruleForm3.name"></el-input>
          </el-form-item>
          <el-form-item label="ชื่อบัญชีผู้ใช้" prop="username">
            <el-input v-model="ruleForm3.username"></el-input>
          </el-form-item>
          <el-form-item label="ระดับของผู้ใช้" prop="status">
            <el-select
              v-model="ruleForm3.status"
              placeholder="เลือกระดับของผู้ใช้"
              style="width: 100%;"
            >
              <el-option
                v-for="item in RuleData"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="รหัสผ่านใหม่" prop="password">
            <el-input type="password" v-model="ruleForm3.password"></el-input>
          </el-form-item>
          <el-form-item label="ยืนยันรหัสผ่าน" prop="confirmPassword">
            <el-input type="password" v-model="ruleForm3.confirmPassword"></el-input>
          </el-form-item>

          <div>
            <div class="text-xs-right">
              <br>
              <v-btn color="primary" round outline dark @click="submitNewUserForm('ruleForm3')">
                <span>บันทึก</span>
              </v-btn>
            </div>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getUserData();
    this.getData();
  },
  methods: {
    getData: function() {
      axios
        .get("http://178.128.80.240:3030/api/users/datatable", {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(
          response => (
            (this.desserts = response.data.data),
            (this.loading = false),
            (this.nodata = "ไม่มีข้อมูล")
          )
        )
        .catch(err => {
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
          if (err.response.status == 404) {
            Swal.fire({
              type: "warning",
              title: "เกิดข้อผิดพลาด",
              showConfirmButton: true
            });
          }
        });
    },
    addButton: function() {
      //   this.$router.push("/position/add");
    },
    getUserData: function() {
      let apiURL = "http://178.128.80.240:3030/api/users/";
      let getID = localStorage.id;
      let view = "/view";
      axios
        .get(apiURL + getID + view, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => (this.ruleForm = response.data.data));
    },
    submitNewUserForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisible = false;
          Swal.fire({
            title: "ยืนยันการบันทึกข้อมูล?",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#67C23A",

            cancelButtonText: "ยกเลิก",
            confirmButtonText: "บันทึก"
          }).then(result => {
            if (result.value) {
              this.saveNewUserData();
            } else {
              this.dialogVisible = true;
            }
          });
        } else {
          return false;
        }
      });
    },
    clearUser(formName) {
      this.$refs[formName].resetFields();
    },
    saveNewUserData: function() {
      let apiURL = "http://178.128.80.240:3030/api/users/register";
      this.axios
        .post(apiURL, this.ruleForm3, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => {
          Swal.fire({
            title: "บันทึกข้อมูลเรียบร้อย",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          }).then(result => {

            this.getData();
            this.clearUser("ruleForm3");
          });
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "เกิดข้อผิดพลาด",
            showConfirmButton: false,
            timer: 1500
          });
        });
    },
    submitNameForm(formName) {
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
              this.saveNameData();
            }
          });
        } else {
          return false;
        }
      });
    },
    saveNameData: function() {
      let apiURL = "http://178.128.80.240:3030/api/users/updatename";
      this.axios
        .post(apiURL, this.ruleForm, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => {
          Swal.fire({
            title: "บันทึกข้อมูลเรียบร้อย",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          }).then(result => {
            this.getUserData();
            this.nameShow = true;
            localStorage.name = this.ruleForm.name;
            this.$store.state.getApiData.name = this.ruleForm.name;
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
          console.log("error submit!!");
          return false;
        }
      });
    },
    saveData: function() {
      let apiURL = "http://178.128.80.240:3030/api/users/update";
      this.axios
        .post(apiURL, this.ruleForm2, {
          headers: { Authorization: `${localStorage.tokenkey}` }
        })
        .then(response => {
          console.log("ok2");
          Swal.fire({
            title: "แก้ไข ชื่อผู้ใช้กับรหัสผ่าน เรียบร้อย",
            text: "ระบบจะออกจากระบบอัตโนมัติเพื่อเข้าสู่ระบบใหม่",
            type: "success",
            showConfirmButton: true
          }).then(result => {
            console.log("ok3");
            localStorage.clear();
            this.$store.state.getApiData.tokenkey = null;
            this.$store.state.getApiData.id = null;
            this.$store.state.getApiData.name = null;
            this.$store.state.getApiData.status = null;
            this.$store.state.getApiData.username = null;
            Swal.fire({
              type: "success",
              title: "ออกจากระบบเรียบร้อย",
              showConfirmButton: false,
              timer: 1500
            });
          });
        })
        .catch(err => {
          if (err.response.status == 400) {
            Swal.fire({
              type: "warning",
              title: "ชื่อบัญชีผู้ใช้ชื่อนี้ถูกใช้งานแล้ว",
              text: "โปรดตรวจสอบและลองใหม่อีกครั้ง",
              showConfirmButton: true
            });
          } else {
            Swal.fire({
              type: "error",
              title: "เกิดข้อผิดพลาด",
              showConfirmButton: false,
              timer: 1500
            });
          }
          console.log(err);
        });
    },
    deleteData: function() {
      this.axios
        .post(
          "http://178.128.80.240:3030/api/users/delete",
          this.selectedData,
          {
            headers: { Authorization: `${localStorage.tokenkey}` }
          }
        )
        .then(response => {
          (this.loading = true), (this.nodata = "กำลังโหลด..");
          Swal.fire({
            title: "ลบข้อมูล " + this.selectedData.name + " เรียบร้อย",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          }).then(result => {
            console.log("ok3");
            this.getData();
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
    dialogDel: function() {
      Swal.fire({
        title: "ยืนยันการลบข้อมูล?",
        text:
          "ต้องการลบบัญชีผู้ใช้ " +
          this.selectedData.username +
          " " +
          "(" +
          this.selectedData.name +
          ")" +
          " หรือไม่?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F56C6C",

        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน"
      }).then(result => {
        if (result.value) {
          this.deleteData();
          console.log("ok1");
        }
      });
    }
  },

  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("โปรดกรอกรหัสผ่าน"));
      } else {
        if (this.ruleForm2.confirmPassword !== "") {
          this.$refs.ruleForm2.validateField("confirmPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("โปรดกรอกรหัสผ่าน"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("รหัสผ่านไม่ตรงกันโปรดลองใหม่"));
      } else {
        callback();
      }
    };

    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("โปรดกรอกรหัสผ่าน"));
      } else {
        if (this.ruleForm3.confirmPassword !== "") {
          this.$refs.ruleForm3.validateField("confirmPassword");
        }
        callback();
      }
    };
    var validatePass4 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("โปรดกรอกรหัสผ่าน"));
      } else if (value !== this.ruleForm3.password) {
        callback(new Error("รหัสผ่านไม่ตรงกันโปรดลองใหม่"));
      } else {
        callback();
      }
    };
    return {
      RuleData: [{ name: "Admin" }, { name: "Human resources" }],
      dialogVisible: false,
      headers: [
        {
          text: "#",
          align: "center",
          sortable: false,
          value: "id"
        },
        {
          text: "ชื่อบัญชีผู้ใช้",
          value: "username",
          align: "center"
        },
        {
          text: "ชื่อผู้ใช้",
          value: "name",
          align: "center"
        },
        {
          text: "ระดับ",
          value: "status",
          align: "center"
        },
        {
          text: "จัดการ",
          align: "center",
          sortable: false
        }
      ],
      nodata: "กำลังโหลด..",
      loading: true,
      search: "",
      selectedData: { id: "", username: "", name: "" },
      desserts: [],
      nameShow: true,
      userSetting: true,
      ruleForm2: {
        id: localStorage.id,
        username: localStorage.username,
        password: "",
        confirmPassword: ""
      },
      ruleForm3: {
        name: "",
        username: "",
        status: "",
        password: "",
        confirmPassword: ""
      },
      ruleForm: {},
      rules: {
        name: [{ required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }],
        username: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        status: [
          {
            required: true,
            message: "โปรดเลือกระดับของผู้ใช้",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          },
          {min: 8, max: 100, message: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวขึ้นไป', trigger: 'blur'}
        ],
        confirmPassword: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur"
          },
          {min: 8, max: 100, message: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวขึ้นไป', trigger: 'blur'}
        ],
        branch_id: [
          {
            required: true,
            message: "โปรดเลือกสาขา",
            trigger: "change"
          }
        ]
      },
      rules3: {
        name: [{ required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }],
        username: [
          { required: true, message: "โปรดกรอกข้อมูล", trigger: "blur" }
        ],
        status: [
          {
            required: true,
            message: "โปรดเลือกระดับของผู้ใช้",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            validator: validatePass3,
            trigger: "blur"
          },
          {min: 8, max: 100, message: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวขึ้นไป', trigger: 'blur'}
        ],
        confirmPassword: [
          {
            required: true,
            validator: validatePass4,
            trigger: "blur"
          },
          {min: 8, max: 100, message: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวขึ้นไป', trigger: 'blur'}
        ],
        branch_id: [
          {
            required: true,
            message: "โปรดเลือกสาขา",
            trigger: "change"
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
</style>

