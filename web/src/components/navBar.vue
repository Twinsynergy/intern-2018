<template>
  <div>
    <v-list-tile avatar>
      <v-list-tile-avatar>
        <img src="../assets/logo3.png">
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title>
          <font color="white">{{$store.state.getApiData.name}}</font>
        </v-list-tile-title>
        <v-list-tile-sub-title>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{$store.state.getApiData.status}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <v-btn flat block to="/setting">
                <font left color="gray">การตั้งค่า</font>
              </v-btn>
              <v-btn flat block @click="alLogout">
                <font left color="red">ออกจากระบบ</font>
              </v-btn>
            </el-dropdown-menu>
          </el-dropdown>
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </div>
</template>

<script>
export default {
  methods: {
    logout: function() {
      localStorage.clear();
      this.$store.state.getApiData.tokenkey = null;
      this.$store.state.getApiData.id = null;
      this.$store.state.getApiData.name = null;
      this.$store.state.getApiData.status = null;
      this.$store.state.getApiData.username = null;
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