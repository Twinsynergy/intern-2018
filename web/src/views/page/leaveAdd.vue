<template>
  <div>
    <div>
      <div aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/leaves">ใบลา</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">เพิ่มข้อมูลใหม่</li>
        </ol>
      </div>
      <br>
      <div class="alert alert-light">
        <div class="row">
          <div class="col-lg-11">
            <h1>เพิ่มข้อมูล</h1>
          </div>
          <div class="col">
            <div>
              <v-btn color="primary" fab small dark @click=" saveData">
                <v-icon>save</v-icon>
              </v-btn>
            </div>
          </div>
        </div>

        <br>
        <table class="table">
          <thead>
            <tr class="table table-borderless">
              <td style="width:250px">ชื่อ นามสกุล</td>
              <td>
                <input type="text" class="form-control">
              </td>
            </tr>

            <tr>
              <td>รูปแบบการลา</td>
              <td>
                <v-radio-group v-model="row" row>
                  <v-radio label="ลากิจ" value="radio-1"></v-radio>
                  <v-radio label="ลาป่วย" value="radio-2"></v-radio>
                  <v-radio label="ลาพักร้อน" value="radio-3"></v-radio>
                </v-radio-group>
              </td>
            </tr>
            <tr>
              <td>ระยะเวลา {{dates[1] - dates[0]}}
                {{dates[0]}}
                
              </td>
              <td>
                <el-date-picker
                  v-model="dates"
                  type="daterange"
                  align="right"
                  start-placeholder="Start Date"
                  end-placeholder="End Date"
                  value-format="timestamp">
                ></el-date-picker>
              </td>
            </tr>
            <tr>
              <td>หมายเหตุ</td>
              <td>
                <textarea class="form-control" rows="3"></textarea>
              </td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      empData: [],
      seen: false,
      dates: [],
      menu: false,
      datesCon: []
    };
  },


  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    editDataSave: function() {
      let apiURL = "http://35.198.219.154:9000/emp/";
      let dataID = this.$route.params.empID;
      this.axios.put(apiURL + dataID, this.empData,{ headers: { Authorization: `${localStorage.tokenkey}` } });
    },
    saveData: function() {
      console.log(this.empData);
      swal({
        title: "ยืนยันการบันทึกข้อมูล?",
        icon: "info",
        buttons: ["ยกเลิก", "ยืนยัน"],
        dangerMode: true
      }).then(willEdit => {
        if (willEdit) {
          swal("บันทึกข้อมูลเรียบร้อย", {
            icon: "success",
            buttons: false,
            timer: 2000
          }).then(function() {});
          this.$router.push("/leaves");
        } else {
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
td {
  text-align: left;
}
</style>
