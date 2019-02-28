<template>
  <div>
    <nav class="navbar navbar-dark fixed-top">
      <span class="navbar-brand">
         <img src="../assets/logo3.png" width="30" height="30" class="d-inline-block align-top" alt="">

         <b> ระบบจัดการข้อมูล
          บริษัททวินซินเนอร์จี้</b>

      </span>

      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img src="https://api.adorable.io/avatars/285/rwrwr.png">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>
            <font color="white">{{$store.state.getApiData.username}}</font>
          </v-list-tile-title>
          <v-list-tile-sub-title>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                {{$store.state.getApiData.status}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item>
                  <v-icon>settings</v-icon>ตั้งค่า
                </el-dropdown-item>-->
                <v-btn flat small @click="alLogout">
                  <v-icon color="red">power_settings_new</v-icon>
                  <font color="red"> ออกจากระบบ</font>
                </v-btn>
              </el-dropdown-menu>
            </el-dropdown>
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    logout: function() {
      localStorage.clear();
      this.$store.state.getApiData.tokenkey = null;
    },
    alLogout: function() {
      Swal.fire({
        title: "ต้องการออกจากระบบหรือไม่",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F56C6C",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ยืนยัน"
      }).then(result => {
        if (result.value) {
          Swal.fire({
            type: "success",
            title: "ออกจากระบบเรียบร้อย",
            showConfirmButton: false,
            timer: 1500
          });
          console.log("ok1");
          this.logout();
        }
      });
    }
  }
};
</script>


<style scoped>
nav {
  box-shadow: 0 1px 0px 0 rgba(202, 202, 202, 0.815),
    0 -6px 1px 0 rgba(0, 0, 0, 0.19);
  background-color: #2ac3fe;
  min-height: 65px;
}
h6 {
  color: white;
}
</style>