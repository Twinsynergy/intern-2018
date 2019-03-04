<template>
  <v-app>
    <transition name="fade" mode="out-in">
      <div v-if="$store.state.getApiData.tokenkey">
        <!-- <el-container class="circular" :style="{ backgroundImage: 'url(' + image + ')' }">
          <el-aside width="300px">
            <MenuLeft/>
          </el-aside>

          <el-container>
            <el-header>
              <NavBar/>
            </el-header>

            <el-main>
              <div class="container-fluid">
                <br>
                <transition name="fade" mode="out-in">
                  <router-view/>
                </transition>
              </div>
            </el-main>
          </el-container>
        </el-container>-->
        <v-app>
          <v-navigation-drawer fixed v-model="drawer" clipped app>
            <MenuLeft/>
          </v-navigation-drawer>
          <v-toolbar color="#2ac3fe" dark fixed app clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <span class="navbar-brand">
              <!-- <img src="./assets/logo3.png" width="30" height="30" class="d-inline-block align-top" alt=""> -->
              <b>
                ระบบจัดการข้อมูล
                บริษัททวินซินเนอร์จี้
              </b>
            </span>
            <v-spacer></v-spacer>
            <NavBar/>
          </v-toolbar>

          <v-content>
            <v-container fluid>
              <div class="container-fluid">
                <br>
                <transition name="fade" mode="out-in">
                  <router-view/>
                </transition>
              </div>
            </v-container>
          </v-content>
        </v-app>
      </div>

      <div v-else>
        <div class="login" id="login">
          <a href="javascript:;" class="log-close"></a>

          <div class="log-bg">
            <br>
            <br>
            <img src="./assets/logo2.png" alt="Italian Trulli" style="width:400px;height:250px;">
            <div class="log-cloud cloud1"></div>
            <div class="log-cloud cloud2"></div>
            <div class="log-cloud cloud3"></div>
            <div class="log-cloud cloud4"></div>

            <div class="log-logo">ระบบจัดการข้อมูล</div>
            <div class="log-text">
              <h3>
                <span>บริษัททวินซินเนอร์จี้</span>
              </h3>
            </div>
          </div>
          <div class="log-email">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="40px">
              <el-form-item prop="username">
                <el-col :span="22">
                  <el-input
                    placeholder="ชื่อผู้ใช้"
                    v-model="ruleForm.username"
                    style="width: 100%;"
                  ></el-input>
                </el-col>
              </el-form-item>

              <el-form-item prop="password">
                <el-col :span="22">
                  <el-input placeholder="รหัสผ่าน" type="password" v-model="ruleForm.password"></el-input>
                </el-col>
              </el-form-item>
              <a href="javascript:;" class="log-btn" @click="submitForm('ruleForm')">เข้าสู่ระบบ</a>
            </el-form>
          </div>
        </div>
      </div>
    </transition>
  </v-app>
</template>

<script>
import NavBar from "./components/navBar";
import MenuLeft from "./components/Menu_left";
import "bootstrap/dist/css/bootstrap.css";

