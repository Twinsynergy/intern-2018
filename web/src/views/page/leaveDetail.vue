<template>
  <div>
    <div v-for="(leaves) 
     in leavesData" :key="leaves.id">
      <div aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/leaves">จัดการ</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{leaves.vacation_type}}</li>
        </ol>
      </div>
      <br>
      <div class="alert alert-light">
        <div class="row">
          <div class="col-lg-11">
            <h1>รายละเอียด</h1>
            <h3 v-if="!editBtnSeen">แก้ไขข้อมูล</h3>
          </div>
          <div class="col">
            <div>
              <v-btn
                color="primary"
                v-if="editBtnSeen"
                fab
                small
                dark
                @click=" (classE.disable = classE.enable),isDisabled= !isDisabled,editBtnSeen=!editBtnSeen"
              >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn color="green" v-if="!editBtnSeen" fab small dark @click="saveData();">
                <v-icon>save</v-icon>
              </v-btn>
              <v-btn
                color="red"
                v-if="!editBtnSeen"
                fab
                small
                dark
                @click="(classE.disable = classE.enableRe),isDisabled= !isDisabled,editBtnSeen=!editBtnSeen"
              >
                <v-icon>clear</v-icon>
              </v-btn>
            </div>
          </div>
        </div>

        <br>
        <table class="table">
          <thead>
            <tr class="table table-borderless">
              <td>รูปแบบการลา</td>
              <td>
                <p v-if="editBtnSeen">{{leaves.vacation_type}}</p>
                <v-radio-group v-model="row" row v-if="!editBtnSeen">
                  <v-radio label="ลากิจ" value="radio-1"></v-radio>
                  <v-radio label="ลาป่วย" value="radio-2"></v-radio>
                  <v-radio label="ลาพักร้อน" value="radio-3"></v-radio>
                </v-radio-group>
              </td>
            </tr>
            <tr>
              <td>ระยะเวลา</td>
              <td>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :nudge-right="40"
                  :return-value.sync="dates"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-combobox
                    :disabled="isDisabled"
                    slot="activator"
                    v-model="dates"
                    multiple
                    chips
                    small-chips
                    label="วันที่เริ่ม-วันสิ้นสุด"
                  ></v-combobox>
                  <v-date-picker v-if="!editBtnSeen" v-model="dates" multiple no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </td>
            </tr>
            <tr>
              <td>หมายเหตุ</td>
              <td>
                <textarea
                  :disabled="isDisabled"
                  v-bind:class="[classE.disable]"
                  rows="3"
                  v-model="leaves.vacation_note"
                ></textarea>
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
      isDisabled: true,
      getleavesData: {},
      leavesData: [],
      seen: false,
      editBtnSeen: true,
      dates: ["2018-09-15", "2018-09-20"],
      menu: false,
      leavesID: this.$route.params.leavesID,
      classE: {
        disable: "form-control-plaintext",
        enable: "form-control",
        enableRe: "form-control-plaintext"
      }
    };
  },
  methods: {
    editDataSave: function() {
      let apiURL = "http://35.198.219.154:9000/vacation/";
      let dataID = this.$route.params.leavesID;
      this.axios.put(apiURL + dataID, this.leavesData);
    },
    saveData: function() {
      console.log(this.leavesData);
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
  },
  mounted() {
    let apiURL = "http://35.198.219.154:9000/vacation/";
    axios
      .get(apiURL + this.$route.params.leavesID,{ headers: { Authorization: `${localStorage.tokenkey}` } })
      .then(response => (this.leavesData = response.data));
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
