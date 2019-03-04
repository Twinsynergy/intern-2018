<template>
  <div class="hello">
    <div class="jumbotron">
      <div class="row">
        <div class="col-11">
          <input type="text" class="form-control" v-model="columname">
        </div>
        <div class="col-1">
          <button type="submit" class="btn btn-primary" @click="getAllData ">Go</button>
        </div>
      </div>
      <br>
      <h1>result</h1>

      <!-- <form>
      <div class="container">
        <div class="row">
          <div class="col-4">
            ชื่อ:
            <input type="text" class="form-control" v-model="vbranch.branch_name" required>
          </div>
          <div class="col-4">
            ที่อยู่:
            <input
              type="text"
              class="form-control"
              v-model="vbranch.branch_address"
              required
            >
          </div>
          <div class="col-4">
            <button type="submit" class="btn btn-primary" @click="saveData ">บันทึก</button>
          </div>
        </div>
      </div>
      </form>-->
      <table class="table table-hover table-borderless">
        <thead>
          <tr class="table-active">
            <th scope="col"></th>
            <th scope="col">{{columname}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in getData" :key="data.id">
            <th>{{ index }}</th>
            <td text-left>
              <tr>
                <td>{{data}}</td>
              </tr>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="table table-hover table-borderless">
        <thead>
          <tr class="table-active">
            <th scope="col">#</th>
            <th scope="col">data in {{columname}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data1, index) in getData1" :key="data1.id">
            <th>{{ index+1 }}</th>
            <td text-left>
              <tr>
                <td>{{data1}}</td>
              </tr>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      getData: [],
      getData1: [],
      vbranch: { branch_name: "", branch_address: "" },
      counter: 1,
      columname: "",
      responseData: ""
    };
  },
  mounted: function() {
    // this.getAllData();
  },
  methods: {
    getAllData: function() {
      let url = "http://api:3030/";

      axios
        .get(url + this.columname,{ headers: { Authorization: `${localStorage.tokenkey}` } })
        .then(response =>
          (this.getData = response)((this.getData1 = response.data))
        );
    },
    saveData: function() {
      let apiURL = "http://api:3030/branch/create";
      this.axios
        .post(apiURL, this.vbranch,{ headers: { Authorization: `${localStorage.tokenkey}` } })
        .then(response => {
          console.log("ok");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
div.jumbotron {
  background-color: white;
}
</style>