export default {
  components: {
    NavBar,
    MenuLeft,
    DataView
  },
  name: "App",
  data() {
    return {
      drawer: true,
      drawerRight: true,
      right: null,
      left: null,
      notlogin: true,
      image: "",
      ruleForm: {
        username: "",
        password: ""
      },
      tokenkey: "",
      rules: {
        username: [
          {
            required: true,
            message: "โปรดป้อนบัญชีผู้ใช้",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "โปรดป้อนรหัสผ่าน",
            trigger: "blur"
          }
        ]
      }
    };
  },

  mounted() {
    if (localStorage.tokenkey)
      this.$store.state.getApiData.tokenkey = localStorage.tokenkey;
    this.getusername();
    this.getname();
    this.getid();
    this.getstatus();
  },

  methods: {
    getTokenKey: function() {
      if (localStorage.tokenkey)
        this.$store.state.getApiData.tokenkey = localStorage.tokenkey;
    },
    getusername: function() {
      if (localStorage.username)
        this.$store.state.getApiData.username = localStorage.username;
    },
    getname: function() {
      if (localStorage.name)
        this.$store.state.getApiData.name = localStorage.name;
    },
    getid: function() {
      if (localStorage.id) this.$store.state.getApiData.id = localStorage.id;
    },
    getstatus: function() {
      if (localStorage.status)
        this.$store.state.getApiData.status = localStorage.status;
    },

    login: function() {
      let apiURL = "http://178.128.80.240:3030/api/users/login";
      this.axios
        .post(apiURL, this.ruleForm)
        .then(response => {
          console.log(response);
          localStorage.tokenkey = "Bearer " + response.data.token;
          localStorage.id = response.data.id;
          localStorage.username = response.data.username;
          localStorage.name = response.data.name;
          localStorage.status = response.data.status;

          {
            Swal.fire({
              title: "เข้าสู่ระบบเรียบร้อย",
              type: "success",
              showConfirmButton: false,
              timer: 1500
            }).then(response => {
              console.log("ok3");
              this.getTokenKey();
              this.getusername();
              this.getname();
              this.getid();
              this.getstatus();
            });
          }
        })
        .catch(err => {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          if ((err.response.status == 404) | (err.response.status == 400)) {
            Swal.fire({
              type: "error",
              title: "ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง",
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");

          return false;
        }
      });
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Kanit");

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
body,
#app {
  font-family: "Kanit", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-login {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}
.alert-light,
.breadcrumb {
  box-shadow: 0 0px 3px 0 rgba(0, 0, 0, 0.2);
}
.text-sm {
  font-size: 9px;
}
.circular {
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-image: url("");
}
.login {
  position: fixed;
  overflow: hidden;
  left: 50%;
  margin-left: -250px;
  top: 50%;
  margin-top: -350px;
  width: 500px;
  min-height: 555px;
  z-index: 10;
  right: 140px;
  background: #fff;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-shadow: 0px 3px 16px -5px #070707;
  box-shadow: 0px 3px 16px -5px #070707;
}
.log-close {
  display: block;
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 1;
}

.log-cloud {
  background-image: url(./assets/login-cloud.png);
  width: 63px;
  height: 40px;
  position: absolute;
  z-index: 1;
}
.login .cloud1 {
  top: 21px;
  left: -30px;
  transform: scale(0.6);
  animation: cloud1 20s linear infinite;
}
.login .cloud2 {
  top: 87px;
  right: 20px;
  animation: cloud2 19s linear infinite;
}
.login .cloud3 {
  top: 160px;
  left: 5px;
  transform: scale(0.8);
  animation: cloud3 21s linear infinite;
}
.login .cloud4 {
  top: 150px;
  left: -40px;
  transform: scale(0.4);
  animation: cloud4 19s linear infinite;
}
.log-bg {
  background: url(./assets/login-bg.png);
  width: 100%;
  height: 312px;
  overflow: hidden;
}
.log-logo {
  height: 80px;
  margin: 120px auto 25px;
  text-align: center;
  color: #ffffff;
  font-weight: bold;
  font-size: 40px;
}
.log-text {
  height: 80px;
  color: #696969;
  text-align: center;
  margin: 0 auto;
}
.log-logo,
.log-text {
  z-index: 2;
}
.icons {
  background: url(./assets/icons.png) no-repeat;
  display: inline-block;
}
.close {
  height: 16px;
  width: 16px;
  background-position: -13px 0;
}
.login-email {
  height: 17px;
  width: 29px;
  background-position: -117px 0;
}

.log-btns {
  padding: 15px 0;
  margin: 0 auto;
}
.log-btn {
  width: 402px;
  display: block;
  text-align: left;
  line-height: 50px;
  margin: 0 auto 15px;
  height: 50px;
  color: #fff;
  font-size: 13px;
  -webkit-border-radius: 5px;
  background-color: #3b5999;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  position: relative;
}
.log-btn.tw {
  background-color: #13b4e9;
}
.log-btn.email {
  background-color: #2ac3fe;
}
.log-btn:hover,
.log-btn:focus {
  color: #fff;
  opacity: 0.8;
}

.log-email {
  text-align: center;
  margin-top: 20px;
}
.log-email .log-btn {
  background-color: #2ac3fe;
  text-align: center;
}
.log-input-empty {
  border: 1px solid #f37474 !important;
}
.isloading {
  background: #d6d6d6;
}
.log-btn .icons {
  margin-left: 30px;
  vertical-align: middle;
}
.log-btn .text {
  left: 95px;
  line-height: 50px;
  text-align: left;
  position: absolute;
}
.log-input {
  width: 370px;
  overflow: hidden;
  padding: 0 15px;
  font-size: 13px;
  border: 1px solid #ebebeb;
  margin: 0 auto 15px;
  height: 48px;
  line-height: 48px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
}
.log-input.warn {
  border: 1px solid #f88787;
}

@-webkit-keyframes cloud1 {
  0% {
    left: 200px;
  }
  100% {
    left: -130px;
  }
}
@keyframes cloud1 {
  0% {
    left: 200px;
  }
  100% {
    left: -130px;
  }
}

@-webkit-keyframes cloud2 {
  0% {
    left: 500px;
  }
  100% {
    left: -90px;
  }
}
@keyframes cloud2 {
  0% {
    left: 500px;
  }
  100% {
    left: -90px;
  }
}

@-webkit-keyframes cloud3 {
  0% {
    left: 620px;
  }
  100% {
    left: -70px;
  }
}
@keyframes cloud3 {
  0% {
    left: 620px;
  }
  100% {
    left: -70px;
  }
}
@-webkit-keyframes cloud4 {
  0% {
    left: 100px;
  }
  100% {
    left: -70px;
  }
}
@keyframes cloud4 {
  0% {
    left: 100px;
  }
  100% {
    left: -70px;
  }
}
</style>
